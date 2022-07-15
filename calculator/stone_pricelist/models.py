from django.db.models import Q
from functools import reduce
from tabnanny import verbose
from django.db.models import Count, Max
from decimal import Decimal
import datetime
import math


from django.db import models

from django.utils import timezone


class PriorityMixin(models.Model):

    priority = models.PositiveSmallIntegerField(
        default=500, verbose_name='индекс сортировки')

    class Meta:
        ordering = ['priority']
        abstract = True


class MarginDiscount(models.Model):

    _value = models.DecimalField(
        max_digits=5, decimal_places=2, verbose_name='скидка/наценка, %')

    is_discount = models.BooleanField(default=False)

    from_date = models.DateTimeField(null=True, blank=True)
    to_date = models.DateTimeField(null=True, blank=True)

    @property
    def value(self):
        now = timezone.now()
        is_active = True
        if self.from_date:
            is_active = self.from_date < now
        if self.to_date and is_active:
            is_active = self.to_date > now
        return Decimal(1) - (self._value / Decimal(100) if is_active else 0) * (1 if self.is_discount else -1)

    def __repr__(self):
        return self._value

    def __str__(self):
        return str(self._value)


class Currency(PriorityMixin):

    name = models.CharField(max_length=30, unique=True,
                            verbose_name='название')
    code = models.CharField(max_length=3,
                            verbose_name='код валюты ЦБ', null=True, blank=True)
    value = models.DecimalField(max_digits=15, decimal_places=2)

    value_date = models.DateField(null=True, blank=True)
    update_time = models.DateTimeField(auto_now=True)

    auto_update = models.BooleanField(
        default=True, verbose_name='обновлять автоматически')

    class Meta(PriorityMixin.Meta):

        verbose_name = 'валюта'
        verbose_name_plural = 'валюты'

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.name


class CurrencyModifier(models.Model):

    name = models.CharField(max_length=50, unique=True,
                            verbose_name='название схемы')

    currency = models.ForeignKey(
        Currency, on_delete=models.CASCADE, related_name='modifiers', verbose_name='валюта основы')

    margin = models.OneToOneField(
        MarginDiscount, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='наценка, %'
    )

    floor = models.DecimalField(
        max_digits=15, decimal_places=2, default=Decimal(0), verbose_name='минимальное значение')
    ceiling = models.DecimalField(
        max_digits=15, decimal_places=2, null=True, blank=True, verbose_name='максимальное значение значение')

    @property
    def value_date(self):
        return max(self.currency.value_date or datetime.date(2000, 1, 1), self.currency.update_time.date())

    @property
    def value(self):
        margin = Decimal(1) + (self.margin.value or Decimal(0)
                               ) / Decimal('100')
        with_margin = self.currency.value * margin
        _value = max(self.floor, with_margin)
        if self.ceiling:
            v = min(v, self.ceiling)
        return _value

    def __repr__(self):
        return self.name or self.id

    def __str__(self):
        return self.name or self.id


class MaterialAddon(PriorityMixin):

    name = models.CharField(max_length=50, unique=True,
                            verbose_name='свойство')

    class Meta(PriorityMixin.Meta):
        verbose_name = 'дополнительное поле'
        verbose_name_plural = 'дополнительные поля'


class Material(PriorityMixin):

    name = models.CharField(max_length=70, unique=True,
                            verbose_name='название')

    alias = models.CharField(max_length=25, unique=True,
                             verbose_name='кодовое название')

    margin_percent = models.DecimalField(
        max_digits=15, decimal_places=2, default=0, verbose_name='наценка на материал, %')

    addons = models.ManyToManyField(
        MaterialAddon, blank=True, verbose_name='дополнительные поля', related_query_name='addons')

    @property
    def margin(self):
        return Decimal(1) + self.margin_percent / Decimal(100)

    class Meta(PriorityMixin.Meta):
        verbose_name = 'материал'
        verbose_name_plural = 'материалы'

    def __str__(self):
        return self.name


