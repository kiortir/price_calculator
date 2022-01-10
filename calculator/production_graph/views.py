from collections import defaultdict

from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.views import APIView

from .models import SpecialistsCount


class TableView(TemplateView):
    template_name = "production_graph/index.html"

    def get(self, request, *args, **kwargs):
        specialists_dict = defaultdict(int)
        try:
            specialists = SpecialistsCount.objects.all()
            if len(specialists) < 2:
                raise SpecialistsCount.DoesNotExist
            for specialist in specialists:
                specialists_dict[specialist.alias] = specialist.count
        except SpecialistsCount.DoesNotExist:
            specialists_dict = {
                "qz_specialists": 5,
                "acryl_specialists": 5,
            }
        context = {
            "specialists": specialists_dict,
        }
        return render(request, template_name=self.template_name, context=context)


class UpdateCount(APIView):

    def put(self, request):
        data: dict = request.data
        for field, count in data.items():
            print(field, count)
            counter: SpecialistsCount = SpecialistsCount.objects.get(
                alias=field)
            counter.count = count
            counter.save()
        return HttpResponse(status=200)
