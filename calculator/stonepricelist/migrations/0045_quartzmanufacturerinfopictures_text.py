# Generated by Django 3.2.9 on 2022-03-18 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0044_auto_20220318_1427'),
    ]

    operations = [
        migrations.AddField(
            model_name='quartzmanufacturerinfopictures',
            name='text',
            field=models.TextField(blank=True, null=True),
        ),
    ]
