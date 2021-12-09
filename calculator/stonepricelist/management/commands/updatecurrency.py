import math
import datetime
import urllib
import json
from stonepricelist.models import Currency as c

from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'обновляет курс валют'

    def handle(self, *args, **options):
        currencies = c.objects.all()
        response = json.loads(urllib.request.urlopen(
            'https://www.cbr-xml-daily.ru/daily_json.js').read())
        unparsed_currency_date: str = response.get('Date', '2000-10-08:30:00+03:00')[:-6]
        currency_date = datetime.datetime.strptime(unparsed_currency_date, '%Y-%m-%dT%X').date()
        currency_dict = response.get('Valute', {})
        for currency in currencies:
            new_value: int = math.ceil(currency_dict.get(currency.code, {}).get('Value', 0))
            currency.value = new_value
            currency.value_date = currency_date
            currency.save()


if __name__ == '__main__':
    Command().handle()
