import re
from datetime import datetime
from decimal import Decimal

import tablib
from django.db.models import Q

from .. import models


class Parser:

    def __init__(self) -> None:
        self.format = None

    @staticmethod
    def parse(file):
        table = tablib.import_set(
            file.decode('UTF-8'), format='csv', headers=False)
        # json.loads(table.json)
        # [{i: col for i, col in enumerate(row)} for row in table.dict]
        # table.dict
        return [{idx: col for idx, col in enumerate(row)} for row in table.dict]
        # ext = file.split('.')[-1]


class Importer:

    def __init__(self, data):
        self.data = tablib.Dataset()
        meta = data.get('meta', {})

        manufacturer_id = meta.get('manufacturer').get('id')
        manufacturer = models.Manufacturer.objects.get(pk=manufacturer_id)
        addons = manufacturer.material.addons.all()

        self.data.dict = data.get('entries')

        pricelist_discount = models.MarginDiscount(
            is_discount=True,
            _value=Decimal(meta.get('discount', 0))
        )
        pricelist_discount.save()

        active_from_str = meta.get('active_from')
        if active_from_str:
            active_from = datetime.fromtimestamp(active_from_str)
        else:
            active_from = datetime.now()

        pricelist = models.PriceList(
            manufacturer=manufacturer,
            active_from=active_from,
            discount=pricelist_discount
        )
        pricelist.save()
        for row in data.get('entries'):

            name = row['name']

            w, h = re.findall(r"\d*.(?=\D)|(?<=\D)\d*.",
                              row['slab_size'], re.MULTILINE)
            try:
                slab_size = models.SlabSize.objects.get(
                    Q(width=w), Q(height=h))
            except models.SlabSize.DoesNotExist:
                slab_size = models.SlabSize(width=w, height=h)
                slab_size.save()
            try:
                stone = models.Stone.objects.get(
                    Q(name=name), Q(manufacturer=manufacturer))
            except models.Stone.DoesNotExist:
                stone = models.Stone(name=name, manufacturer=manufacturer)
                stone.save()

            thickness_value = row.get('thickness', 20)
            try:
                thickness = models.Thickness.objects.get(
                    value=thickness_value)
            except models.Thickness.DoesNotExist:
                thickness = models.Thickness(value=thickness_value)
                thickness.save()

            surface_name = row.get('surface', 'Полированная')
            try:
                surface = models.Surface.objects.get(name=row.get('surface'))
            except models.Surface.DoesNotExist:
                surface = models.Surface(
                    name=surface_name,
                    family='MATT'
                )
                surface.save()

            try:
                price = row['price']
            except KeyError:
                if stone.collection and stone.collection.default_price:
                    price = stone.collection.default_price
                else:
                    price = Decimal(0)

            entry = models.StoneConfiguration(
                code=row.get('code'),
                stone=stone,
                pricelist=pricelist,
                surface=surface,
                thickness=thickness,
                slab_size=slab_size,
                price=price,
            )
            entry.save()

            for addon in addons:
                value = row.get(addon.name, False)
                models.MaterialAddonValue(
                    stone=entry,
                    addon=addon,
                    value=bool(value)
                ).save()
