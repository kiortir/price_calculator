
from rest_framework import serializers

from .quartz_models import QuartzStoneConfiguration, QuartzStone, QuartzManufacturer, quartzManufacturerInfoPictures
from .models import SlabSize


class infoImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = quartzManufacturerInfoPictures
        fields = ('image', 'thumbnail', 'text')


class ManufacturerBasicSerializer(serializers.ModelSerializer):
    stones = serializers.SerializerMethodField('get_stones')
    thickness_configurations = serializers.StringRelatedField(many=True)
    surface_configurations = serializers.StringRelatedField(many=True)

    def get_stones(self, obj):
        return []

    class Meta:
        model = QuartzManufacturer
        fields = ('id', 'name',  'priority', 'stones', 'thickness_configurations', 'applied_currency',
                  'surface_configurations')


class SlabSizeSerializer(serializers.ModelSerializer):

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        w = representation.pop('width')
        h = representation.pop('height')
        representation = f"{w}x{h}"
        return representation

    class Meta:
        model = SlabSize
        fields = ('width', 'height')


class QuartzStoneConfigurationSerializer(serializers.ModelSerializer):

    thickness = serializers.CharField(source="thickness.value", read_only=True)
    slab_size = SlabSizeSerializer()
    surface = serializers.CharField(source="surface.alias", read_only=True)

    class Meta:
        model = QuartzStoneConfiguration
        fields = ('thickness', 'slab_size', 'surface',
                  'rub_price', 'is_on_order', 'code')


class reverseQuartzStoneSerializer(serializers.ModelSerializer):
    configurations = QuartzStoneConfigurationSerializer(many=True)

    class Meta:
        model = QuartzStone
        fields = ('name', 'code', 'configurations', 'info')

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        configurations_representation = representation.pop('configurations')
        representation['_code'] = representation.pop('code')
        representation['_name'] = representation.pop('name')
        representation['_info'] = representation.pop('info')
        for configuration in configurations_representation:
            surface, slab, thickness = configuration["surface"], configuration[
                "slab_size"], configuration["thickness"]
            representation["_slab_size"] = configuration[
                "slab_size"]
            try:
                representation[surface]
            except KeyError:
                representation[surface] = {}
            try:
                representation[surface][thickness]
            except KeyError:
                representation[surface][thickness] = {}

            representation[surface][thickness][slab] = {
                "price": configuration["rub_price"],
                "is_on_order": configuration["is_on_order"],
                "code": configuration["code"]}

        return representation


class reverseQuartzManufacturerSerializer(serializers.ModelSerializer):
    stones = reverseQuartzStoneSerializer(many=True)
    info_images = infoImageSerializer(many=True)

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        images = representation.pop('info_images')
        text = representation.pop('additional_info')
        cut_price = representation.pop('cut_price')
        representation['additional_info'] = {
            'images': images,
            'text': text,
            'cut_price': cut_price,
        }
        return representation

    class Meta:
        model = QuartzManufacturer
        fields = ('name', 'stones',
                  'schema', 'info_images', 'additional_info', 'cut_price')
