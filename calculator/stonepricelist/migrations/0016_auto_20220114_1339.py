# Generated by Django 3.2.9 on 2022-01-14 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0015_auto_20220114_1339'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='acrylicstone',
            name='same_textures',
        ),
        migrations.AddField(
            model_name='acrylicstone',
            name='equivalents',
            field=models.ManyToManyField(blank=True, related_name='_stonepricelist_acrylicstone_equivalents_+', to='stonepricelist.AcrylicStone', verbose_name='аналогичные текстуры'),
        ),
    ]
