from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
# from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import FormParser
from rest_framework.views import APIView

import amoApi.deserializers as deserialize
from amoApi.amo_api import getLeads, handle_query_response, handle_webhook
from amoApi.auth import setTokensByAuth
from amoApi.models import Lead, Token
from amoApi.serializers import LeadSerializer


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


# @api_view(['POST'])
# @authentication_classes([CsrfExemptSessionAuthentication])
# def amo_webhook_endpoint(request):  # """{"leads": {"update": [{"id": "24726077", "name": "Автосделка: Руслан Юрьевич Селиванов 79255172946", "status_id": "18032857", "old_status_id": "28736674", "price": "150805", "responsible_user_id": "2228857", "last_modified": "1640350988", "modified_user_id": "3087340", "created_user_id": "0", "date_create": "1639343257", "pipeline_id": "946942", "tags": [{"id": "73801", "name": "tilda"}], "account_id": "16700680", "custom_fields": [{"id": 436799, "name": "utm_medium", "code": "UTM_MEDIUM"}, {"id": 439295, "name": "utm_campaign", "code": "UTM_CAMPAIGN"}, {"id": 467289, "name": "Менеджер по продажам", "values": [{"value": "Абушаева Юлия", "enum": "940683"}]}, {"id": 445621, "name": "Стоимость замера", "values": [{"value": "2000"}]}, {"id": 445613, "name": "Розничная цена", "values": [{"value": "133200"}]}, {"id": 19747, "name": "Форма оплаты", "values": [{"value": "Терминал", "enum": "43229"}]}, {"id": 445615, "name": "Накрутка", "values": [{"value": "17605"}]}, {"id": 445619, "name": "Предоплата", "values": [{"value": "105000"}]}, {"id": 493839, "name": "Сумма доплаты", "values": [{"value": "45805"}]}, {"id": 445633, "name": "Вид камня", "values": [{"value": "Ханекс В-039"}]}, {"id": 473357, "name": "Примечание к заказу", "values": [{"value": "МАТЕРИАЛ ЗАКАЗАН!!!"}]}, {"id": 479925, "name": "Форма изделия", "values": [{"value": "Угловая", "enum": "941795"}]}, {"id": 467291, "name": "Замерщик", "values": [{"value": "Шахсуварян Юрий", "enum": "917611"}]}, {"id": 19743, "name": "Дата замера", "values": ["1639256400"]}, {"id": 444919, "name": "Время замера", "values": [{"value": "10 – 12", "enum": "884087"}]}, {"id": 444923, "name": "Обещанная дата монтажа", "values": ["1643230800"]}, {"id": 479169, "name": "Требуется перезамер", "values": [{"value": "1"}]}, {"id": 479171, "name": "Дата перезамера", "values": ["1640206800"]}, {"id": 479173, "name": "Время перезамера", "values": [{"value": "14-16", "enum": "941109"}]}, {"id": 479177, "name": "Ответственный за перезамер", "values": [{"value": "Юрий"}]}, {"id": 466941, "name": "Поставщик", "values": [{"value": "hanex"}]}, {"id": 466943, "name": "Номенклатура", "values": [{"value": "В-039"}]}, {"id": 466945, "name": "Листы", "values": [{"value": "1.25"}]}, {"id": 466947, "name": "Клей", "values": [{"value": "3"}]}, {"id": 466953, "name": "Примечание к договору", "values": [{"value": "МАТЕРИАЛ в цеху!!!"}]}, {"id": 466955, "name": "Мойка", "values": [{"value": "Накладная"}]}, {"id": 934909, "name": "Срок производства", "values": [{"value": "15"}]}, {"id": 955117, "name": "Google Диск", "values": [{"value": "https://drive.google.com/drive/folders/1tuEMndMiYIThIGT5CgfwA7W_0eSIAeiJ"}]}, {"id": 437987, "name": "Номер договора", "values": [{"value": "3471"}]}, {"id": 942785, "name": "Дата договора", "values": ["1639256400"]}, {"id": 475519, "name": "Договор подписан клиентом", "values": [{"value": "1"}]}, {"id": 942617, "name": "Договор оформлен", "values": [{"value": "Во время замера", "enum": "965339"}]}, {"id": 491089, "name": "Срок по договору", "values": [{"value": "20"}]}, {"id": 19749, "name": "Изделие", "values": [{"value": "Столешница-кухня", "enum": "43235"}]}, {"id": 19713, "name": "Материал", "values": [{"value": "Акрил", "enum": "43147"}]}, {"id": 435829, "name": "r7k12id", "values": [{"value": "6178214643"}]}, {"id": 475185, "name": "Источник трафика", "values": [{"value": "google"}]}, {"id": 436839, "name": "Ключевое слово", "values": [{"value": "купить столешницу из искусственного камня"}]}, {"id": 482151, "name": "Тип устройства", "values": [{"value": "mobile"}]}], "created_at": "1639343257", "updated_at": "1640350988"}]}, "account": {"subdomain": "unirock", "id": "16700680", "_links": {"self": "https://unirock.amocrm.ru"}}}"""
#     try:
#         handle_webhook(deserialize.webhook(request.data))
#         return HttpResponse(status=204)
#     except Exception:
#         print(Exception)
#         return HttpResponseBadRequest()


class AmoWebhookEndpoint(APIView):
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)
    renderer_classes = [JSONRenderer]
    # parser_classes = [FormParser]

    def post(self, request):
        print(request.QueryDict)
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
