from django.contrib import admin
import json
from .models import PriceList, Calculation


from django.db.models import JSONField
from django.contrib import admin
from django.forms import widgets

from django.db import models
from django_json_widget.widgets import JSONEditorWidget


@admin.register(Calculation)
class CalculationAdmin(admin.ModelAdmin):
    formfield_overrides = {
        # fields.JSONField: {'widget': JSONEditorWidget}, # if django < 3.1
        models.JSONField: {'widget': JSONEditorWidget},
    }


@admin.register(PriceList)
class PriceListAdmin(admin.ModelAdmin):
    formfield_overrides = {
        # fields.JSONField: {'widget': JSONEditorWidget}, # if django < 3.1
        models.JSONField: {'widget': JSONEditorWidget},
    }


class HideModel(admin.ModelAdmin):
    def get_model_perms(self, request):
        """
        Return empty perms dict thus hiding the model from admin index.
        """
        return {}