class Manufacturer(PriorityMixin):

    name = models.CharField(
        max_length=70, verbose_name='название', unique=True)

    material = models.ForeignKey(
        Material, on_delete=models.PROTECT, verbose_name='материал')
    currency = models.ForeignKey(
        CurrencyModifier, on_delete=models.SET_NULL, null=True, related_name='manufacturers', verbose_name='валюта')

    raw_cut_price = models.DecimalField(
        max_digits=15, decimal_places=2, default=Decimal(1500), verbose_name='цена распила')
    cut_currency = models.ForeignKey(
        CurrencyModifier, on_delete=models.SET_DEFAULT, default=1, verbose_name='валюта распила')

    @property
    def cut_price(self):
        return self.cut_currency.value * self.raw_cut_price

    @property
    def modified(self):
        return math.ceil(self.stones.aggregate(Max('modified')).get('modified__max').timestamp() * 1000)

    @property
    def latest_pricelist(self):
        return self.pricelists \
            .all() \
            .filter(
                Q(is_active=True),
                Q(active_from__lte=timezone.now())
            )\
            .latest('active_from')

    class Meta(PriorityMixin.Meta):
        verbose_name = 'производитель'
        verbose_name_plural = 'производители'

    def __str__(self):
        return self.name


class TextureType(PriorityMixin):

    name = models.CharField(
        max_length=50, verbose_name='название рисунка', unique=True)

    class Meta(PriorityMixin.Meta):
        verbose_name = 'тип рисунка'
        verbose_name_plural = 'типы рисунков'


class Color(PriorityMixin):
    name = models.CharField(
        max_length=70, verbose_name='название цвета', unique=True)
    code = models.CharField(max_length=7, null=True,
                            blank=True, verbose_name='hex-значение')

    class Meta(PriorityMixin.Meta):
        verbose_name = 'цвет'
        verbose_name_plural = 'цвета'


class Collection(PriorityMixin):
    active = models.BooleanField(default=True)

    name = models.CharField(max_length=70, verbose_name='название коллекции')

    manufacturer = models.ForeignKey(
        Manufacturer, on_delete=models.PROTECT, related_name='collections', verbose_name='производитель')

    default_price = models.DecimalField(
        max_digits=15, decimal_places=2, verbose_name='цена по умолчанию')
    default_texture = models.ForeignKey(
        TextureType, on_delete=models.SET_NULL, null=True, blank=True, related_name='collections', )

    class Meta(PriorityMixin.Meta):
        unique_together = [['manufacturer', 'name']]
        verbose_name = 'коллекция'
        verbose_name_plural = 'коллекции'


class InternetImageGallery(models.Model):
    pass


class InternetImage(models.Model):
    url = models.TextField(verbose_name='ссылка на изображение')
    thumbnail = models.TextField(
        verbose_name='ссылка на превью', null=True, blank=True)

    gallery = models.ForeignKey(
        InternetImageGallery, null=True, blank=True, on_delete=models.CASCADE)


class Stone(PriorityMixin):
    active = models.BooleanField(default=True)

    name = models.CharField(max_length=100, verbose_name='название текстуры')
    manufacturer = models.ForeignKey(
        Manufacturer, on_delete=models.PROTECT, related_name='stones', verbose_name='производитель')
    collection = models.ForeignKey(
        Collection, on_delete=models.PROTECT, related_name='stones', null=True, blank=True, verbose_name='коллекция')

    texture_type = models.ForeignKey(
        TextureType, on_delete=models.SET_NULL, null=True, blank=True, related_name='stones', verbose_name='типа текстуры')
    color = models.ForeignKey(
        Color, on_delete=models.SET_NULL, null=True, blank=True, related_name='stones')

    preview = models.ForeignKey(
        InternetImage, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='фото камня')

    gallery = models.OneToOneField(
        InternetImageGallery, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='галерея')

    bitrix_id = models.TextField(
        verbose_name='id битрикс', null=True, blank=True)

    similar = models.ManyToManyField('self', blank=True)

    class Meta(PriorityMixin.Meta):
        verbose_name = 'камень'
        verbose_name_plural = 'камни'

    def __str__(self) -> str:
        return self.name


