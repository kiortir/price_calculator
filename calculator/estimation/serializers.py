from django.contrib.auth.models import User
from rest_framework import serializers

from .models import ServiceModule, ServicePricelist, DefaultPricelist


class EstimationSerializer(serializers.ModelSerializer):
    pass


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('first_name', 'last_name',  'id', 'username')


class DefaultPricelistSerializer(serializers.ModelSerializer):

    class Meta:
        model = DefaultPricelist
        read_only_fields = ('status',)
        exclude = ('pricelist',)

    def to_representation(self, instance):
        try:
            instance = instance.first().status
        except AttributeError:
            instance = False
        return super().to_representation(instance)


class PriceListSerializer(serializers.ModelSerializer):
    created_by = UserSerializer()
    # is_default = DefaultPricelistSerializer()

    def to_representation(self, instance):
        # try:
        #     instance['is_default'] = instance['is_default'].status
        # except TypeError:
        #     pass
        return super().to_representation(instance)

    class Meta:
        model = ServicePricelist
        fields = ('created_at', 'created_by', 'id')


class ServiceModuleSerializer(serializers.ModelSerializer):
    created_by = UserSerializer()

    class Meta:
        model = ServiceModule
        fields = '__all__'
