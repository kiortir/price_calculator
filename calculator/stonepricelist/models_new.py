import datetime
import base64
import hashlib
import os
from decimal import Decimal
from functools import partial
from io import BytesIO
from statistics import mode
from tabnanny import verbose

from django.conf import settings
from django.core.cache import cache
from django.db import models
from PIL import Image

from calculator.stonepricelist.models import Texture


class PriortyMixin(models.Model):
    priority = models.PositiveSmallIntegerField(default=500)

    class Meta:
        ordering = ['priority']
        abstract = True


class Material(PriortyMixin):
    name = models.CharField(max_length=60, verbose_name='название материала')
    margin_percent = models.DecimalField(
        max_digits=15, decimal_places=2, null=True, blank=True, verbose_name='наценка, %')
    info = models.TextField()

    @property
    def margin(self) -> Decimal:
        return Decimal(1) + self.margin_percent / Decimal(100)


class Currency(models.Model):
    name = models.CharField(max_length=30, blank=True,
                            null=True, verbose_name='название')
    code = models.CharField(max_length=3, unique=True,
                            verbose_name='код валюты ЦБ', null=True, blank=True)
    value = models.DecimalField(max_digits=15, decimal_places=2)

    value_date = models.DateField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    auto_update = models.BooleanField(
        default=True, verbose_name='обновлять автоматически')

    class Meta:
        verbose_name = 'валюта'
        verbose_name_plural = 'валюты'

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.name


class CurrencySchema(models.Model):
    name = models.CharField(max_length=50, blank=True,
                            null=True, verbose_name='название схемы')

    currency = models.ForeignKey(
        Currency, on_delete=models.CASCADE, related_name='modifiers', verbose_name='валюта основы')

    margin = models.DecimalField(
        max_digits=15, decimal_places=2, null=True, blank=True, verbose_name='наценка, %')

    floor = models.DecimalField(
        max_digits=15, decimal_places=2, null=True, blank=True, verbose_name='минимальное значение')
    ceiling = models.DecimalField(
        max_digits=15, decimal_places=2, null=True, blank=True, verbose_name='максимальное значение значение')

    @property
    def value_date(self):
        return max(self.currency.value_date or datetime.date(2000, 1, 1), self.currency.update_time.date())

    @property
    def value(self):
        raw = self.currency.value or 0
        margin = 1 + (self.margin or 0) / Decimal('100')
        with_margin = raw * margin
        v = max(self.floor or Decimal(0), with_margin)
        if self.ceiling:
            v = min(v, self.ceiling)
        return v

    def __repr__(self):
        return self.title or self.id

    def __str__(self):
        return self.title or self.id


class Manufacturer(PriortyMixin):

    name = models.CharField(max_length=50, verbose_name='производитель')
    currency = models.ForeignKey(CurrencySchema, on_delete=models.SET_NULL)

    material = models.ForeignKey(
        Material, on_delete=models.SET_NULL, null=True, blank=True)

    country_of_origin = models.CharField(
        max_length=50, null=True, blank=True, verbose_name='страна происхождения')


class ManufacturerInfo(models.Model):
    manufacturer = models.OneToOneField(
        Manufacturer, on_delete=models.CASCADE, related_name='info')
    text = models.TextField(verbose_name='описание')


def hash_file(file, block_size=65536):
    hasher = hashlib.md5()  # nosec
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


class Image(models.Model):
    image = models.ImageField(upload_to=upload_to)
    thumbnail = models.TextField(blank=True, null=True)

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

        super(Image, self).save(
            force_insert, force_update, using, update_fields)


class ManufacturerInfoImage(models.Model):
    info_block = models.ForeignKey(ManufacturerInfo, on_delete=models.CASCADE)
    image = models.OneToOneField(Image, on_delete=models.CASCADE)
    meta = models.TextField(blank=True, null=True)


class Texture(PriortyMixin):

    name = models.CharField(max_length=60, verbose_name='название текстуры')

    class Meta:

        verbose_name = 'текстура'
        verbose_name_plural = 'текстуры'

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.__repr__()


