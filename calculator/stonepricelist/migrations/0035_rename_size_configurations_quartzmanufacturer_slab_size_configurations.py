# Generated by Django 3.2.9 on 2022-03-03 09:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0034_alter_quartzstoneconfiguration_thickness'),
    ]

    operations = [
        migrations.RenameField(
            model_name='quartzmanufacturer',
            old_name='size_configurations',
            new_name='slab_size_configurations',
        ),
    ]
