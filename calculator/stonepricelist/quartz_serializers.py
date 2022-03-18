
from rest_framework import serializers

from .models import QuartzStoneConfiguration, QuartzStone, QuartzManufacturer, quartzManufacturerInfoPictures


class infoImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = quartzManufacturerInfoPictures
        fields = ('image', 'thumbnail', 'text')


class ManufacturerBasicSerializer(serializers.ModelSerializer):
    stones = serializers.SerializerMethodField('get_stones')
    info_images = infoImageSerializer(many=True)

    def get_stones(self, obj):
        return []

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        images = representation.pop('info_images')
        text = representation.pop('additional_info')

        representation['additional_info'] = {
            'images': images,
            'text': text
        }
        return representation

    class Meta:
        model = QuartzManufacturer
        fields = ('id', 'name',  'priority', 'stones',
                  'schema', 'applied_currency', 'multipliers', 'info_images', 'additional_info')


class QuartzStoneConfigurationSerializer(serializers.ModelSerializer):

    thickness = serializers.CharField(source="thickness.value", read_only=True)
    slab_size = serializers.CharField(source="slab_size.alias", read_only=True)
    surface = serializers.CharField(source="surface.alias", read_only=True)

    class Meta:
        model = QuartzStoneConfiguration
        fields = '__all__'


# class flatQuartzStoneConfigurationsSerializer(serializers.ModelSerializer):
#     def __init__(self, *args, **kwargs):
#         super(flatQuartzStoneConfigurationsSerializer,
#               self).__init__(*args, **kwargs)


# class flatQuartzStoneSerializer(flatQuartzStoneConfigurationsSerializer, serializers.HyperlinkedModelSerializer):

#     class Meta:
#         model = QuartzStone
#         fields = '__all__'


class reverseQuartzStoneSerializer(serializers.ModelSerializer):
    configurations = QuartzStoneConfigurationSerializer(many=True)
    # manufacturer = serializers.StringRelatedField()
    # collection = serializers.StringRelatedField()

    class Meta:
        model = QuartzStone
        fields = ('name', 'code', 'configurations')

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        configurations_representation = representation.pop('configurations')
        for configuration in configurations_representation:
            surface, slab, thickness = configuration["surface"], configuration[
                "slab_size"], configuration["thickness"]
            # configuration_price = QuartzStoneConfiguration.objects.get(
            #     id=configuration["id"]).rub_price
            # print(configuration)
            representation[f'{surface} {slab} {thickness}'] = configuration["price"]
        return representation


class reverseQuartzManufacturerSerializer(serializers.ModelSerializer):
    stones = reverseQuartzStoneSerializer(many=True)

    class Meta:
        model = QuartzManufacturer
        fields = ('id', 'name', 'card_color', 'priority', 'stones', 'modified')
