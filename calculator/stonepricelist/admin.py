import inspect
import collections
from dataclasses import field
from os import sep
from django.contrib import admin

import nested_admin
from import_export import resources, fields, widgets
from import_export.admin import ImportExportModelAdmin
from import_export.widgets import ForeignKeyWidget, ManyToManyWidget

from stonepricelist.models import EquivalentGroup, additionalWorkAcryl, AcrylicCollection, AcrylicManufacturer, Colors, Currency, Texture, Thickness, AcrylicStone, AcrylicConfiguration, SurfaceType, SlabSize, ConfigurationDiscount, Material
from .imports import toCollection
from .forms import AddEquivalentsForm


class AcrylicStoneResource(resources.ModelResource):
    collection = fields.Field(attribute='collection',
                              column_name='collection', widget=toCollection())
    manufacturer = fields.Field(attribute='manufacturer', column_name='manufacturer',
                                widget=ForeignKeyWidget(AcrylicManufacturer, 'name'))

    class Meta:
        model = AcrylicStone
        fields = ('name', 'code', 'manufacturer', 'collection')
        import_id_fields = ('code', 'manufacturer')


class ExportAcrylicStoneResource(resources.ModelResource):
    collection = fields.Field(attribute='collection',
                              column_name='collection', widget=toCollection())
    manufacturer = fields.Field(attribute='manufacturer', column_name='manufacturer',
                                widget=ForeignKeyWidget(AcrylicManufacturer, 'name'))

    class Meta:
        model = AcrylicStone
        fields = ('name', 'code', 'manufacturer',
                  'collection',  'id')
        import_id_fields = ('code', 'manufacturer')


class AcrylicConfigurationAdmin(nested_admin.NestedModelAdmin):
    model = AcrylicConfiguration
    list_display = ('__str__', 'thickness', 'price', 'material_discount')
    list_filter = ('collection__manufacturer',)


class AcrylicConfigurationInline(nested_admin.NestedTabularInline):
    model = AcrylicConfiguration
    initial_num = 1
    extra = 1


class AcrylicCollectionAdmin(nested_admin.NestedModelAdmin):
    inlines = [AcrylicConfigurationInline]
    list_filter = ('manufacturer',)


class AcrylicCollectionInline(nested_admin.NestedStackedInline):
    model = AcrylicCollection
    inlines = [AcrylicConfigurationInline]


class AcrylicManufaturerAdmin(nested_admin.NestedModelAdmin):
    inlines = [AcrylicCollectionInline]


class additionalWorkAcrylResource(resources.ModelResource):

    class Meta:
        model = additionalWorkAcryl
        report_skipped = True
        fields = ('name', 'measurement', 'cost', 'spendings')
        import_id_fields = ('name',)


@admin.register(additionalWorkAcryl)
class additionalWorkAcrylAdmin(ImportExportModelAdmin):
    resource_class = additionalWorkAcrylResource


@admin.register(AcrylicStone)
class AcrylicStoneAdmin(ImportExportModelAdmin):
    resource_class = AcrylicStoneResource

    def get_export_resource_class(self):
        return ExportAcrylicStoneResource

    exclude = ("id", "equivalents_group", "similar_textures")
    list_filter = ('manufacturer',)
    list_display = ("name", "code", 'manufacturer')
    search_fields = ('name', 'collection__name', 'code', 'manufacturer__name',)
    ordering = ('manufacturer__name', 'name', 'code')
    form = AddEquivalentsForm


def addManufacturers(cls):

    def dummyManufacturerFunction(manufacturer=None):

        def dummyManufacturerFunctionCurried(self, obj):
            return ", ".join([stone.to_table() for stone in obj.stones.filter(manufacturer__name=manufacturer)])

        dummyManufacturerFunctionCurried.__name__ = manufacturer
        return dummyManufacturerFunctionCurried

    manufacturers = AcrylicManufacturer.objects.all()
    fields = ['id']

    for manufacturer in manufacturers:
        setattr(cls, manufacturer.name, dummyManufacturerFunction(
            manufacturer=manufacturer.name))
        fields.append(manufacturer.name)

    cls.list_display = fields
    return cls


@admin.register(EquivalentGroup)
@addManufacturers
class EquivalentGroupAdmin(admin.ModelAdmin):
    pass


admin.site.register(AcrylicCollection, AcrylicCollectionAdmin)
admin.site.register(AcrylicManufacturer, AcrylicManufaturerAdmin)
admin.site.register(Colors)
admin.site.register(Currency)
admin.site.register(Thickness)
admin.site.register(Texture)
admin.site.register(Material)
# admin.site.register(EquivalentGroup)
admin.site.register(AcrylicConfiguration, AcrylicConfigurationAdmin)
admin.site.register(SurfaceType)
admin.site.register(SlabSize)
admin.site.register(ConfigurationDiscount)
