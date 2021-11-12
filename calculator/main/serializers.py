from django.db.models import fields
from rest_framework import serializers
import json
from .models import Calculation, PriceList


class CalculationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calculation
        fields = '__all__'

    def to_representation(self, instance):
        ret = super(CalculationSerializer, self).to_representation(instance)
        ret['values'] = json.loads(ret['values'])
        return ret


class PriceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceList
        fields = '__all__'