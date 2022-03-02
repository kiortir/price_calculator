import math
import datetime
import requests
from stonepricelist.models import Currency as c
import xml.etree.ElementTree as ET
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'обновляет курс валют'

    def handle(self, *args, **options):
        currencies = c.objects.filter(auto_update=True)
        response = requests.get(
            'http://www.cbr.ru/scripts/XML_daily.asp', timeout=1).text
        tree = ET.fromstring(response)
        date = tree.get('Date')
        currency_date = datetime.datetime.strptime(
            date, '%d.%m.%Y').date()
        for currency in currencies:
            new_value: int = math.ceil(
                float(tree.find(f'Valute[CharCode="{currency.code}"]/Value').text.replace(',', '.')))
            currency.value = new_value
            currency.value_date = currency_date
            currency.save()


if __name__ == '__main__':
    Command().handle()
