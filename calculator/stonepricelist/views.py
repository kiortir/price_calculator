from .models import AcrylicConfiguration, AcrylicManufacturer, AcrylicCollection, AcrylicStone, additionalWorkAcryl
from .serializers import AcrylicConfigurationSerializer, ReverseAcrylicManufactureSerializer, AcrylicStoneSerializer, additionalWorkAcrylSerializer, SearchStoneSerializer

from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from django.views.generic import TemplateView
from django.shortcuts import render
from django.db.models import Q

import urllib.request
from urllib.error import HTTPError
import json


class DefaultAcrylPricelist(APIView):

    renderer_classes = [JSONRenderer]

    def post(self, request):
        try:
            configs = AcrylicManufacturer.objects.all()
            reverse = ReverseAcrylicManufactureSerializer(
                configs, many=True).data
            return Response(reverse)
        except Exception:
            return Response({"error": Exception})


class AcrylicCollectionView(APIView):

    renderer_classes = [JSONRenderer]

    def post(self, request):
        # try:
        print(request.data)
        data = request.data
        manufacturer = data.get('manufacturer', '')
        collection = data.get('collection', '')
        chosen_collection = AcrylicCollection.objects.filter(
            manufacturer__name=manufacturer).get(name=collection)
        stones = chosen_collection.stones.all()
        return Response(AcrylicStoneSerializer(stones, many=True).data)
        # except Exception:
        #     print(Exception)
        #     return Response({"error": "Exception"})


class AcrylicStonesView(APIView):

    renderer_classes = [JSONRenderer]

    def post(self, request):
        query = request.data.get('searchStr', '')
        stones = AcrylicStone.objects.filter(
            Q(name__icontains=query) | Q(code__icontains=query)).all()
        # chosen_collection = AcrylicManufacturer.objects.all()
        # stones = ManufacturersToStoneSerializer(chosen_collection, many=True)
        return Response(SearchStoneSerializer(stones, many=True).data)


class AcrylPricelist(TemplateView):
    template_name = "stonepricelist/index.html"

    def get(self, request, *args, **kwargs):

        return render(request, template_name=self.template_name)


class AcrylicWorkView(APIView):

    renderer_classes = [JSONRenderer]

    def post(self, request):
        # try:
        work = additionalWorkAcryl.objects.all()
        return Response(additionalWorkAcrylSerializer(work, many=True).data)


class crossdomainData(APIView):
    renderer_classes = [JSONRenderer]

    def post(self, request):
        url = request.data.get('url', "")
        try:
            response = urllib.request.urlopen(url)
            data = json.loads(response.read().decode('utf-8'))
            return Response(data)
        except HTTPError:
            return Response(status=404)
