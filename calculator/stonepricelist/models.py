from PIL import Image
import base64
from io import BytesIO
from django.conf import settings
import datetime
from functools import reduce, cached_property

from django.db.models import Max
from collections import defaultdict
import math


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
    priority = models.SmallIntegerField(default=500)
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
        unique_together = [['width', 'height']]
        ordering = ['priority']


class SurfaceType(models.Model):

    alias = models.CharField(max_length=50, null=True,
                             blank=True, verbose_name='название')
    similar = models.ManyToManyField(
        'self', blank=True, verbose_name='аналогичные')
    priority = models.SmallIntegerField(default=500)

    class Meta:

        verbose_name = 'тип поверхности'
        verbose_name_plural = 'типы поверхностей'
        ordering = ['priority']

    def __repr__(self) -> str:
        return self.alias

    def __str__(self) -> str:
        return self.alias


class Stone(models.Model):

    name = models.CharField(max_length=100, blank=True,
                            null=True, verbose_name='название')
    code = models.CharField(max_length=20, default=None, blank=True,
                            null=True, verbose_name='артикул')
    color = models.ForeignKey(
        Colors, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='цвет')
    texture = models.ForeignKey(
        Texture, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='текстура')
    similar_textures = models.ManyToManyField(
        'self', blank=True, verbose_name='похожие текстуры')

    class Meta:
        abstract = True

    # def __repr__(self):
    #     return self.name


class Thickness(models.Model):

    value = models.PositiveSmallIntegerField()
    priority = models.SmallIntegerField(default=500)

    class Meta:

        verbose_name = 'толщина камня'
        verbose_name_plural = 'толщины камней'
        ordering = ['priority']

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
    auto_update = models.BooleanField(
        default=True, verbose_name='обновлять автоматически')

    class Meta:

        verbose_name = 'валюта'
        verbose_name_plural = 'валюты'

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.name


class Manufacturer(models.Model):
    __original_currency_value_override = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__original_currency_value_override = self.currency_value_modified_at

    name = models.CharField(max_length=50, blank=True,
                            null=True, unique=True, verbose_name='название')
    code = models.CharField(max_length=10, blank=True,
                            null=True, verbose_name='код поставщика')
    currency = models.ForeignKey(
        Currency, on_delete=models.PROTECT, null=True, blank=True, verbose_name='валюта распространения')
    currency_value_override = models.SmallIntegerField(
        verbose_name='ручной курс валют', null=True, blank=True)

    currency_multiplier_percent = models.FloatField(
        verbose_name='дополнительная наценка на курс', default=0, null=True, blank=True)

    currency_value_modified_at = models.DateField(null=True, blank=True)

    vendor_discount = models.FloatField(
        default=0.0, verbose_name='скидка поставщика, %')

    @property
    def discount(self):
        return 1 - self.vendor_discount / 100

    def save(self, *args, **kwargs):
        print(datetime.date.today())
        if self.currency_value_override != self.__original_currency_value_override:
            self.currency_value_modified_at = datetime.date.today()
        super().save(*args, **kwargs)

    class Meta:
        abstract = True


