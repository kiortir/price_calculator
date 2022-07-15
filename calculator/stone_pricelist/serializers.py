from attr import field
from . import models
from rest_framework import serializers


class MaterialAddonsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MaterialAddon
        fields = ('name',)


class BasicMaterialSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Material
        fields = ('id', 'name', 'alias')


class MaterialSerializer(serializers.ModelSerializer):
    addons = MaterialAddonsSerializer(many=True)

    class Meta:
        model = models.Material
        fields = ('id', 'name', 'addons')


class BasicManufacturerSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Manufacturer
        fields = ('name', 'id')


class DetailedManufacturerSerializer(serializers.ModelSerializer):
    material = MaterialSerializer()

    class Meta:
        model = models.Manufacturer
        fields = ('name', 'id', 'collections', 'material',)


class StoneConfigurationSerializer(serializers.ModelSerializer):
    stone = serializers.SlugRelatedField('name', read_only=True)

    class Meta:
        model = models.StoneConfiguration
        fields = ('code', 'stone', 'rub_price')


class PricelistSerializer(serializers.ModelSerializer):
    entries = StoneConfigurationSerializer(many=True)

    class Meta:
        model = models.PriceList
        fields = ('active_from', 'entries')
