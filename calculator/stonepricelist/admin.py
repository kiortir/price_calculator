
from csv import list_dialects
from django.contrib.admin.widgets import AdminFileWidget
from django.urls import resolve
from django.db.utils import OperationalError, ProgrammingError

import nested_admin
import tablib
from django.contrib import admin
from django.db.models import Q, ImageField
from import_export import fields, resources
from import_export.admin import ImportExportModelAdmin
from import_export.widgets import ForeignKeyWidget, BooleanWidget
from import_export.results import Result
from stonepricelist.models import (AcrylicCollection, AcrylicConfiguration,
                                   AcrylicManufacturer, AcrylicStone, Colors,
                                   ConfigurationDiscount, Currency,
                                   EquivalentGroup, Material, SlabSize,
                                   SurfaceType, Texture, Thickness,
                                   additionalWorkAcryl)
from stonepricelist.quartz_models import (
    QuartzManufacturer, QuartzStone, QuartzStoneConfiguration, quartzManufacturerInfoPictures)

from .forms import AddEquivalentsForm, AcrylicManufacturerForm, QuartzConfigurationInlineForm
from .imports import toCollection, SlabSizeWidget, QuartzStoneNameWidget


class AcrylicStoneResource(resources.ModelResource):
    manufacturer = fields.Field(attribute='manufacturer', column_name='manufacturer',
                                widget=ForeignKeyWidget(AcrylicManufacturer, 'name'))

    class Meta:
        model = AcrylicStone
        fields = ('name', 'code', 'manufacturer', 'collection')
        import_id_fields = ('code', 'manufacturer')


class QuartzStoneConfigurationResource(resources.ModelResource):
    stone = fields.Field(attribute='stone', column_name='name',
                         widget=QuartzStoneNameWidget())
    slab_size = fields.Field(attribute='slab_size',
                             column_name='height', widget=SlabSizeWidget())
    thickness = fields.Field(attribute='thickness', column_name='thickness',
                             widget=ForeignKeyWidget(Thickness, 'value'))
    surface = fields.Field(attribute='surface', column_name='surface',
                           widget=ForeignKeyWidget(SurfaceType, 'alias'))
    is_on_order = fields.Field(attribute='is_on_order', widget=BooleanWidget())

    # manufacturer = fields.Field(attribute='manufacturer', column_name='manufacturer',
    #                             widget=ForeignKeyWidget(QuartzManufacturer, 'name'))

    class Meta:
        model = QuartzStoneConfiguration
        fields = ('stone', 'height', 'thickness', 'surface',
                  'price', 'overprice', 'is_on_order', 'code')
        import_id_fields = ('stone', 'slab_size', 'thickness', 'surface')


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


class QuartzConfigurationInline(admin.TabularInline):

    model = QuartzStoneConfiguration
    initial_num = 1
    extra = 1
    # form = QuartzConfigurationInlineForm

    def get_parent_object_from_request(self, request):
        resolved = resolve(request.path_info)
        if resolved.kwargs:
            return self.parent_model.objects.get(pk=resolved.kwargs['object_id'])
        return None

    def formfield_for_foreignkey(self, db_field, request=None, **kwargs):

        if db_field.name in ['thickness', 'surface', 'slab_size']:
            parent = self.get_parent_object_from_request(request)
            try:
                kwargs['queryset'] = getattr(
                    parent.manufacturer, f'{db_field.name}_configurations')
            except AttributeError:
                pass
            # print(kwargs['queryset'].objects.all())
        # if db_field.name == 'inside_room':
        #     if request._obj_ is not None:
        #         field.queryset = field.queryset.filter(building__exact = request._obj_)
        #     else:
        #         field.queryset = field.queryset.none()

        return super().formfield_for_foreignkey(db_field, request, **kwargs)


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


class AdminImageWidget(AdminFileWidget):
    def render(self, name, value, attrs=None, renderer=None):
        output = []
        if value and getattr(value, "url", None):
            image_url = value.url
            file_name = str(value)
            output.append(u' <a href="%s" target="_blank"><img src="%s" alt="%s" width="150" height="150"  style="object-fit: cover;"/></a> %s ' %
                          (image_url, image_url, file_name, ''))
        output.append(super(AdminFileWidget, self).render(name, value, attrs))
        return ''.join(output)


class quartzManufacturerInfoPicturesInline(admin.TabularInline):
    formfield_overrides = {ImageField: {'widget': AdminImageWidget}}

    model = quartzManufacturerInfoPictures


@ admin.register(QuartzStone)
class QuartzStoneAdmin(ImportExportModelAdmin):
    inlines = [QuartzConfigurationInline]
    exclude = ("id",)
    list_filter = ('manufacturer',)
    list_display = ("name", "code", 'manufacturer')
    search_fields = ('name', 'code', 'manufacturer__name',)
    ordering = ('manufacturer__name', 'name',)


@admin.register(QuartzStoneConfiguration)
class QuartzStoneConfiguration(ImportExportModelAdmin):
    resource_class = QuartzStoneConfigurationResource
    exclude = ("id",)
    list_filter = ('stone__manufacturer', 'slab_size', 'thickness')
    list_display = ('stone', 'thickness', 'slab_size')
    search_fields = ('code',)
    ordering = ('stone__manufacturer__name',)


@admin.register(QuartzManufacturer)
class QuartzManufacturerAdmin(admin.ModelAdmin):
    inlines = [quartzManufacturerInfoPicturesInline]


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

    try:
        manufacturers = AcrylicManufacturer.objects.all()

        for manufacturer in manufacturers:
            setattr(cls, manufacturer.name, dummyManufacturerFunction(
                manufacturer=manufacturer.name))
            fields.append(manufacturer.name)
    except (OperationalError, ProgrammingError) as e:
        pass

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


@ admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    readonly_fields = ('update_time',)
    list_display = ('name', 'value', 'value_date')
    list_editable = ('value', 'value_date')


admin.site.register(AcrylicCollection, AcrylicCollectionAdmin)
admin.site.register(AcrylicManufacturer, AcrylicManufaturerAdmin)
admin.site.register(Colors)
admin.site.register(Thickness)
admin.site.register(Texture)
admin.site.register(Material)
admin.site.register(AcrylicConfiguration, AcrylicConfigurationAdmin)
admin.site.register(SurfaceType)
admin.site.register(SlabSize)
admin.site.register(ConfigurationDiscount)
