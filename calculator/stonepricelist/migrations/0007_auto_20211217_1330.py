# Generated by Django 3.2.9 on 2021-12-17 10:30

from django.db import migrations, models
from django.db import models


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0006_auto_20211216_1713'),
    ]

    operations = [
        migrations.AddField(
            model_name='acrylicstone',
            name='isWhite',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='acrylicstone',
            name='configurations',
            field=models.ManyToManyField(
                blank=True, null=True, to='stonepricelist.AcrylicConfiguration', verbose_name='конфигурации'),
        ),
    ]
