from rest_framework import serializers
from miRastra.models import Rastra, Reservation, User


class RatraSerializers(serializers.ModelSerializer):
    class Meta:
        model = Rastra
        fields = ['id', 'user', 'name', 'price', 'amount', 'description', 'direction', 'stars', 'state', 'time']


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone_number', 'city']