from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from querystring_parser import parser as qs_parser
# from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.parsers import BaseParser
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView

import amoApi.deserializers as deserialize
from amoApi.amo_api import getLeads, handle_query_response, handle_webhook
from amoApi.auth import setTokensByAuth
from amoApi.models import Lead, Token
from amoApi.serializers import LeadSerializer
from django.conf import settings
from rest_framework.exceptions import ParseError


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class AmoParser(BaseParser):
    media_type = 'application/hal+json'

    def parse(self, stream, media_type=None, parser_context=None):

        return qs_parser(stream.read(), normalized=True)


class AmoWebhookEndpoint(APIView):
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)
    parser_classes = [AmoParser]

    def post(self, request):
        # data = qs_parser.parse(request.data, normalized=True)
        # print(data)
        handle_webhook(deserialize.webhook(request.data))
        return HttpResponse(status=204)


@api_view(['GET'])
def amo_update_leads(request):
    tokens = Token.objects.get(id=1)
    leads = getLeads(tokens.access_token)
    handle_query_response(map(deserialize.response, leads))
    return JsonResponse({"leads": leads})


@api_view(['GET'])
def amo_get_leads(request):
    leads = LeadSerializer(Lead.objects.all(), many=True).data
    return JsonResponse({"leads": leads})


@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
def amo_update_tokens(request):
    setTokensByAuth(request.data['auth_key'])
    return JsonResponse({'success': True})
