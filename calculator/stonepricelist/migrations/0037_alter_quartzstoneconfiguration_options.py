# Generated by Django 3.2.9 on 2022-03-03 10:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0036_quartzstoneconfiguration_is_on_order'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='quartzstoneconfiguration',
            options={'verbose_name': 'конфигурация текстуры', 'verbose_name_plural': 'конфигурации текстур'},
        ),
    ]