class AcrylicManufacturer(Manufacturer):
    material = models.ForeignKey(Material, default='Акриловый камень',
                                 on_delete=models.PROTECT, related_name='manufacturers')

    priority = models.PositiveSmallIntegerField(default=500)

    additional_info = models.TextField(null=True, blank=True)

    card_color = models.CharField(
        max_length=7, default="#ffffff", verbose_name='цвет карточки')

    @property
    def f_name(self):
        return self.name.lower().replace(' ', '-')

    class Meta:

        verbose_name = 'производитель акрила'
        verbose_name_plural = 'производители акрила'
        ordering = ['priority']

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.name


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

    @cached_property
    def schema(self):
        configurations = self.stones.prefetch_related('configurations').order_by(
            'configurations__surface__priority',
            'configurations__slab_size__priority',
            'configurations__thickness__priority').values_list(
            'configurations__surface__alias',
            'configurations__slab_size__alias',
            'configurations__thickness__value',).distinct()  # .values_list('thickness', 'surface', 'slab_size')

        combinations_dict = defaultdict(
            lambda: defaultdict(lambda: defaultdict(list)))
        # print(configurations)
        for combination in configurations:
            surface, slab, thickness = combination
            if type(combinations_dict[surface]['count']) == defaultdict:
                combinations_dict[surface]['count'] = 0
            if type(combinations_dict[surface][slab]['count']) == list:
                combinations_dict[surface][slab]['count'] = 0
            combinations_dict[surface]['count'] += 1
            combinations_dict[surface][slab]['count'] += 1
            combinations_dict[surface][slab]['thickness_list'].append(
                thickness)
        # print(json.dumps(combinations_dict, ensure_ascii=False))
        headers = [
        ]
        if self.stones.filter(code__isnull=False).exists():
            headers.append(
                {"prop": "code", "name": "арт."})
        headers.append(
            {"prop": "name", "name": "Название"})
        for surface in combinations_dict.keys():
            schema = {
                "name": surface,
                'colspan': combinations_dict[surface]['count'],
                "children": [{
                    "name": slab,
                    'colspan': combinations_dict[surface][slab]['count'],
                    "children": [
                        {
                            "prop": f'{surface} {slab} {thickness}',
                            "name": f'{thickness}мм',

                        } for thickness in combinations_dict[surface][slab]['thickness_list'] if thickness != 'count'
                    ]
                } for slab in combinations_dict[surface] if slab != 'count']
            }
            if schema:
                headers.append(schema)
        return headers


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

    @ property
    def price(self) -> int:
        currency_value = self.manufacturer.currency_value_override or self.manufacturer.currency.value
        return math.ceil(self.standart_raw_price * self.manufacturer.discount * currency_value * self.manufacturer.material.overprice)

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

    @ property
    def name(self) -> str:
        return f'{self.alias} {self.thickness}мм'

    @ property
    def meterPrice(self) -> int:
        return self.price

    @ property
    def price(self) -> int:
        manufacturer = self.collection.manufacturer
        return math.ceil(self.raw_price * manufacturer.discount * manufacturer.currency.value * manufacturer.material.overprice)

    def __repr__(self) -> str:
        return f'{self.collection.manufacturer.name}, {self.collection.name} {self.alias}, {self.thickness}'

    def __str__(self) -> str:
        return f'{self.collection.manufacturer.name}, {self.collection.name} {self.alias}, {self.thickness}'


class EquivalentGroup(models.Model):
    # group_id = models.PositiveBigIntegerField()
    class Meta:

        verbose_name = 'группа аналогов'
        verbose_name_plural = 'группы аналогов'


class AcrylicStone(Stone):

    manufacturer = models.ForeignKey(
        AcrylicManufacturer, on_delete=models.SET_NULL, null=True, blank=True, related_name="stones", verbose_name='производитель')
    collection = ChainedForeignKey(
        AcrylicCollection, chained_field="manufacturer", chained_model_field="manufacturer", related_name="stones", show_all=False, auto_choose=True, sort=True, verbose_name='коллекция')

    equivalents_group = models.ForeignKey(
        EquivalentGroup, on_delete=models.SET_NULL, null=True, related_name='stones')

    class Meta:

        unique_together = [['manufacturer', 'code']]
        verbose_name = 'акриловая текстура'
        verbose_name_plural = 'акриловые текстуры'

    def __repr__(self) -> str:
        if self.name:
            return self.name

        return super().__repr__()

    def __str__(self) -> str:
        try:
            manufacturer = self.manufacturer.name or ""
            code = self.code or ""
            name = self.name or ""
            return " ".join([manufacturer, code, name])
        except Exception:
            return super().__str__()

    def to_table(self) -> str:
        try:
            code = self.code or ""
            name = self.name or ""
            return " ".join([code, name])
        except Exception:
            return super().__str__()


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
            print('Err')
            super().__repr__()

    def __str__(self):
        try:
            return f'{self.manufacturer} {self.name}'
        except Exception:
            print('Err')
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
            print('Err')
            super().__repr__()

    def __str__(self):
        try:
            return f'{self.stone.name} {self.surface.alias} {self.thickness}'
        except Exception:
            print('Err')
            super(QuartzStoneConfiguration, self).__str__()

    @ property
    def rub_price(self) -> int:
        currency_value = self.stone.manufacturer.currency_value_override or self.stone.manufacturer.currency.value
        return math.ceil(self.price * self.stone.manufacturer.discount * currency_value * self.stone.manufacturer.material.overprice)


class additionalWorkAcryl(models.Model):
    name = models.CharField(max_length=150, null=True, blank=True)
    measurement = models.CharField(max_length=50, null=True, blank=True)
    cost = models.CharField(max_length=100, null=True, blank=True)
    spendings = models.CharField(max_length=100, null=True, blank=True)

    class Meta:

        verbose_name = 'дополнительная работа'
        verbose_name_plural = 'дополнительные работы'

    def __repr__(self) -> str:
        return self.name

    def __str__(self) -> str:
        if self.name:
            return self.name
        else:
            return 'Доп работа'
