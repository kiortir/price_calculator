import json

import pytz
from django.core import exceptions
from django.shortcuts import render
from django.views.generic import TemplateView
from django.core.exceptions import ObjectDoesNotExist


from .models import Calculation, PriceList
from .serializers import CalculationSerializer, PriceListSerializer

utc = pytz.UTC


class CalculationView(TemplateView):
    login_url = '/calc/login'
    template_name = "main/index.html"
    notfound_template = "main/notfound.html"

    def get(self, request, *args, **kwargs):
        calc_id = int(kwargs.get('calc_id', 0))
        try:
            calculation = Calculation.objects.get(id=calc_id)
            priceList = PriceList.objects.get(id=calculation.pricelist_id)

            context = {
                "server_state": CalculationSerializer(calculation).data,
                "priceList": PriceListSerializer(priceList).data
            }
            print(context['priceList'])
            return render(request, template_name=self.template_name, context=context)
        except ObjectDoesNotExist:
            print('EROOR')
            return render(request, template_name=self.notfound_template)


class NewCalc(TemplateView):
    login_url = '/calc/login'
    template_name = "main/index.html"

    def get(self, request, *args, **kwargs):
        print('fdfpdsf')
        priceList = PriceList.objects.latest('id').value
        context = {
            "storage": {
                'calc': json.loads(
                    '{"material_cards": [{"materialName": null, "materialPrice": null, "materialCount": null}], "product_cards": [{"option_card": [], "chosenType": "", "addons": [], "installation": {}}], "logistics": {"zamerCount": null, "montazhCount": null, "dostavkaCount": null}}'),
                'calcId': 'null',
                "related_lead": ''
            },
            "priceList": priceList
        }

        return render(request, template_name=self.template_name, context=context)


# @api_view(['PUT'])
# def SaveCalc(request):
#     data = request.data.get('data', {})
#     calc_id = data.get('calc', 0)
#     if calc_id == 'null':
#         calc_id = CalcRaw.objects.aggregate(Max('calcId'))['calcId__max']
#         if calc_id is None:
#             calc_id = 0
#         calc_id += 1
#         CalcRaw.objects.create(calcId=calc_id)
#     saveTime = data.get('storage', None)['lastUpdate']
#     dictStorage = data.get('storage', None)
#     storage = json.dumps(dictStorage, ensure_ascii=False)
#     calculation = CalcRaw.objects.get(calcId=calc_id)
#     onlineSaveTime = utc.localize(datetime.datetime.fromtimestamp(int(saveTime) / 1000.0))
#     if calculation.updated_at < onlineSaveTime or calculation.created_at > onlineSaveTime:
#         calculation.calc = storage
#         calculation.related_lead = dictStorage.get('amoCrmLink')  # data.get('lead', '')
#         calculation.save()
#     return JsonResponse({'newcalc': calc_id})


# @api_view(['POST'])
# def CalcData(request):
#     data = request.data.get('data', {})
#     calc_id = data.get('calc', None)
#     update_time = data.get('time', None)
#     if calc_id != 'null':
#         calculation = CalcRaw.objects.get(calcId=calc_id)
#         saveTime = datetime.datetime.fromtimestamp(int(update_time) / 1000.0)
#         if calculation.updated_at > utc.localize(saveTime):
#             return JsonResponse(CalcRawSerializer(CalcRaw.objects.get(calcId=calc_id)).data)
#         else:
#             return JsonResponse({}, status=250)
#     else:
#         return JsonResponse({'status': 'fail'}, status=250)


# def related_calculations(request):
#     lead_id = request.GET.get('leadId')
#     calcs = [CalcRawSerializer(calc).data for calc in CalcRaw.objects.filter(related_lead=lead_id)]
#     return JsonResponse(calcs, safe=False)


# def user_login(request):
#     if request.method == 'POST':
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return redirect(request.POST.get('next'))
#         else:
#             return redirect(request, request.POST.get('next'),
#                             {'error_message': 'Incorrect username and / or password.'})
#     else:
#         return render(request, 'price_calc/login.html', context={'nextpage': request.GET.get('next')})
