# Generated by Django 3.2.9 on 2021-12-17 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0008_remove_acrylicstone_configurations'),
    ]

    operations = [
        migrations.AddField(
            model_name='acrylicstone',
            name='configuratons',
            field=models.IntegerField(default=None, null=True),
        ),
    ]
