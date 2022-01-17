from dataclasses import field
from rest_framework import serializers

from .models import *


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


class additionalWorkAcrylSerializer(serializers.ModelSerializer):

    class Meta:
        model = additionalWorkAcryl
        exclude = ('id', )


class BaseStoneSerializer(serializers.ModelSerializer):

    manufacturer = serializers.StringRelatedField()
    collection = serializers.StringRelatedField()

    class Meta:
        model = AcrylicStone
        fields = ['id', 'name', 'code', 'manufacturer', 'collection']


# class SearchStoneSerializer(serializers.ModelSerializer):

#     manufacturer = serializers.StringRelatedField()
#     collection = serializers.StringRelatedField()
#     equivalents = BaseStoneSerializer(many=True)

#     class Meta:
#         model = AcrylicStone
#         fields = ['name', 'code', 'manufacturer', 'collection', "equivalents"]


# class AcrylicStoneSerializer(serializers.ModelSerializer):
#     equivalents = BaseStoneSerializer(many=True)

#     class Meta:
#         model = AcrylicStone
#         fields = ['name', 'code', "id", "equivalents"]


class ManufacturersToStoneSerializer(serializers.ModelSerializer):
    stones = BaseStoneSerializer(many=True)

    class Meta:
        model = AcrylicManufacturer
        fields = ('name', 'stones')
