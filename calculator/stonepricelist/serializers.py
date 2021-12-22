import collections
from django.db.models import fields
from rest_framework.relations import SlugRelatedField
from .models import *
from rest_framework import serializers


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = '__all__'


class ConfigurationDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfigurationDiscount
        fields = '__all__'


class AcrylicManufacturerSerializer(serializers.ModelSerializer):
    currency = CurrencySerializer()

    class Meta:
        model = AcrylicManufacturer
        fields = '__all__'


class TextureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Texture
        exclude = ('id',)


class AcrylicCollectionSerializer(serializers.ModelSerializer):
    texture = TextureSerializer()
    manufacturer = AcrylicManufacturerSerializer()

    class Meta:
        model = AcrylicCollection
        fields = '__all__'


class AcrylicConfigurationSerializer(serializers.ModelSerializer):

    thickness = serializers.StringRelatedField()
    material_discount = ConfigurationDiscountSerializer(
        many=True, read_only=True)
    collection = AcrylicCollectionSerializer()

    class Meta:
        model = AcrylicConfiguration
        fields = ['price', 'thickness',
                  'material_discount', 'collection']


class ReverseAcrylicConfigurationSerializer(serializers.ModelSerializer):
    thickness = serializers.StringRelatedField()
    material_discount = ConfigurationDiscountSerializer(
        many=True, read_only=True)

    class Meta:
        model = AcrylicConfiguration
        fields = ['price', 'thickness',
                  'material_discount', 'alias']


class ReverseAcrylicCollectionSerializer(serializers.ModelSerializer):
    configurations = ReverseAcrylicConfigurationSerializer(many=True)
    texture = serializers.StringRelatedField()

    class Meta:
        model = AcrylicCollection
        fields = ('name', 'texture', 'configurations',
                  'price', 'isWhite')


class ReverseAcrylicManufactureSerializer(serializers.ModelSerializer):
    collections = ReverseAcrylicCollectionSerializer(many=True)

    class Meta:
        model = AcrylicManufacturer
        fields = ('name', 'collections', 'discount', 'additional_info')


class AcrylicStoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = AcrylicStone
        fields = ['name', 'code']


class additionalWorkAcrylSerializer(serializers.ModelSerializer):

    class Meta:
        model = additionalWorkAcryl
        exclude = ('id', )


class SearchStoneSerializer(serializers.ModelSerializer):

    manufacturer = serializers.StringRelatedField()
    collection = serializers.StringRelatedField()

    class Meta:
        model = AcrylicStone
        fields = ['name', 'code', 'manufacturer', 'collection']


class ManufacturersToStoneSerializer(serializers.ModelSerializer):
    stones = AcrylicStoneSerializer(many=True)

    class Meta:
        model = AcrylicManufacturer
        fields = ('name', 'stones')
