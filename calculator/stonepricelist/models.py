from collections import defaultdict
import math
import json

from django.db import models
from django.db.models.fields import CharField, PositiveIntegerField, SmallIntegerField
from django.utils import timezone


from smart_selects.db_fields import ChainedForeignKey, ChainedManyToManyField


class Material(models.Model):
    name = CharField(
        max_length=25, default='Акриловый камень', primary_key=True)
    percentage = SmallIntegerField(default=0, verbose_name='наценка, %')

    @property
    def overprice(self):
        return 1 + self.percentage / 100

    class Meta:
        verbose_name = 'глобальная наценка'
        verbose_name_plural = 'глобальные наценки'

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.name


class ConfigurationDiscount(models.Model):
    start = models.DateTimeField(
        default=timezone.now, verbose_name='время активации')
    end = models.DateTimeField(
        default=None, null=True, blank=True, verbose_name='время окончания')

    value = models.PositiveSmallIntegerField(default=0)

    class Meta:
        verbose_name = 'скидка на конфигурации'
        verbose_name_plural = 'скидки на конфигурации'


class Texture(models.Model):

    name = models.CharField(max_length=50, null=True,
                            blank=True, verbose_name='название')
    code = models.CharField(max_length=5, null=True,
                            blank=True, verbose_name='код типа текстуры')

    class Meta:

        verbose_name = 'тип текстуры'
        verbose_name_plural = 'типы текстур'

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.name


class Colors(models.Model):

    name = models.CharField(max_length=20, null=True,
                            blank=True, verbose_name='название')
    hex_code = models.CharField(
        max_length=6, null=True, blank=True, verbose_name='шестнадцатеричный код')

    class Meta:

        verbose_name = 'цвет'
        verbose_name_plural = 'цвета'

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.name


class SlabSize(models.Model):

    SLAB_TYPE_CHOICES = [
        ('NM', 'Normal/Standart'),
        ('JU', 'Jumbo'),
        ('NF', 'Нестандартный')
    ]

    width = models.PositiveSmallIntegerField(verbose_name='ширина')
    height = models.PositiveSmallIntegerField(verbose_name='высота')
    alias = models.CharField(max_length=40, null=True,
                             blank=True, default=None, verbose_name='название')

    short_type = models.CharField(
        max_length=2, choices=SLAB_TYPE_CHOICES, default='Normal/Standart', verbose_name='тип')

    @property
    def fSize(self):
        return f'{self.width}*{self.height} мм'

    @property
    def area(self) -> float:
        return self.width * self.height / 1000000

    def __repr__(self) -> str:
        return f'{self.alias} {self.fSize}'

    def __str__(self) -> str:
        return f'{self.alias} {self.fSize}'

    class Meta:

        verbose_name = 'размер слэба'
        verbose_name_plural = 'размеры слэбов'


class SurfaceType(models.Model):

    alias = models.CharField(max_length=50, null=True,
                             blank=True, verbose_name='название')
    similar = models.ManyToManyField(
        'self', blank=True, verbose_name='аналогичные')

    class Meta:

        verbose_name = 'тип поверхности'
        verbose_name_plural = 'типы поверхностей'

    def __repr__(self) -> str:
        return self.alias

    def __str__(self) -> str:
        return self.alias


class Stone(models.Model):

    name = models.CharField(max_length=100, blank=True,
                            null=True, verbose_name='название')
    code = models.CharField(max_length=20, default=None,
                            null=True, verbose_name='артикул')
    color = models.ForeignKey(
        Colors, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='цвет')
    similar_textures = models.ManyToManyField(
        'self', blank=True, verbose_name='похожие текстуры')

    class Meta:
        abstract = True


class Thickness(models.Model):

    value = models.PositiveSmallIntegerField()

    class Meta:

        verbose_name = 'толщина камня'
        verbose_name_plural = 'толщины камней'

    def __repr__(self) -> str:
        return f'{self.value}мм'

    def __str__(self) -> str:
        return f'{self.value}мм'


class Currency(models.Model):

    name = models.CharField(max_length=30, blank=True,
                            null=True, default="Доллар", verbose_name='название')
    code = models.CharField(max_length=3, unique=True,
                            default="USD", verbose_name='код валюты ЦБ')
    value = models.FloatField(default=0.0)
    value_date = models.DateField(null=True, blank=True)

    class Meta:

        verbose_name = 'валюта'
        verbose_name_plural = 'валюты'

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.name


class Manufacturer(models.Model):
    name = models.CharField(max_length=50, blank=True,
                            null=True, unique=True, verbose_name='название')
    code = models.CharField(max_length=10, blank=True,
                            null=True, verbose_name='код поставщика')
    currency = models.ForeignKey(
        Currency, on_delete=models.PROTECT, null=True, blank=True, verbose_name='валюта распространения')

    vendor_discount = models.FloatField(
        default=0.0, verbose_name='скидка поставщика, %')

    @property
    def discount(self):
        return 1 - self.vendor_discount / 100

    class Meta:
        abstract = True


