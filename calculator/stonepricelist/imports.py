from import_export import widgets
from .models import AcrylicCollection
from collections import defaultdict


class toCollection(widgets.Widget):

    def clean(self, value: str, row=None, *args, **kwargs):
        manufacturer, collection = value.split('/')

        collection_list = AcrylicCollection.objects.filter(
            manufacturer__name=manufacturer)
        print(collection, collection in list(
            map(lambda x: x.name, collection_list)))
        requested_collection = collection_list.get(name=collection)
        return requested_collection

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
