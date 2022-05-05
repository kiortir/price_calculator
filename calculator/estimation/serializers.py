from django.contrib.auth.models import User
from rest_framework import serializers

from .models import ServiceModule, ServicePricelist, DefaultPricelist, Estimation


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('first_name', 'last_name',  'id', 'username')


class EstimationSerializer(serializers.ModelSerializer):
    created_by = UserSerializer()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        state = representation.pop('state')
        new_representation = {
            "state": state,
            "globals": representation
        }
        return new_representation

    class Meta:
        model = Estimation
        fields = '__all__'
        # read_only_fields = ('status',)
        # exclude = ('pricelist',)


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


class ServiceModuleSerializer(serializers.ModelSerializer):

    class Meta:
        model = ServiceModule
        fields = '__all__'


class PriceListSerializer(serializers.ModelSerializer):
    created_by = UserSerializer()
    modules = ServiceModuleSerializer(many=True)
    # is_default = DefaultPricelistSerializer()

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        modules = representation['modules']
        modules_dict = {module['name']: module['options']
                        for module in modules}
        representation['modules'] = modules_dict
        return representation

    class Meta:
        model = ServicePricelist
        fields = ('created_at', 'created_by', 'id', 'variables', 'modules')