class Thickness(PriorityMixin):

    value = models.PositiveSmallIntegerField(
        unique=True, verbose_name='толщина, мм')

    class Meta(PriorityMixin.Meta):

        verbose_name = 'толщина камня'
        verbose_name_plural = 'толщины камней'

    def __repr__(self) -> str:
        return f'{self.value}мм'

    def __str__(self) -> str:
        return f'{self.value}мм'


class Surface(PriorityMixin):

    SURFACE_FAMILY_CHOICES = [
        ('POLI', 'Полированная'),
        ('MATT', 'Матовая'),
        ('TEXT', 'Фактурная')
    ]

    name = models.CharField(
        max_length=70, verbose_name='название поверхности', unique=True)

    family = models.CharField(
        max_length=4, choices=SURFACE_FAMILY_CHOICES, default='Полированная', verbose_name='категория поверхности')

    class Meta(PriorityMixin.Meta):
        verbose_name = 'тип поверхности'
        verbose_name_plural = 'типы поверхностей'

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = 'поверхность'
        verbose_name_plural = 'поверхности'


class SlabSize(PriorityMixin):

    width = models.PositiveSmallIntegerField(verbose_name='ширина')
    height = models.PositiveSmallIntegerField(verbose_name='высота')

    @property
    def area(self):
        return Decimal(self.width) * Decimal(self.height) / Decimal(1_000_000)

    @property
    def size(self):
        return f'{self.width}*{self.height}'

    def __str__(self) -> str:
        return self.size

    def __repr__(self) -> str:
        return self.size

    class Meta:
        verbose_name = 'размер листа'
        verbose_name_plural = 'размеры листов'


class PriceList(models.Model):

    is_active = models.BooleanField(default=True, verbose_name='активен')
    active_from = models.DateTimeField(
        default=timezone.now, verbose_name='активен с')
    active_to = models.DateTimeField(
        default=None, null=True, blank=True,  verbose_name='активен до')

    manufacturer = models.ForeignKey(
        Manufacturer, related_name='pricelists', on_delete=models.CASCADE)
    discount = models.OneToOneField(
        MarginDiscount, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='общая скидка, %'
    )

    created_at = models.DateTimeField(auto_now_add=True)


class StoneConfiguration(models.Model):

    stone = models.ForeignKey(
        Stone, on_delete=models.PROTECT, related_name='configurations')
    pricelist = models.ForeignKey(
        PriceList, on_delete=models.CASCADE, related_name='entries')

    surface = models.ForeignKey(Surface, to_field='name', default='Полированная',
                                on_delete=models.PROTECT, related_name='pricelist_entries')
    thickness = models.ForeignKey(
        Thickness, to_field='value', default=20, on_delete=models.PROTECT, related_name='pricelist_entries')
    slab_size = models.ForeignKey(
        SlabSize, on_delete=models.PROTECT, related_name='pricelist_entries')

    discount = models.OneToOneField(
        MarginDiscount, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='скидка, %'
    )

    code = models.CharField(max_length=50, null=True, blank=True)

    price = models.DecimalField(max_digits=15, decimal_places=2)

    @property
    def rub_price(self):
        pricelist: PriceList = self.pricelist
        manufacturer: Manufacturer = pricelist.manufacturer
        currency = manufacturer.currency.value
        pricelist_discount = pricelist.discount.value
        manufacturer_margin = manufacturer.material.margin
        if self.discount:
            discount = Decimal(1) - self.discount / Decimal(100)
        else:
            discount = 1
        return math.ceil(currency * pricelist_discount * manufacturer_margin * discount * self.price)


class MaterialAddonValue(models.Model):
    stone = models.ForeignKey(
        StoneConfiguration, on_delete=models.CASCADE, related_name='addons')

    addon = models.ForeignKey(MaterialAddon, on_delete=models.CASCADE)
    value = models.BooleanField(default=False)
