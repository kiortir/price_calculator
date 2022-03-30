from django.http import HttpResponse
from django.views.decorators.cache import cache_control
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render
from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from stonepricelist.views import BasicAuthentication, CsrfExemptSessionAuthentication
from stonepricelist.quartz_models import QuartzManufacturer, QuartzSchema
from stonepricelist.quartz_serializers import reverseQuartzManufacturerSerializer, ManufacturerBasicSerializer


class QuartzPricelist(TemplateView):
    template_name = "stonepricelist/quartz.html"

    def get(self, request, *args, **kwargs):
        return render(request, template_name=self.template_name, context={
        })


class QuartzData(APIView):
    renderer_classes = [JSONRenderer]
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request):
        stones = QuartzManufacturer.objects.all()
        data = reverseQuartzManufacturerSerializer(stones, many=True).data
        return Response(data)


class ManufacturerData(APIView):
    renderer_classes = [JSONRenderer]
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    @method_decorator(cache_page(60*60*24))
    @method_decorator(cache_control(public=True, max_age=0), name='manufacturers')
    def get(self, request):
        manufacturer_names = request.query_params.get('manufacturers', '').split(',')
        print(manufacturer_names)
        if not manufacturer_names[0]:
            manufacturers = QuartzManufacturer.objects.all()
        else:
            manufacturers = QuartzManufacturer.objects.filter(
                name__in=manufacturer_names)
        return Response(reverseQuartzManufacturerSerializer(manufacturers, many=True).data)


class ManufacturersBasic(APIView):
    renderer_classes = [JSONRenderer]
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    @method_decorator(cache_page(60*60*24))
    @method_decorator(cache_control(public=True, max_age=0), name='manufacturers')
    def get(self, request):
        stones = QuartzManufacturer.objects.all()
        data = ManufacturerBasicSerializer(stones, many=True).data
        return Response(data)


class OptimizeSchema(APIView):
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request):
        manufacturer_name = request.data.get('manufacturer')
        if not manufacturer_name:
            return HttpResponse(status=400)

        manufacturer = QuartzManufacturer.objects.get(name=manufacturer_name)
        try:
            table: QuartzSchema = manufacturer.table
        except QuartzSchema.DoesNotExist:
            table: QuartzSchema = QuartzSchema.objects.create(
                manufacturer=manufacturer)

        table.advanced_surface_display = request.data.get(
            'advanced_surface_display')

        table.updateSchema()
        return Response(table.schema)
