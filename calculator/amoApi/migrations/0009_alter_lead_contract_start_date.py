# Generated by Django 3.2.9 on 2021-12-27 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('amoApi', '0008_auto_20211227_2010'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='contract_start_date',
            field=models.IntegerField(default=0, null=True, verbose_name='дата начала'),
        ),
    ]
