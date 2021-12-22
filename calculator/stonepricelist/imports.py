from import_export import widgets
from .models import AcrylicCollection


class toCollection(widgets.Widget):

    def clean(self, value: str, row=None, *args, **kwargs):
        manufacturer, collection = value.split('/')

        collection_list = AcrylicCollection.objects.filter(
            manufacturer__name=manufacturer)
        print(collection, collection in list(
            map(lambda x: x.name, collection_list)))
        requested_collection = collection_list.get(name=collection)
        return requested_collection

    # def render(value):
    #     return f'{value.manufacturer}/{value.name}'
