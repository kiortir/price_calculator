# Generated by Django 3.2.9 on 2021-12-09 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='currency',
            name='value_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]