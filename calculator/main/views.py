import json

import pytz
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from .models import Calculation, PriceList, CalculationTemplate
from .serializers import CalculationSerializer, PriceListSerializer, CalculationTemplateSerializer

utc = pytz.UTC


default_state = """{

   "values":{
       "discount": 0,

      "material_cards":[

         {

            "materialName":null,

            "materialPrice":null,

            "materialCount":null,

            "result":0

         }

      ],

      "product_cards":[

         {

            "option_card":[

               

            ],

            "addons": [{
        "name": "Радиусный угол > 12",
        "count": null,
        "measurement": "шт."
    }, {
        "name": "Другие отверстия",
        "count": null,
        "measurement": "шт."
    }, {
        "name": "Обход пиластры",
        "count": null,
        "measurement": "шт."
    }, {
        "name": "Конвекция",
        "type": {
            "selectors": ["вровень", "фрезеровка"],
            "selected": ""
        },
        "count": null,
        "measurement": "шт."
    }, {
        "name": "Лучи под сток воды",
        "count": null,
        "measurement": "шт."
    }, {
        "name": "Капельник",
        "count": null,
        "measurement": "шт."
    }, {
        "name": "Монтаж хром опоры заказчика",
        "count": null,
        "measurement": "шт."
    }, {
        "name": "Стыковка опорной ноги из камня под 45",
        "count": null,
        "measurement": "шт."
    }, {
        "name": "Шлифовка подворота камня",
        "type": {
            "selectors": ["до 150 мм", "более 150мм"],
            "selected": ""
        },
        "count": null,
        "measurement": "шт./м2"
    }, {
        "name": "Подворот из камня",
        "count": null,
        "measurement": "шт."
    }, {
        "name": "Демонтаж старых изделий (до 6 п.м.)",
        "isChecked": false
    }
],

            "chosenType":"",

            "installation":{

               "status":false,

               "length":null

            }

         }

      ],

      "logistics":{

         "overPrice": "",

         "additionalWork": "",

         "manualLifting": "",

         "distance": "",

         "mounting": "",

         "delivery": "",

         "templatePrice": "",

         "measurement":""

      }

   }

}"""


class CalculationTemplateEditor(TemplateView):
    template_name = 'main/calulationTemplate.html'

    def get(self, request, *args, **kwargs):
        template_id = kwargs.get('template_id', None)
        if template_id is None:
            template_data = json.loads(default_state)
        else:
            try:
                template: CalculationTemplate = CalculationTemplate.objects.get(
                    id=template_id)
                if template.owner != request.user:
                    raise PermissionDenied
                template_data = CalculationTemplateSerializer(template).data
                print(template_data)
            except ObjectDoesNotExist or PermissionDenied:
                return HttpResponseRedirect('new')
        context = {
            "server_state": template_data,
        }
        return render(request, template_name=self.template_name, context=context)


class CalculationView(TemplateView):
    template_name = "main/index.html"
    notfound_template = "main/notfound.html"

    def get(self, request, *args, **kwargs):
        calc_id = kwargs.get('calc_id', 0)
        try:
            calculation = Calculation.objects.get(id=calc_id)
            priceList = PriceList.objects.get(id=calculation.pricelist_id)

            context = {
                "server_state": CalculationSerializer(calculation).data,
                "priceList": PriceListSerializer(priceList).data
            }
            return render(request, template_name=self.template_name, context=context)
        except ObjectDoesNotExist:
            return render(request, template_name=self.notfound_template)


class NewCalc(TemplateView):
    template_name = "main/index.html"

    def get(self, request, *args, **kwargs):

        pricelist = PriceList.objects.latest('id')
        context = {
            "server_state": json.loads(default_state),
            "priceList": PriceListSerializer(pricelist).data
        }

        return render(request, template_name=self.template_name, context=context)


@api_view(['PUT'])
def SaveTemplate(request):

    current_id = request.data.get('id', None)
    userTemplates = request.user.calculation_templates.all()

    values = request.data.get("state", {})
    name = request.data.get(
        "name", f'Шаблон рассчета №{len(userTemplates) + 1}')

    if current_id is None:

        new_template = CalculationTemplate.objects.create(
            name=name,
            values=values)
        new_id = new_template.id

    else:
        template = CalculationTemplate.get(id=current_id)
        template.values = values
        template.name = name
        template.save()

    return JsonResponse({
        "new": current_id is None,
        "id": current_id or new_id
    })


@api_view(['PUT'])
def SaveCalc(request):
    updated = False
    data = request.data.get('data', {})
    calc_storage = data.get('state', {})
    calc_id = calc_storage.get('id', None)

    values = calc_storage.get('values', {})

    calc_storage['values'] = values

    if calc_id is None:
        calc_storage['pricelist_id'] = 1
        new_calc = Calculation.objects.create(**calc_storage)
        return JsonResponse({"new": True, "id": new_calc.id})

    calculation: Calculation = Calculation.objects.get(id=calc_id)
    front_update_time = int(data.get('updateTime', 0) or 0) / 1000
    back_update_time = calculation.updated_at.timestamp()
    force_update = data.get('force_update', False)

    if (front_update_time > back_update_time) or force_update:
        calculation.values = calc_storage.get('values', {})
        calculation.related_lead = data.get('related_lead', None)
        calculation.updated_by = request.user
        calculation.save()
        updated = True
    return JsonResponse({"new": False, "updated": updated})


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
