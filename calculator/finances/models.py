import math
from decimal import *

from statistics import mode
from django.db import models
from django.contrib.auth.models import User

from stonepricelist.models import Currency


class Counterparty(models.Model):

    class Meta:
        abstract = True


class TransactionType(models.Model):
    name = models.TextField()
    _is_negative = models.BooleanField(default=False)

    def convert(self, value: int | float):
        return Decimal(value).round(2) * -1 if self._is_negative else 1


class Transaction(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    created_by = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name='transactions')

    value = models.BigIntegerField()
    currency = models.ForeignKey(
        Currency, on_delete=models.PROTECT, related_name='transactions')

    def from_decimal(self, value: Decimal):
        value = round(value, 2)*100
        self.value = value
        self.save()
        return value

    def to_decimal(self):
        str_value = str(self.value)
        roubles, kopeks = str_value[:-2], str_value[-2:]
        return Decimal('.'.join(roubles, kopeks))
