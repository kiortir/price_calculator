# Generated by Django 3.2.9 on 2022-04-04 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0049_quartzschema_advanced_surface_display'),
    ]

    operations = [
        migrations.AddField(
            model_name='quartzstoneconfiguration',
            name='overprice',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name='наценка к стоимости'),
        ),
    ]
