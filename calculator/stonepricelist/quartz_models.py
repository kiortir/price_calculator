from django.core.cache import cache
from django.db.models.signals import post_save, post_delete, post_init
from django.dispatch import receiver
from django.db.models import Count
import numpy
import json
import base64
import math
from collections import defaultdict
from functools import cached_property, reduce
from io import BytesIO

from django.conf import settings
from django.db import models
from django.db.models import Max
from django.utils import timezone
from PIL import Image

from .models import (Currency, Manufacturer, Material, SlabSize, Stone,
                     SurfaceType, Thickness)


class QuartzManufacturer(Manufacturer):
    material = models.ForeignKey(Material, default='Кварцевый агломерат',
                                 on_delete=models.PROTECT, related_name='qzmanufacturers')

    priority = models.PositiveSmallIntegerField(default=500)

    additional_info = models.TextField(null=True, blank=True)

    card_color = models.CharField(
        max_length=7, default="#ffffff", verbose_name='цвет карточки')

    slab_cut_price = models.SmallIntegerField(verbose_name='цена распила')
    slab_cut_currency = models.ForeignKey(
        Currency, on_delete=models.PROTECT, null=True, blank=True, verbose_name='валюта подсчета цены распила', related_name='slab_currency')

    thickness_configurations = models.ManyToManyField(
        Thickness, verbose_name='варианты толщин')
    surface_configurations = models.ManyToManyField(
        SurfaceType, verbose_name='список полировок'
    )
    slab_size_configurations = models.ManyToManyField(
        SlabSize, verbose_name='список размеров'
    )

    class Meta:

        verbose_name = 'производитель кварца'
        verbose_name_plural = 'производители кварца'
        ordering = ['priority', 'name']

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.name

    @property
    def modified(self):
        return math.ceil(self.stones.aggregate(Max('modified')).get('modified__max').timestamp() * 1000)

    @property
    def multipliers(self):
        return reduce(lambda x, y: x*y, [self.discount, self.material.overprice])

    @property
    def applied_currency(self):
        if self.currency_value_override:
            date = self.currency_value_modified_at.strftime(
                '%d.%m.%y') if self.currency_value_modified_at else None
            currency_used = {
                "source": f"внутренний курс поставщика{f' на {date}' if date else ''}",
                "value": self.currency_value_override
            }
        elif self.currency_multiplier_percent > 0:
            currency_used = {
                "source": "внутренний курс поставщика (наценка к ЦБ)",
                "value": self.currency_multiplier_percent * self.currency.value
            }
        else:
            name = self.currency.name
            date = self.currency.value_date.strftime(
                '%d.%m.%y') if self.currency.value_date else None
            value = self.currency.value
            currency_used = {
                "source": f"{name}{f' на {date}' if date else ''}",
                "value": value
            }
        return currency_used

    @property
    def schema(self):
        keys = []
        stones = self.stones.prefetch_related('configurations')
        sizes = stones.annotate(Count('configurations__slab_size__width', distinct=True), Count(
            'configurations__slab_size__height', distinct=True))
        unique_slabs = set((size.configurations__slab_size__height__count,
                            size.configurations__slab_size__width__count) for size in sizes) == {(1, 1)}
        if stones.filter(code__isnull=False).exists():
            keys.append({
                "title": "арт",
                "key": "_code"
            })
        keys.append({
            "title": "Название",
            "key": "_name"
        })
        if unique_slabs:
            keys.append({
                "title": "Плита",
                "key": "_slab_size"
            })
            keys.append({
                "title": "Цена",
                "key": "_price"
            })
        else:
            for slab in self.slab_size_configurations.all():
                keys.append({
                    "title": f'{slab.width}x{slab.height}мм',
                    "key": f'{slab.width}x{slab.height}'
                })
        return keys


