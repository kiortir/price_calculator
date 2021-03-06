# Generated by Django 4.0.4 on 2022-04-13 10:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_alter_mutation_submitted_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='calculation',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='calculation',
            name='updated_by',
        ),
        migrations.RemoveField(
            model_name='calculationtemplate',
            name='owner',
        ),
        migrations.RemoveField(
            model_name='mutation',
            name='estimation',
        ),
        migrations.RemoveField(
            model_name='mutation',
            name='submitted_by',
        ),
        migrations.DeleteModel(
            name='PriceList',
        ),
        migrations.DeleteModel(
            name='Calculation',
        ),
        migrations.DeleteModel(
            name='CalculationTemplate',
        ),
        migrations.DeleteModel(
            name='Mutation',
        ),
    ]
