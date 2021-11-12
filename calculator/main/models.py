from django.contrib.auth.models import User
from django.utils import timezone
from django.db import models


class PriceList(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    activation_time = models.DateTimeField(default=timezone.now)

    value = models.TextField(blank=True, null=True)


class Calculation(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, null=True,
                                   on_delete=models.PROTECT)
    related_lead = models.CharField(
        max_length=60, blank=True, null=True, default=None)
    pricelist_id = models.IntegerField(default=0)
    values = models.TextField(
        default='{"material_cards": [{"materialName": null, "materialPrice": null, "materialCount": null}], "product_cards": [{"option_card": [], "chosenType": null}], "logistics": {"zamerCount": null, "montazhCount": null, "dostavkaCount": null}}')