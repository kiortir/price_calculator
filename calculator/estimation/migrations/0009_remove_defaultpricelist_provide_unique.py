# Generated by Django 4.0.4 on 2022-04-14 10:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('estimation', '0008_remove_defaultpricelist_status_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='defaultpricelist',
            name='provide_unique',
        ),
    ]
