# Generated by Django 3.2.9 on 2022-03-05 13:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0039_auto_20220305_1550'),
    ]

    operations = [
        migrations.RenameField(
            model_name='quartzstone',
            old_name='updated_at',
            new_name='modified',
        ),
    ]
