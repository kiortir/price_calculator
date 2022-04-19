# Generated by Django 4.0.4 on 2022-04-13 10:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ServiceModule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('options', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='ServicePricelist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('variables', models.JSONField()),
                ('created_by', models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_pricelists', to=settings.AUTH_USER_MODEL, verbose_name='создатель')),
            ],
        ),
        migrations.CreateModel(
            name='ServiceModuleField',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('options', models.JSONField()),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fields', to='estimation.servicemodule')),
            ],
        ),
        migrations.AddField(
            model_name='servicemodule',
            name='pricelist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='modules', to='estimation.servicepricelist', verbose_name='модуль'),
        ),
        migrations.CreateModel(
            name='Estimation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('title', models.TextField(blank=True, null=True)),
                ('amo_lead_id', models.CharField(blank=True, max_length=10, null=True)),
                ('iteration_group', models.PositiveSmallIntegerField(default=0)),
                ('iteration_version', models.PositiveSmallIntegerField(default=1)),
                ('state', models.JSONField()),
                ('is_active', models.BooleanField(default=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='estimations', to=settings.AUTH_USER_MODEL, verbose_name='создатель')),
                ('pricelist', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='estimation.servicepricelist')),
            ],
            options={
                'unique_together': {('amo_lead_id', 'iteration_group', 'iteration_version')},
            },
        ),
    ]