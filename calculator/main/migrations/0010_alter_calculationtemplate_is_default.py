# Generated by Django 3.2.9 on 2022-01-25 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_calculationtemplate_is_default'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calculationtemplate',
            name='is_default',
            field=models.BooleanField(default=False),
        ),
    ]