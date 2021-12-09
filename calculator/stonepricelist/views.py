from .models import AcrylicConfiguration, AcrylicManufacturer
from .serializers import AcrylicConfigurationSerializer, ReverseAcrylicManufactureSerializer

from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from django.views.generic import TemplateView
from django.shortcuts import render


class DefaultAcrylPricelist(APIView):

    renderer_classes = [JSONRenderer]
    def get(self, request):
        configs = AcrylicManufacturer.objects.all()
        manufacturers = AcrylicConfigurationSerializer(
            AcrylicConfiguration.objects.all(), many=True).data
        reverse = ReverseAcrylicManufactureSerializer(configs, many=True).data
        print()
        return Response(reverse)

class AcrylPricelist(TemplateView):
    template_name = "stonepricelist/index.html"

    def get(self, request, *args, **kwargs):
        
        return render(request, template_name=self.template_name)
