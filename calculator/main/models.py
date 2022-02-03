import json
from django.contrib.auth.models import User
from django.utils import timezone
from django.db import models


def defaultCalculationData():
    return json.loads('{"material_cards": [{"materialName": null, "materialPrice": null, "materialCount": null}], "product_cards": [{"option_card": [], "chosenType": null}], "logistics": {"zamerCount": null, "montazhCount": null, "dostavkaCount": null}}')


class PriceList(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    activation_time = models.DateTimeField(default=timezone.now)

    value = models.TextField(blank=True, null=True)


class BaseCalculation(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    values = models.JSONField(
        default=defaultCalculationData)

    class Meta:
        abstract = True


class Calculation(BaseCalculation):

    title = models.CharField(
        max_length=40, default=None, null=True, blank=True)

    created_by = models.ForeignKey(User, null=True,
                                   on_delete=models.PROTECT, related_name='calculation_creations')
    updated_by = models.ForeignKey(User, null=True,
                                   on_delete=models.PROTECT, related_name='calculation_updates')

    related_lead = models.CharField(
        max_length=60, blank=True, null=True, default=None)
    pricelist_id = models.IntegerField(default=1)


class CalculationTemplate(BaseCalculation):
    name = models.CharField(max_length=60, default='По умолчанию')
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='calculation_templates')
    is_default = models.BooleanField(default=False)
