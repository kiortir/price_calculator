# Generated by Django 3.2.9 on 2022-07-04 15:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stone_pricelist', '0005_auto_20220704_1800'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stone',
            name='preview',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='stone_pricelist.internetimage', verbose_name='фото камня'),
        ),
    ]
