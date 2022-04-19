from django.contrib import admin

from . import models


class DefaultPricelistInline(admin.StackedInline):
    model = models.DefaultPricelist


@admin.register(models.ServicePricelist)
class ServicePricelistAdmin(admin.ModelAdmin):
    pass


@admin.register(models.ServiceModule)
class ServiceModuleAdmin(admin.ModelAdmin):
    pass


@admin.register(models.DefaultPricelist)
class DefaultPricelistAdmin(admin.ModelAdmin):
    pass
