from django.contrib import admin
from . import models
from django.apps import apps
# Register your models here.
app = apps.get_app_config('stone_pricelist')

for model_name, model in app.models.items():
    admin.site.register(model)

# @admin.register(models.Material)
# class MaterialAdmin(admin.ModelAdmin):
#     pass


# @admin.register(models.Manufacturer)
# class ManufacturerAdmin(admin.ModelAdmin):
#     pass


# @admin.register(models.MaterialAddon)
# class ManufacturerAdmin(admin.ModelAdmin):
#     pass


# @admin.register(models.Currency)
# class CurrencyAdmin(admin.ModelAdmin):
#     pass


# @admin.register(models.CurrencyModifier)
# class CurrencyModifierAdmin(admin.ModelAdmin):
#     pass


# @admin.register(models.MarginDiscount)
# class MarginDiscountModifierAdmin(admin.ModelAdmin):
#     pass


# @admin.register(models.Stone)
# class StoneAdmin(admin.ModelAdmin):
#     pass
