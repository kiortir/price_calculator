# Generated by Django 3.2.9 on 2022-02-04 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_mutation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mutation',
            name='submitted_at',
            field=models.DateTimeField(),
        ),
    ]