from django.shortcuts import render
from django.views.generic import TemplateView


class TableView(TemplateView):
    template_name = "production_graph/index.html"

    def get(self, request, *args, **kwargs):

        return render(request, template_name=self.template_name)
