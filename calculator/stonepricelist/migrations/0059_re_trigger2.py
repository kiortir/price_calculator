# Generated by Django 4.0.4 on 2022-04-29 17:18

from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0058_re_trigger'),
    ]

    operations = [
        migrations.AddField(
            model_name='quartzstone',
            name='manufacturer_name',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.RunSQL(
            sql='''
              CREATE TRIGGER vector_column_trigger
              BEFORE INSERT OR UPDATE OF name, code, vector_column, manufacturer_name
              ON stonepricelist_quartzstone
              FOR EACH ROW EXECUTE PROCEDURE
              tsvector_update_trigger(
                vector_column, 'pg_catalog.english', code, name, manufacturer_name
              );

              UPDATE stonepricelist_quartzstone SET vector_column = NULL;
            ''',

            reverse_sql='''
              DROP TRIGGER IF EXISTS vector_column_trigger
              ON stonepricelist_quartzstone;
            ''',
        ),
    ]
