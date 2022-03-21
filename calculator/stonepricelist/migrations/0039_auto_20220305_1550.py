# Generated by Django 3.2.9 on 2022-03-05 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0038_auto_20220303_1308'),
    ]

    operations = [
        migrations.AddField(
            model_name='quartzstone',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterUniqueTogether(
            name='slabsize',
            unique_together={('width', 'height')},
        ),
    ]