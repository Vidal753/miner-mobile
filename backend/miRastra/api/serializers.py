from rest_framework import serializers
from miRastra.models import Rastra


class RatraSerializers(serializers.ModelSerializer):
    class Meta:
        model = Rastra
        fields = ['id', 'user', 'name', 'price', 'is_active', 'state', 'stars', 'amount', 'description']