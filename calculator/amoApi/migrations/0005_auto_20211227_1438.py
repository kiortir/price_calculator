# Generated by Django 3.2.9 on 2021-12-27 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('amoApi', '0004_alter_lead_must_be_ready'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lead',
            name='must_be_ready',
        ),
        migrations.AddField(
            model_name='lead',
            name='lead_status',
            field=models.IntegerField(default=0, null=True, verbose_name='id воронки'),
        ),
    ]