class quartzManufacturerInfoPictures(models.Model):
    relation = models.ForeignKey(
        QuartzManufacturer, on_delete=models.CASCADE, related_name='info_images')
    image = models.ImageField()
    thumbnail = models.TextField(blank=True, null=True)
    text = models.TextField(null=True, blank=True)

    @property
    def image_url(self):
        return "{0}{1}".format(settings.MEDIA_URL, self.image)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if not self.image:
            self.thumbnail = None
        else:
            thumbnail_size = 128, 128
            data_img = BytesIO()
            tiny_img = Image.open(self.image)
            tiny_img.thumbnail(thumbnail_size)
            tiny_img.save(data_img, format="BMP")
            tiny_img.close()
            try:
                self.thumbnail = "data:image/jpg;base64,{}".format(
                    base64.b64encode(data_img.getvalue()).decode("utf-8")
                )
            except UnicodeDecodeError:
                self.blurred_image = None

        super(quartzManufacturerInfoPictures, self).save(
            force_insert, force_update, using, update_fields)


class QuartzSchema(models.Model):
    manufacturer = models.OneToOneField(
        to=QuartzManufacturer, on_delete=models.CASCADE, related_name="table")
    schema = models.JSONField(null=True, blank=True)
    advanced_surface_display = models.BooleanField(default=False)

    def updateSchema(self):
        rows = {}
        stones = self.manufacturer.stones.prefetch_related('configurations')
        sizes = stones.annotate(Count('configurations__slab_size__width', distinct=True), Count(
            'configurations__slab_size__height', distinct=True))
        slab_size_col = set((size.configurations__slab_size__height__count,
                             size.configurations__slab_size__width__count) for size in sizes) == {(1, 1)}
        code = stones.filter(code__isnull=False).exists()
        print(slab_size_col)

        configurations = stones.order_by(
            'configurations__surface__priority',
            'configurations__slab_size__priority',
            'configurations__thickness__priority').values_list(
            'configurations__surface__alias',
            'configurations__slab_size__width',
            'configurations__slab_size__height',
            'configurations__thickness__value',).distinct()

        fields = ('surface',
                  'slab_size_w',
                  'slab_size_h',
                  'thickness',)
        counter = {field: dict() for field in fields}
        confuguration_list = []

        for configuration in configurations:
            dict_repr = dict(zip(fields, configuration))
            confuguration_list.append(dict_repr)
            for field, value in dict_repr.items():
                counter[field][value] = None
        collection_counter = {field:
                              {
                                  "values": value.keys(),
                                  "count": len(value)
                              } for field, value in counter.items()}

        distinct_slab = slab_size_col and collection_counter['slab_size_w']['count'] > 1
        unique_surface = collection_counter['surface']['count'] == 1
        unique_thickness = collection_counter['thickness']['count'] == 1
        depth = 3 - distinct_slab - \
            (unique_surface or self.advanced_surface_display) - unique_thickness

        keys = []
        flat_columns = [[] for _ in range(depth)] if depth else [[]]
        if code:
            keys.append('code')
            flat_columns[0].append({
                'title': 'арт.',
                'data': {
                    "colspan": 1,
                    "rowspan": depth
                }})

        keys.append('name')
        flat_columns[0].append({
            'title': 'Название',
            'data': {
                "colspan": 1,
                "rowspan": depth
            }})

        if distinct_slab:
            keys.append('_slab_size')
            flat_columns[0].append({
                'title': 'Плита',
                'data': {
                    "colspan": 1,
                    "rowspan": depth
                }})

        for surface in collection_counter['surface']['values']:
            keys.append(f'_{surface}')
            flat_columns[0].append({
                'title': surface,
                'data': {
                    "colspan": 1,
                    "rowspan": depth
                }})

        return
        columns = {}

        if self.advanced_surface_display:
            for surface in collection_counter['surface']['values']:
                rows[surface] = {
                    "colspan": 1,
                    "rowspan": depth
                }
                keys.append(f'_{surface}')
                flat_columns[0].append(
                    {'title': surface, 'prop': f'_{surface}', 'data': rows[surface]})

        if not unique_surface and not self.advanced_surface_display:
            surfaces = collection_counter['surface']['values']

            for surface in surfaces:
                columns[surface] = {
                    "__data": {
                        "colspan": 0,
                        "rowspan": 1,
                    },
                    "children": {}
                }
                flat_columns[0].append({
                    "title": surface,
                    'data': columns[surface]['__data']
                })
                data = [configuration for configuration in confuguration_list
                        if configuration['surface'] == surface]
                if not distinct_slab:
                    data = [configuration for configuration in confuguration_list
                            if configuration['surface'] == surface]
                    surface_slabs = list(dict.fromkeys(
                        [f'{configuration["slab_size_w"]}x{configuration["slab_size_h"]}' for configuration in data]))
                    for slab in surface_slabs:
                        columns[surface]['children'][slab] = {
                            "__data": {
                                "colspan": 0,
                                "rowspan": 1,
                            },
                            "children": {}
                        }
                        slab_data = [configuration for configuration in data
                                     if f'{configuration["slab_size_w"]}x{configuration["slab_size_h"]}' == slab]
                        if not unique_thickness:
                            for thickness in [configuration['thickness'] for configuration in slab_data]:
                                columns[surface]['children'][slab]['children'][thickness] = {
                                    "colspan": 1,
                                    "rowspan": 1,
                                }
                                columns[surface]['__data']['colspan'] += 1
                                columns[surface]['children'][slab]['__data']['colspan'] += 1
                                keys.append(
                                    '|'.join(
                                        (str(x)
                                         for x in (surface, slab, thickness))
                                    ))
                                flat_columns[2].append(
                                    {
                                        "data": {
                                            "colspan": 1,
                                            "rowspan": 1,
                                        },
                                        "title": thickness
                                    })
                        else:
                            columns[surface]['__data']['colspan'] += 1
                            columns[surface]['children'][slab]['__data']['colspan'] += 1
                            keys.append(
                                '|'.join(
                                    (str(x)
                                     for x in (surface, slab, collection_counter['thickness']['values'][0]))
                                ))
                        flat_columns[1].append(
                            {
                                "data": columns[surface]['children'][slab]['__data'],
                                "title": slab
                            })
                else:
                    if not unique_thickness:
                        for thickness in list(dict.fromkeys([configuration['thickness'] for configuration in data])):
                            columns[surface]['children'][thickness] = {}
                            columns[surface]['__data']['colspan'] += 1
                            flat_columns[1].append(
                                {
                                    "data": {
                                        'colspan': 1,
                                        'rowspan': 1
                                    },
                                    "title": f'{thickness}mm',
                                    'prop': thickness
                                })
                            keys.append(
                                '|'.join(
                                    (str(x)
                                     for x in (surface, thickness))
                                ))
        else:
            print(confuguration_list)
            if not distinct_slab:
                slabs = [f'{slab_w}x{slab_h}' for slab_w, slab_h in zip(
                    collection_counter['slab_size_w']['values'], collection_counter['slab_size_h']['values'])]
                for slab in slabs:
                    columns[slab] = {
                        "__data": {
                            "colspan": 0,
                            "rowspan": 1,
                        },
                        "children": {}
                    }
                    data = [configuration for configuration in confuguration_list
                            if f'{configuration["slab_size_w"]}x{configuration["slab_size_h"]}' == slab]
                    if not unique_thickness:
                        for thickness in [configuration['thickness'] for configuration in data]:
                            columns[slab]['children'][thickness] = {
                                "colspan": 1,
                                "rowspan": 1,
                            }
                            columns[slab]['__data']['colspan'] += 1
                            keys.append(
                                '|'.join(
                                    (str(x)
                                     for x in (slab, thickness))
                                ))
                            flat_columns[1].append(
                                {
                                    "data": {
                                        "colspan": 1,
                                        "rowspan": 1,
                                    },
                                    "title": thickness
                                })

                    else:
                        keys.append(slab)

                    flat_columns[0].append(
                        {
                            "data": columns[slab]['__data'],
                            "prop": slab,
                            "title": f'{slab}мм'
                        })
            else:
                if not unique_thickness:
                    data = [thickness for thickness in
                            collection_counter['thickness']['values']]
                    for thickness in data:
                        flat_columns[0].append(
                            {
                                "data": {
                                    "colspan": 1,
                                    "rowspan": 1,
                                },
                                "prop": thickness,
                                "title": f'{thickness}мм'
                            })
                        keys.append(thickness)
                else:
                    flat_columns[0].append(
                        {
                            "data": {
                                "colspan": 1,
                                "rowspan": 1,
                            },
                            "prop": 'price',
                            "title": 'Цена'
                        })
                    keys.append('price')
        rows |= columns
        self.schema = {
            "schema": rows,
            "keys": keys,
            "flat_columns": flat_columns
        }
        super(QuartzSchema, self).save()

        # super(QuartzSchema, self).save()


