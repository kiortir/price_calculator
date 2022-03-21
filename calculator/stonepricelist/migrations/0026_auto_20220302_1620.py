# Generated by Django 3.2.9 on 2022-03-02 13:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0025_quartzmanufacturer_quartzstone_quartzstoneconfiguration'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='quartzstone',
            options={'verbose_name': 'кварцевая текстура', 'verbose_name_plural': 'кварцевые текстуры'},
        ),
        migrations.AlterField(
            model_name='acrylicstone',
            name='code',
            field=models.CharField(blank=True, default=None, max_length=20, null=True, verbose_name='артикул'),
        ),
        migrations.AlterField(
            model_name='quartzmanufacturer',
            name='slab_cut_currency',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='slab_currency', to='stonepricelist.currency', verbose_name='валюта подсчета цены распила'),
        ),
        migrations.AlterField(
            model_name='quartzstone',
            name='code',
            field=models.CharField(blank=True, default=None, max_length=20, null=True, verbose_name='артикул'),
        ),
        migrations.AlterField(
            model_name='quartzstone',
            name='collection',
            field=models.CharField(blank=True, max_length=150, null=True, verbose_name='коллекция'),
        ),
    ]