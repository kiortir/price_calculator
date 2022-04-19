from collections import defaultdict
from django.contrib.postgres.search import SearchQuery, SearchVector
from django.db.models import Q
from unicodedata import name
from django.core.cache import cache
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
from stonepricelist.quartz_models import QuartzManufacturer, QuartzStone
from stonepricelist.quartz_serializers import reverseQuartzManufacturerSerializer, ManufacturerBasicSerializer, SearchQuartzRepr, QuartzStoneSerializer


class QuartzPricelist(TemplateView):
    template_name = "stonepricelist/quartz.html"

    def get(self, request, *args, **kwargs):
        return render(request, template_name=self.template_name, context={
        })


class QuartzData(APIView):
    renderer_classes = [JSONRenderer]
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def get(self, request):
        search_str = request.GET.get('search')
        stones = QuartzStone.objects.prefetch_related('manufacturer')
        for sub_str in search_str.split(' '):
            stones = stones.filter(vector_column__icontains=sub_str)
        # stones = QuartzStone.objects.annotate(
        #     similarity=TrigramWordSimilarity(search_str, 'name'),
        # ).filter(similarity__gt=0.3)
        stones = SearchQuartzRepr(stones, many=True).data
        manufacturers = defaultdict(list)
        for stone in stones:
            manufacturers[stone.pop('manufacturer')].append(stone)
        m = []
        for manufacturer, stones in manufacturers.items():
            m.append({
                "name": manufacturer,
                "stones": stones
            })
        return Response(m)

    def post(self, request):
        stones = QuartzManufacturer.objects.all()
        data = reverseQuartzManufacturerSerializer(stones, many=True).data
        return Response(data)


class QuartzStoneData(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        stone_id = request.GET.get('id')
        if stone_id:
            stone = QuartzStone.objects.get(pk=stone_id)
            return Response(QuartzStoneSerializer(stone).data)
        return HttpResponse(status=400)


class ManufacturerData(APIView):
    renderer_classes = [JSONRenderer]
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    @method_decorator(cache_page(60*60*24))
    @method_decorator(cache_control(public=True, max_age=0), name='manufacturer')
    def get(self, request):
        manufacturer_names = request.query_params.get(
            'manufacturers', '').split(',')
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


class FlushCache(APIView):
    authentication_classes = (
        CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request):
        print('Cache clear!')
        cache.clear()
        return Response({
            "ok": True
        })
