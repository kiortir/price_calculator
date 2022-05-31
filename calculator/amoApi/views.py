import json
import logging

from django.http import HttpResponse, JsonResponse
from querystring_parser import parser as qs_parser
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.parsers import BaseParser
from rest_framework.views import APIView

import amoApi.deserializers as deserialize
from amoApi.amo_api import (getLeads, handle_query_response, handle_webhook,
                            updateCustomFields, updateEvents)
from amoApi.auth import setTokensByAuth
from amoApi.models import Lead, Token
from amoApi.serializers import LeadSerializer

# logname = 'webhooks.log'


# logging.basicConfig(filename=logname,
#                     filemode='a',
#                     format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s',
#                     datefmt='%H:%M:%S',
#                     level=logging.INFO)

# logger = logging.getLogger('webhooks')


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class AmoParser(BaseParser):
    media_type = '*/*'

    def parse(self, stream, media_type=None, parser_context=None):
        return qs_parser.parse(stream.read(), normalized=True)


class AmoWebhookEndpoint(APIView):
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)
    # parser_classes = [AmoParser]

    def post(self, request):
        data = request.data
        # logger.info(json.dumps(data))
        handle_webhook(deserialize.webhook(data))
        return HttpResponse(status=204)


@api_view(['GET'])
def amo_update_leads(request):
    print('update')
    tokens = Token.objects.get(id=1)
    leads = getLeads(tokens.access_token)
    handle_query_response(map(deserialize.response, leads))
    return HttpResponse(status=204)


class amo_get_leads(APIView):
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request):
        leads = LeadSerializer(Lead.objects.all(), many=True).data
        return JsonResponse({"leads": leads})

    def get(self, request):
        leads = LeadSerializer(Lead.objects.all(), many=True).data
        return JsonResponse({"leads": leads})


@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication, BasicAuthentication])
def amo_update_tokens(request):

    setTokensByAuth(request.data['auth_key'])
    return JsonResponse({'success': True})


@api_view(['GET'])
def getCustomFields(request):

    return JsonResponse(updateCustomFields(), safe=False)


@api_view(['GET'])
def getEvents(request):

    return JsonResponse(updateEvents(), safe=False)
