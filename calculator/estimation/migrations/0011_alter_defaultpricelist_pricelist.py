# Generated by Django 4.0.4 on 2022-04-14 11:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('estimation', '0010_alter_servicepricelist_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='defaultpricelist',
            name='pricelist',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='default_status', to='estimation.servicepricelist'),
        ),
    ]
