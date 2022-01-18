from import_export import widgets
from .models import AcrylicCollection
from collections import defaultdict


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
