# Generated by Django 3.2.9 on 2022-03-02 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0023_acrylicmanufacturer_currency_value_override'),
    ]

    operations = [
        migrations.AddField(
            model_name='currency',
            name='auto_update',
            field=models.BooleanField(default=True, verbose_name='обновлять автоматически'),
        ),
    ]