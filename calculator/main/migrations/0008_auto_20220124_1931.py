# Generated by Django 3.2.9 on 2022-01-24 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_calculationtemplate'),
    ]

    operations = [
        migrations.RenameField(
            model_name='calculationtemplate',
            old_name='template_owner',
            new_name='owner',
        ),
        migrations.AddField(
            model_name='calculationtemplate',
            name='name',
            field=models.CharField(default='По умолчанию', max_length=60),
        ),
    ]
