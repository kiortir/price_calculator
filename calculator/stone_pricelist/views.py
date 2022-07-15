from django.db.models import Q
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import routers
from rest_framework.parsers import JSONParser
from django.shortcuts import render
from django.views.generic import TemplateView


from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view


from .import_handler.main import Parser, Importer
from . import models
from . import serializers


class MainView(TemplateView):

    template_name = "stone_pricelist/index.html"

    def get(self, request, *args, **kwargs):
        return render(request, template_name=self.template_name)


class ImportEndpoint(APIView):
    renderer_classes = [JSONRenderer]
    # parser_classes = [JSONParser]

    def post(self, request):
        print(request.data)
        file = request.data.get('file', []).read()
        # print(file)
        table = Parser.parse(file)
        # for line in file:
        #     print(line)

        return Response(table)

    def put(self, request):
        data = request.data
        Importer(data)
        return Response(status=204)


class Manufacturers(APIView):

    def get(self, request):
        manufacturers = models.Manufacturer.objects.all()
        response = serializers.BasicManufacturerSerializer(
            manufacturers, many=True)
        return Response(response.data)


class Manufacturer(APIView):

    def get(self, request):
        manufacturer_id = request.GET.get('id')
        manufacturer = models.Manufacturer.objects.get(id=manufacturer_id)
        response = serializers.DetailedManufacturerSerializer(
            manufacturer)
        return Response(response.data)


class MaterialViewset(viewsets.ModelViewSet):

    queryset = models.Material.objects.all()
    serializer_class = serializers.BasicMaterialSerializer

    # def get_queryset(self):
    #     queryset = models.Manufacturer.objects.all()
    #     material = self.request.query_params.get('material')
    #     if material is not None:
    #             queryset = queryset.filter(material__alias=material)
    #     return queryset


class ManufacturerViewset(viewsets.ModelViewSet):
    queryset = models.Manufacturer.objects.all()
    serializer_class = serializers.BasicManufacturerSerializer

    def get_queryset(self):
        queryset = models.Manufacturer.objects.all()
        material = self.request.query_params.get('material')
        if material is not None:
            queryset = queryset.filter(
                material__alias=material).exclude(pricelists=None)
        return queryset
    # permission_classes = [permissions.IsAuthenticated]


class Pricelist(APIView):

    def get(self, request):
        manufacturer_name = request.query_params.get('manufacturer')
        manufacturer = models.Manufacturer.objects.get(name=manufacturer_name)
        pricelist = manufacturer.latest_pricelist
        serialized_pricelist = serializers.PricelistSerializer(pricelist)
        return Response(serialized_pricelist.data)
