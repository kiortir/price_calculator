from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render
from django.views.generic import TemplateView

from stonepricelist.views import BasicAuthentication, CsrfExemptSessionAuthentication
from stonepricelist.models import QuartzManufacturer
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

    def post(self, request):
        manufacturer_names = request.data.get('manufacturers', [])
        manufacturers = QuartzManufacturer.objects.filter(
            name__in=manufacturer_names)
        return Response(reverseQuartzManufacturerSerializer(manufacturers, many=True).data)


class ManufacturersBasic(APIView):
    renderer_classes = [JSONRenderer]
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request):
        stones = QuartzManufacturer.objects.all()
        data = ManufacturerBasicSerializer(stones, many=True).data
        return Response(data)
