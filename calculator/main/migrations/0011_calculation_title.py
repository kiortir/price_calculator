# Generated by Django 3.2.9 on 2022-01-26 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_alter_calculationtemplate_is_default'),
    ]

    operations = [
        migrations.AddField(
            model_name='calculation',
            name='title',
            field=models.CharField(blank=True, default=None, max_length=40, null=True),
        ),
    ]