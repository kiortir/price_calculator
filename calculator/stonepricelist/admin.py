from django.db.utils import OperationalError, ProgrammingError

import nested_admin
import tablib
from django.contrib import admin
from django.db.models import Q
from import_export import fields, resources, widgets
from import_export.admin import ImportExportModelAdmin
from import_export.widgets import ForeignKeyWidget, ManyToManyWidget
from import_export.results import Result

from stonepricelist.models import (AcrylicCollection, AcrylicConfiguration,
                                   AcrylicManufacturer, AcrylicStone, Colors,
                                   ConfigurationDiscount, Currency,
                                   EquivalentGroup, Material, SlabSize,
                                   SurfaceType, Texture, Thickness,
                                   additionalWorkAcryl)

from .forms import AddEquivalentsForm, AcrylicManufacturerForm
from .imports import toCollection


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
    form = AcrylicManufacturerForm


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
    fields = ['id']

    # try:
    #     manufacturers = AcrylicManufacturer.objects.all()

    #     for manufacturer in manufacturers:
    #         setattr(cls, manufacturer.name, dummyManufacturerFunction(
    #             manufacturer=manufacturer.name))
    #         fields.append(manufacturer.name)
    # except OperationalError or ProgrammingError:
    #     pass

    cls.list_display = fields
    return cls


class EquivalentGroupResource(resources.ModelResource):

    def import_data(self, dataset: tablib.Dataset, *args, **kwargs):
        result = Result()
        header = dataset.headers
        for row in dataset:
            stones = []
            groups = []
            for index, column in enumerate(header):
                try:
                    stone = AcrylicManufacturer.objects.prefetch_related('stones').get(name__iexact=column).stones.get(
                        Q(name__iexact=row[index]) | Q(code__iexact=row[index]))
                    stones.append(stone.id)
                    if stone.equivalents_group:
                        groups.append(stone.equivalents_group)
                except AcrylicStone.DoesNotExist:
                    continue
            if len(stones) > 1:
                if len(groups) > 1:
                    union_group = EquivalentGroup.objects.create()
                    EquivalentGroup.objects.filter(id__in=set(
                        map(lambda x: x.id, groups))).delete()
                elif len(groups) == 1:
                    union_group = groups[0]
                else:
                    union_group = EquivalentGroup.objects.create()
                AcrylicStone.objects.filter(id__in=stones).update(
                    equivalents_group=union_group)
        return result


@admin.register(EquivalentGroup)
@addManufacturers
class EquivalentGroupAdmin(ImportExportModelAdmin):
    resource_class = EquivalentGroupResource


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