class Color(PriortyMixin):

    name = models.CharField(max_length=60, verbose_name='название цвета')

    class Meta:

        verbose_name = 'цвет'
        verbose_name_plural = 'цвета'

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.__repr__()
    
    
class Collection(PriortyMixin):
    manufacturer = models.ForeignKey(
        Manufacturer, on_delete=models.CASCADE, related_name='stones')
    
    name = models.CharField(max_length=60, verbose_name='название')
    standart_price = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True, verbose_name='цена по умолчанию')
    standart_texture = models.ForeignKey(Texture, null=True, blank=True, related_name='collections')
    
    class Meta:
        unique_together = [['manufacturer__name', 'name']]


class Stone(PriortyMixin):
    manufacturer = models.ForeignKey(
        Manufacturer, on_delete=models.CASCADE, related_name='stones')

    name = models.CharField(max_length=60)
    texture = models.ForeignKey(
        Texture, on_delete=models.SET_NULL, null=True, blank=True)
    color = models.ForeignKey(
        Color, on_delete=models.SET_NULL, null=True, blank=True)

    bitrix_xml_id = models.TextField(blank=True, null=True)
    
    class Meta:
        unique_together = [['manufacturer__name', 'name']]


class StoneInfo(models.Model):
    stone = models.OneToOneField(
        Stone, related_name='info', on_delete=models.CASCADE)

    description = models.TextField(
        null=True, blank=True, verbose_name='описание')
    main_image = models.OneToOneRel(
        Image, on_delete=models.SET_NULL, null=True, blank=True)


class StoneGallery(models.Model):
    infoblock = models.ForeignKey(
        StoneInfo, on_delete=models.CASCADE, related_name='gallery')
    image = models.OneToOneRel(Image, on_delete=models.CASCADE)


class Pricelist(models.Model):
    activation_date = models.DateTimeField(
        verbose_name='дата активации', default=datetime.datetime.now())
    manufacturer = models.ForeignKey(
        Manufacturer, on_delete=models.CASCADE, related_name='pricelists')


class Surface(PriortyMixin):

    SURFACE_FAMILY_CHOICES = [
        ('polished', 'Полированная'),
        ('matt', 'Матовая'),
        ('textured', 'Текстурированная')
    ]

    name = models.CharField(
        max_length=50, verbose_name='название поверхности', unique=True)
    family = models.CharField(
        max_length=8, choices=SURFACE_FAMILY_CHOICES, default='Полированная', verbose_name='общий тип')

    class Meta:

        verbose_name = 'тип поверхности'
        verbose_name_plural = 'типы поверхностей'

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.__repr__()


class Thickness(PriortyMixin):

    value = models.PositiveSmallIntegerField()

    class Meta:

        verbose_name = 'толщина камня'
        verbose_name_plural = 'толщины камней'

    def __repr__(self) -> str:
        return f'{self.value}мм'

    def __str__(self) -> str:
        return self.__repr__()


class SlabSize(PriortyMixin):

    name = models.CharField(max_length=40, null=True,
                            blank=True, default=None, verbose_name='название')
    width = models.PositiveSmallIntegerField(verbose_name='ширина')
    height = models.PositiveSmallIntegerField(verbose_name='высота')

    @property
    def area(self) -> float:
        return round(self.width * self.height / 1000000, 2)

    def __repr__(self) -> str:
        return f'{self.width}*{self.height} мм'

    def __str__(self) -> str:
        return self.__repr__()

    class Meta:

        verbose_name = 'размер слэба'
        verbose_name_plural = 'размеры слэбов'
        unique_together = [['width', 'height']]


class PricelistEntry(PriortyMixin):
    pricelist = models.ForeignKey(Pricelist, on_delete=models.CASCADE,
                                  related_name='entries', verbose_name='элементы прайс-листа')

    surface = models.ForeignKey(
        Surface, on_delete=models.SET_NULL, null=True, blank=True)
    thickness = models.ForeignKey(
        Thickness, on_delete=models.SET_NULL, null=True, blank=True)
    slab_size = models.ForeignKey(
        SlabSize, on_delete=models.SET_NULL, null=True, blank=True)
