from django.http import HttpResponseRedirect
from .models import AcrylicConfiguration, AcrylicManufacturer, AcrylicCollection, AcrylicStone, Currency, additionalWorkAcryl
from .serializers import AcrylicConfigurationSerializer, BaseStoneSerializer, ReverseAcrylicManufactureSerializer, additionalWorkAcrylSerializer
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from django.views.generic import TemplateView
from django.shortcuts import render
from django.db.models import Q

import urllib.request
from urllib.error import HTTPError
import json
import csv


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class CurrencyCSV(APIView):
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def get(self, request):
        response = HttpResponse(
            content_type='text/csv',
            headers={
                'Content-Disposition': 'attachment; filename="somefilename.csv"'},
        )
        writer = csv.writer(response)
        currencies = Currency.objects.all()
        codes = []
        values = []
        for currency in currencies:
            codes.append(currency.code)
            values.append(currency.value)
        writer.writerow(codes)
        writer.writerow(values)
        return response


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
        data = request.data
        manufacturer = data.get('manufacturer', '')
        collection = data.get('collection', '')
        chosen_collection = AcrylicCollection.objects.filter(
            manufacturer__name=manufacturer).get(name=collection)
        stones = chosen_collection.stones.all()
        return Response(BaseStoneSerializer(stones, many=True).data)
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
        return Response(BaseStoneSerializer(stones, many=True).data)


class AcrylPricelist(TemplateView):
    template_name = "stonepricelist/index.html"

    def get(self, request, *args, **kwargs):
        configs = AcrylicManufacturer.objects.all()
        # reverse = ReverseAcrylicManufactureSerializer(
        #     configs, many=True).data
        return render(request, template_name=self.template_name, context={
            "manufacturers": configs
        })


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


class FindStone(APIView):
    renderer_classes = [JSONRenderer]

    def post(self, request):
        stone_id = request.data.get('stone_id', "")
        stone: AcrylicStone = AcrylicStone.objects.select_related(
            "equivalents_group", 'manufacturer').get(id=stone_id)
        try:
            response = urllib.request.urlopen(
                f'https://unirock.ru/include/popup/get-list-stone.php?popular[]=on&search={stone.code}&nbsp;{stone.manufacturer.name}&sort=rat&page=1'.replace(" ", "&nbsp;"))
            data = json.loads(response.read().decode('utf-8'))
            try:
                equivalents = BaseStoneSerializer(stone.equivalents_group.stones.exclude(
                    id=stone.id), many=True).data
            except AttributeError:
                equivalents = []
            try:
                pic = data['rocks'][0]['image']
            except IndexError:
                pic = None
            content = {
                "pic": pic,
                "equivalents": equivalents,
            }
            return Response(content)
        except HTTPError:
            return Response(status=404)
