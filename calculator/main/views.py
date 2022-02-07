from genericpath import exists
from re import S
from django.core.paginator import Paginator
import datetime
from django.db import DataError
from django.db.models import Q
import json

import pytz
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied
from django.http import Http404, JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from .models import Calculation, PriceList, CalculationTemplate, Mutation
from .serializers import CalculationSerializer, PriceListSerializer, CalculationTemplateSerializer, CalculationTemplateNameSerializer, CalculationReprSerializer

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
        calc_id = kwargs.get('calc_id', None)
        user_templates = request.user.calculation_templates
        if calc_id is None:
            try:
                default_template = user_templates.get(
                    is_default=True)
                state = CalculationSerializer(default_template).data
            except ObjectDoesNotExist:
                state = json.loads(default_state)

            pricelist = PriceListSerializer(
                PriceList.objects.latest('id')).data

        else:
            try:
                calculation = Calculation.objects.get(id=calc_id)

                state = CalculationSerializer(calculation).data
                pricelist = PriceListSerializer(
                    PriceList.objects.get(id=calculation.pricelist_id)
                ).data

            except ObjectDoesNotExist:
                return render(request, template_name=self.notfound_template)

        base_template = CalculationTemplate.objects.earliest('id')
        templates = [base_template, ] + [*user_templates.all()]

        context = {
            "server_state": state,
            "price_list": pricelist,
            "template_names": CalculationTemplateNameSerializer(set(templates), many=True).data
        }

        return render(request, template_name=self.template_name, context=context)


@api_view(['PUT'])
def SaveTemplate(request):

    current_id = request.data.get('id', None)
    userTemplates = request.user.calculation_templates.all()

    values = request.data.get("state", {}).get("values", {})
    name = request.data.get(
        "name", f'Шаблон рассчета №{len(userTemplates) + 1}')
    if current_id is None:

        new_template = CalculationTemplate.objects.create(
            name=name,
            values=values,
            owner=request.user)
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
def SaveMutation(request):

    current_id = request.data.get('id', None)
    time = int(request.data.get('time', 0)) / 1000
    data = {
        "submitted_by": request.user,
        "submitted_at": time,
        
    }
    related_estimation =
    data['estimation'] = request.data.get('estimation_id', 0)
    Mutation.objects.create()


@api_view(['POST'])
def GetTemplate(request):

    required_id = request.data.get('id', None)
    try:
        template = request.user.calculation_templates.get(id=required_id)
        return JsonResponse(CalculationTemplateSerializer(template).data
                            )
    except ObjectDoesNotExist:
        return Http404


@api_view(['POST'])
def CheckPermissions(request):

    try:
        return JsonResponse({"isEstimator": request.user.groups.filter(name='Сметчик').exists()
                             })
    except ObjectDoesNotExist:
        return Http404


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


class CalculationResults(TemplateView):
    template_name = 'main/calulationList.html'

    def tommorow(self):
        return datetime.datetime.now(
        ) + datetime.timedelta(days=1)

    def get(self, request, *args, **kwargs):

        query = Calculation.objects.all()

        created_by = request.GET.getlist('created_by')
        if len(created_by) > 0:
            query = query.filter(created_by__id__in=created_by)

        created_after = request.GET.get(
            'created_after')
        created_before = request.GET.get('created_before')

        if created_after is not None:
            created_after = datetime.datetime.utcfromtimestamp(
                int(created_after))
            query = query.filter(created_at__gte=created_after)
        if created_before is not None:
            created_before = datetime.datetime.utcfromtimestamp(int(
                created_before))

            query = query.filter(created_at__lte=created_before)
            # query = query.filter(Q(created_at__lte=created_before)
            #                      & Q(created_at__gte=created_after))

        related_leads = request.GET.getlist('related_lead')
        if len(related_leads) > 0:
            query = query.filter(related_lead_in=related_leads)

        page = request.GET.get('page', 1)
        print()
        p = Paginator(query, 20)

        page = p.page(page)

        estimations = page.object_list
        print(estimations)
        return render(request, template_name=self.template_name, context={'estimations': estimations, "has_next": page.has_next()})
