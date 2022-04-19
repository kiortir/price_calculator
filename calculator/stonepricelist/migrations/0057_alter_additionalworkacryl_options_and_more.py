# Generated by Django 4.0.4 on 2022-04-12 09:01

import django.contrib.postgres.search
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0056_create_trigger'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='additionalworkacryl',
            options={'ordering': ['name'], 'verbose_name': 'дополнительная работа', 'verbose_name_plural': 'дополнительные работы'},
        ),
        migrations.AlterField(
            model_name='quartzstone',
            name='vector_column',
            field=django.contrib.postgres.search.SearchVectorField(blank=True, null=True),
        ),
    ]