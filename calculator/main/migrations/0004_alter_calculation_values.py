# Generated by Django 3.2.9 on 2022-01-24 11:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20220124_1401'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calculation',
            name='values',
            field=models.JSONField(default='{"material_cards": [{"materialName": null, "materialPrice": null, "materialCount": null}], "product_cards": [{"option_card": [], "chosenType": null}], "logistics": {"zamerCount": null, "montazhCount": null, "dostavkaCount": null}}'),
        ),
    ]
