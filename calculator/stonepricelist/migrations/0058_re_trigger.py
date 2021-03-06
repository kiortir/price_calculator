# Generated by Django 4.0.4 on 2022-04-29 17:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stonepricelist', '0057_alter_additionalworkacryl_options_and_more'),
    ]

    operations = [
        migrations.RunSQL(
            sql='''
              DROP TRIGGER IF EXISTS vector_column_trigger
              ON stonepricelist_quartzstone;
            ''',

            reverse_sql='''
              CREATE TRIGGER vector_column_trigger
              BEFORE INSERT OR UPDATE OF name, code, vector_column
              ON stonepricelist_quartzstone
              FOR EACH ROW EXECUTE PROCEDURE
              tsvector_update_trigger(
                vector_column, 'pg_catalog.english', code, name
              );

              UPDATE stonepricelist_quartzstone SET vector_column = NULL;
            '''
        ),
    ]