class AcrylicManufacturer(Manufacturer):
    material = models.ForeignKey(Material, default='Акриловый камень',
                                 on_delete=models.PROTECT, related_name='manufacturers')

    priority = models.PositiveSmallIntegerField(default=500)

    additional_info = models.TextField(null=True, blank=True)

    class Meta:

        verbose_name = 'производитель акрила'
        verbose_name_plural = 'производители акрила'
        ordering = ['priority']

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.name


class AcrylicCollection(models.Model):

    name = models.CharField(max_length=40, blank=True,
                            null=True, verbose_name='название')
    texture = models.ForeignKey(
        Texture, on_delete=models.SET_NULL, null=True, blank=True, related_name='collections', verbose_name='тип текстуры')
    manufacturer = models.ForeignKey(
        AcrylicManufacturer, on_delete=models.CASCADE, related_name='collections', null=True, blank=True, verbose_name='производитель')
    priority = models.PositiveSmallIntegerField(default=500)

    standart_raw_price = PositiveIntegerField(
        default=0, null=True, verbose_name='стоимость стандартной конфигурации')

    isWhite = models.BooleanField(default=False)

    @property
    def price(self) -> int:
        return math.ceil(self.standart_raw_price * self.manufacturer.discount * self.manufacturer.currency.value * self.manufacturer.material.overprice)

    class Meta:

        verbose_name = 'акриловая коллекция'
        verbose_name_plural = 'акриловые коллекции'
        unique_together = [['manufacturer', 'name']]
        ordering = ['priority', 'standart_raw_price', 'name']

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.name


DEFAULT_CONFIGURATION_ENTRY = 1


class AcrylicConfiguration(models.Model):

    alias = models.CharField(
        max_length=50, null=True, blank=True)

    thickness = models.ForeignKey(
        Thickness, on_delete=models.SET_DEFAULT, default=DEFAULT_CONFIGURATION_ENTRY, related_name='dependant_configurations', verbose_name='толщина камня')
    raw_price = models.PositiveIntegerField(verbose_name='цена')
    material_discount = models.ForeignKey(
        ConfigurationDiscount, on_delete=models.SET_NULL, related_name='configurations', null=True, blank=True, verbose_name='индивидуальная скидка конфигурации')
    collection = models.ForeignKey(
        AcrylicCollection, on_delete=models.CASCADE,  related_name='configurations', null=True, blank=True)

    class Meta:

        verbose_name = 'конфигурация текстуры'
        verbose_name_plural = 'конфигурации текстуры'
        ordering = ['-raw_price']
        unique_together = [['alias', 'collection', 'thickness']]

    # def save(self, *args, **kwargs) -> None:
    #     if self.alias == 'Стандарт':
    #         self.collection._standart_price = self.price
    #         self.collection.save()

    #     return super().save(*args, **kwargs)

    @property
    def name(self) -> str:
        return f'{self.alias} {self.thickness}мм'

    @property
    def meterPrice(self) -> int:
        return self.price

    @property
    def price(self) -> int:
        manufacturer = self.collection.manufacturer
        return math.ceil(self.raw_price * manufacturer.discount * manufacturer.currency.value * manufacturer.material.overprice)

    def __repr__(self) -> str:
        return f'{self.collection.manufacturer.name}, {self.collection.name} {self.alias}, {self.thickness}'

    def __str__(self) -> str:
        return f'{self.collection.manufacturer.name}, {self.collection.name} {self.alias}, {self.thickness}'


class AcrylicStone(Stone):

    manufacturer = models.ForeignKey(
        AcrylicManufacturer, on_delete=models.SET_NULL, null=True, blank=True, related_name="stones", verbose_name='производитель')
    collection = ChainedForeignKey(
        AcrylicCollection, chained_field="manufacturer", chained_model_field="manufacturer", related_name="stones", show_all=False, auto_choose=True, sort=True, verbose_name='коллекция')

    same_textures = models.ManyToManyField(
        'self', blank=True, verbose_name='аналогичные текстуры')

    # configurations = ChainedManyToManyField(
    #     AcrylicConfiguration, chained_field="collection", chained_model_field="collection", null=True, blank=True, verbose_name='конфигурации')

    # notStandart = models.BooleanField(default=False)
    # isWhite = models.BooleanField(default=False)

    class Meta:

        unique_together = [['manufacturer', 'code']]
        verbose_name = 'акриловая текстура'
        verbose_name_plural = 'акриловые текстуры'

    # @property
    # def configuratons(self):
    #     pass

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.name


class additionalWorkAcryl(models.Model):
    name = models.CharField(max_length=150, null=True, blank=True)
    measurement = models.CharField(max_length=50, null=True, blank=True)
    cost = models.CharField(max_length=100, null=True, blank=True)
    spendings = models.CharField(max_length=100, null=True, blank=True)

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        if self.name:
            return self.name
        else:
            return 'Доп работа'
