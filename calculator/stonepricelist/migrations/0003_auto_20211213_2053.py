# Generated by Django 3.2.9 on 2021-12-13 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0002_acryliccollection_additional_info'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='acryliccollection',
            name='additional_info',
        ),
        migrations.AddField(
            model_name='acrylicmanufacturer',
            name='additional_info',
            field=models.TextField(blank=True, null=True),
        ),
    ]
