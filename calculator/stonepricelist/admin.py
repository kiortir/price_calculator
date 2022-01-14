import collections
from dataclasses import field
from os import sep
from django.contrib import admin

import nested_admin
from import_export import resources, fields, widgets
from import_export.admin import ImportExportModelAdmin
from import_export.widgets import ForeignKeyWidget, ManyToManyWidget

from stonepricelist.models import Manufacturer, additionalWorkAcryl, AcrylicCollection, AcrylicManufacturer, Colors, Currency, Texture, Thickness, AcrylicStone, AcrylicConfiguration, SurfaceType, SlabSize, ConfigurationDiscount, Material
from .imports import toCollection


class AcrylicStoneResource(resources.ModelResource):
    collection = fields.Field(attribute='collection',
                              column_name='collection', widget=toCollection())
    manufacturer = fields.Field(attribute='manufacturer', column_name='manufacturer',
                                widget=ForeignKeyWidget(AcrylicManufacturer, 'name'))
    equivalents = fields.Field(attribute='equivalents', column_name='equivalents',
                               widget=ManyToManyWidget(model=AcrylicStone, separator=','))

    class Meta:
        model = AcrylicStone
        fields = ('name', 'code', 'manufacturer', 'collection', 'equivalents')
        import_id_fields = ('code', 'manufacturer')


class ExportAcrylicStoneResource(resources.ModelResource):
    collection = fields.Field(attribute='collection',
                              column_name='collection', widget=toCollection())
    manufacturer = fields.Field(attribute='manufacturer', column_name='manufacturer',
                                widget=ForeignKeyWidget(AcrylicManufacturer, 'name'))
    equivalents = fields.Field(attribute='equivalents', column_name='equivalents',
                               widget=ManyToManyWidget(model=AcrylicStone, field="id", separator=','))

    class Meta:
        model = AcrylicStone
        fields = ('name', 'code', 'manufacturer',
                  'collection', 'equivalents', 'id')
        import_id_fields = ('code', 'manufacturer')


class AcrylicConfigurationAdmin(nested_admin.NestedModelAdmin):
    model = AcrylicConfiguration
    list_display = ('__str__', 'thickness', 'price', 'material_discount')
    list_filter = ('collection__manufacturer',)
    # fields = ('price',)


# class AcrylicStoneAdmin(admin.ModelAdmin):
#     inlines = [AcrylicConfigurationInline]

class AcrylicConfigurationInline(nested_admin.NestedStackedInline):
    model = AcrylicConfiguration


class AcrylicCollectionAdmin(nested_admin.NestedModelAdmin):
    inlines = [AcrylicConfigurationInline]
    list_filter = ('manufacturer',)


class AcrylicCollectionInline(nested_admin.NestedStackedInline):
    model = AcrylicCollection
    inlines = [AcrylicConfigurationInline]


class AcrylicManufaturerAdmin(nested_admin.NestedModelAdmin):
    inlines = [AcrylicCollectionInline]


class additionalWorkAcrylResource(resources.ModelResource):
    # name = fields.Field(column_name='название', attribute="name")
    # measurement = fields.Field(
    #     column_name='ед. измерения', attribute="measurement")
    # cost = fields.Field(column_name='стоимость', attribute="cost")
    # spendings = fields.Field(column_name='затраты', attribute="spendings")

    class Meta:
        model = additionalWorkAcryl
        # skip_unchanged = True
        report_skipped = True
        fields = ('name', 'measurement', 'cost', 'spendings')
        import_id_fields = ('name',)


# class AcrylicStoneResource(resources.ModelResource):

#     class Meta:
#         model = AcrylicStone
#         exclude = ('id', )


@admin.register(additionalWorkAcryl)
class additionalWorkAcrylAdmin(ImportExportModelAdmin):
    resource_class = additionalWorkAcrylResource


@admin.register(AcrylicStone)
class AcrylicStoneAdmin(ImportExportModelAdmin):
    resource_class = AcrylicStoneResource

    def get_export_resource_class(self):
        """
        Returns ResourceClass to use for export.
        """
        return ExportAcrylicStoneResource


admin.site.register(AcrylicCollection, AcrylicCollectionAdmin)
admin.site.register(AcrylicManufacturer, AcrylicManufaturerAdmin)
admin.site.register(Colors)
admin.site.register(Currency)
admin.site.register(Thickness)
admin.site.register(Texture)
admin.site.register(Material)
# admin.site.register(AcrylicStone)
admin.site.register(AcrylicConfiguration, AcrylicConfigurationAdmin)
admin.site.register(SurfaceType)
admin.site.register(SlabSize)
admin.site.register(ConfigurationDiscount)
