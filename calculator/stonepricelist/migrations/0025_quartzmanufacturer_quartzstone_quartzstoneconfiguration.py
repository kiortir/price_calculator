# Generated by Django 3.2.9 on 2022-03-02 13:10

from django.db import migrations, models
import django.db.models.deletion
import locale


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0024_currency_auto_update'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuartzManufacturer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True, unique=True, verbose_name='название')),
                ('code', models.CharField(blank=True, max_length=10, null=True, verbose_name='код поставщика')),
                ('currency_value_override', models.SmallIntegerField(blank=True, null=True, verbose_name='ручной курс валют')),
                ('vendor_discount', models.FloatField(default=0.0, verbose_name='скидка поставщика, %')),
                ('priority', models.PositiveSmallIntegerField(default=500)),
                ('additional_info', models.TextField(blank=True, null=True)),
                ('card_color', models.CharField(default='#ffffff', max_length=7, verbose_name='цвет карточки')),
                ('slab_cut_price', models.SmallIntegerField(verbose_name='цена распила')),
                ('currency', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='stonepricelist.currency', verbose_name='валюта распространения')),
                ('material', models.ForeignKey(default='Кварцевый агломерат', on_delete=django.db.models.deletion.PROTECT, related_name='qzmanufacturers', to='stonepricelist.material')),
                ('slab_cut_currency', models.ForeignKey(default=locale.currency, on_delete=django.db.models.deletion.PROTECT, related_name='slab_currency', to='stonepricelist.currency', verbose_name='валюта подсчета цены распила')),
            ],
            options={
                'verbose_name': 'производитель кварца',
                'verbose_name_plural': 'производители кварца',
                'ordering': ['priority', 'name'],
            },
        ),
        migrations.CreateModel(
            name='QuartzStone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True, verbose_name='название')),
                ('code', models.CharField(default=None, max_length=20, null=True, verbose_name='артикул')),
                ('collection', models.CharField(blank=True, max_length=150, null=True)),
                ('color', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='stonepricelist.colors', verbose_name='цвет')),
                ('manufacturer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='stones', to='stonepricelist.quartzmanufacturer', verbose_name='производитель')),
                ('similar_textures', models.ManyToManyField(blank=True, related_name='_stonepricelist_quartzstone_similar_textures_+', to='stonepricelist.QuartzStone', verbose_name='похожие текстуры')),
            ],
            options={
                'verbose_name': 'акриловая текстура',
                'verbose_name_plural': 'акриловые текстуры',
                'unique_together': {('manufacturer', 'name')},
            },
        ),
        migrations.CreateModel(
            name='QuartzStoneConfiguration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.IntegerField(verbose_name='стоимость конфигурации')),
                ('discount', models.SmallIntegerField(default=0, verbose_name='скидка на конфигурацию')),
                ('availabile_amount', models.FloatField(default=0, verbose_name='доступное количество')),
                ('slab_size', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='configurations', to='stonepricelist.slabsize', verbose_name='размер листа')),
                ('stone', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='configurations', to='stonepricelist.quartzstone')),
                ('surface', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='configurations', to='stonepricelist.surfacetype', verbose_name='полировка')),
                ('thickness', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='configurations', to='stonepricelist.thickness', verbose_name='толщина камня')),
            ],
        ),
    ]
