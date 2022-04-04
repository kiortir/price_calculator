from collections import defaultdict
import collections

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from import_export import widgets

from .models import AcrylicCollection,  SlabSize, Thickness
from .quartz_models import QuartzStone, QuartzManufacturer


class toCollection(widgets.Widget):

    def clean(self, value: str, row=None, *args, **kwargs):
        try:
            manufacturer = row['manufacturer']
            if not manufacturer:
                raise KeyError
            return AcrylicCollection.objects.filter(
                manufacturer__name=manufacturer).get(name__iexact=value)
        except KeyError:
            return AcrylicCollection.objects.get(
                name__iexact=value)

    # def render(self, value, obj=None):
    #     print(value.manufacturer)
    #     return f'{value.manufacturer}/{value.name}'


class SlabSizeWidget(widgets.Widget):
    def clean(self, value, row=None, *args, **kwargs):
        try:
            height = row['height']
            width = row['width']
            if not (height and width):
                raise KeyError
            return SlabSize.objects.get(Q(height=height), Q(width=width))
        except KeyError:
            return SlabSize.objects.get(id=1)


class QuartzStoneNameWidget(widgets.Widget):
    def clean(self, value, row=None, *args, **kwargs):
        print(value)
        try:
            manufacturer = row['manufacturer']
            if not manufacturer:
                raise KeyError
            return QuartzStone.objects.filter(
                manufacturer__name=manufacturer).get(name__iexact=value)
        except KeyError:
            return QuartzStone.objects.get(name__iexact=value)
        except ObjectDoesNotExist:
            code = row.get('code')
            collection = row.get('collection')
            info = row.get('info')
            return QuartzStone.objects.create(
                name=value,
                manufacturer=QuartzManufacturer.objects.get(name=manufacturer),
                code=code,
                collection=collection
                info=info
            )

# class Equivalents(widgets.ManyToManyWidget):

#     def clean(self, value: str, row=None, *args, **kwargs):
#         if not value:
#             return self.model.objects.none()
#         equivalents = value.split(self.separator)
#         filter_dict = defaultdict(str)
#         for equivalent in equivalents:
#             manufacturer
#             filter_dict['']

#         return self.model.objects.filter(**{
#             '%s__in' % self.field: ids
#         })