class QuartzStone(Stone):
    manufacturer = models.ForeignKey(
        QuartzManufacturer, on_delete=models.SET_NULL, null=True, blank=True, related_name="stones", verbose_name='производитель')
    collection = models.CharField(
        max_length=150, null=True, blank=True, verbose_name='коллекция')
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = [['manufacturer', 'name']]
        verbose_name = 'кварцевая текстура'
        verbose_name_plural = 'кварцевые текстуры'

    def save(self, *args, **kwargs):
        self.modified = timezone.now()
        return super(QuartzStone, self).save(*args, **kwargs)

    def __repr__(self):
        try:
            return f'{self.manufacturer} {self.name}'
        except Exception:
            super().__repr__()

    def __str__(self):
        try:
            return f'{self.manufacturer} {self.name}'
        except Exception:
            super().__str__()


class QuartzStoneConfiguration(models.Model):
    stone = models.ForeignKey(
        QuartzStone, on_delete=models.CASCADE, related_name='configurations')
    thickness = models.ForeignKey(Thickness, on_delete=models.PROTECT, related_name='configurations',
                                  verbose_name='толщина камня',)
    surface = models.ForeignKey(SurfaceType, on_delete=models.PROTECT,
                                verbose_name='полировка', related_name='configurations')
    slab_size = models.ForeignKey(SlabSize, on_delete=models.PROTECT,
                                  verbose_name='размер листа', related_name='configurations')

    price = models.IntegerField(verbose_name='стоимость конфигурации')

    discount = models.SmallIntegerField(
        default=0, verbose_name='скидка на конфигурацию')
    availabile_amount = models.FloatField(
        default=0, verbose_name='доступное количество')
    is_on_order = models.BooleanField(default=False)

    class Meta:

        verbose_name = 'конфигурация текстуры'
        verbose_name_plural = 'конфигурации текстур'

    def __repr__(self):
        try:
            return f'{self.stone.name} {self.surface.alias} {self.thickness}'
        except Exception:
            super().__repr__()

    def __str__(self):
        try:
            return f'{self.stone.name} {self.surface.alias} {self.thickness}'
        except Exception:
            super(QuartzStoneConfiguration, self).__str__()

    @ property
    def rub_price(self) -> int:
        currency_value = self.stone.manufacturer.applied_currency["value"]
        mul = self.stone.manufacturer.multipliers
        return math.ceil(self.price * mul * currency_value)


@receiver([post_save, post_delete, ], sender=QuartzStone)
@receiver([post_save, post_delete, ], sender=QuartzStoneConfiguration)
@receiver([post_save, post_delete, ], sender=QuartzManufacturer)
@receiver([post_save, post_delete, ], sender=Currency)
@receiver([post_save, post_delete, ], sender=SlabSize)
@receiver([post_save, post_delete, ], sender=Thickness)
@receiver([post_save, post_delete, ], sender=SurfaceType)
def flushCache(sender, **kwargs):
    print('signal; cache cleared')
    cache.clear()
