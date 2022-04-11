from functools import partial
import os
import hashlib
import base64
import math
from functools import reduce
from io import BytesIO

from django.conf import settings
from django.core.cache import cache
from django.db import models
from django.db.models import Count, Max
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
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
    def cut_price(self):
        try:
            currency = self.slab_cut_currency.value
        except AttributeError:
            return self.applied_currency.get('value', 1)
        cut = self.slab_cut_price or 2000
        return currency * cut

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
        elif self.currency_multiplier_percent:
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


def hash_file(file, block_size=65536):
    hasher = hashlib.md5()
    for buf in iter(partial(file.read, block_size), b''):
        hasher.update(buf)

    return hasher.hexdigest()


def upload_to(instance, filename):
    """
    :type instance: dolphin.models.File
    """
    instance.image.open()
    filename_base, filename_ext = os.path.splitext(filename)

    return os.path.join('manufacturer_info', f"{filename_base}_{hash_file(instance.image)}.{filename_ext}")


class quartzManufacturerInfoPictures(models.Model):
    relation = models.ForeignKey(
        QuartzManufacturer, on_delete=models.CASCADE, related_name='info_images')
    image = models.ImageField(upload_to=upload_to)
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
                self.thumbnail = None

        super(quartzManufacturerInfoPictures, self).save(
            force_insert, force_update, using, update_fields)


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
    code = models.CharField(max_length=20, default=None, blank=True,
                            null=True, verbose_name='артикул')
    stone = models.ForeignKey(
        QuartzStone, on_delete=models.CASCADE, related_name='configurations')
    thickness = models.ForeignKey(Thickness, on_delete=models.PROTECT, related_name='configurations',
                                  verbose_name='толщина камня',)
    surface = models.ForeignKey(SurfaceType, on_delete=models.PROTECT,
                                verbose_name='полировка', related_name='configurations')
    slab_size = models.ForeignKey(SlabSize, on_delete=models.PROTECT,
                                  verbose_name='размер листа', related_name='configurations')

    price = models.IntegerField(verbose_name='стоимость конфигурации')
    overprice = models.IntegerField(
        verbose_name='наценка к стоимости', default=0, null=True, blank=True)

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
        return math.ceil((self.price * mul + (self.overprice or 0)) * currency_value)


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
