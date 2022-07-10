from rest_framework import serializers
from miRastra.models import Rastra, Reservation, User, Rating


class RatraSerializers(serializers.ModelSerializer):
    class Meta:
        model = Rastra
        fields = ['id', 'user', 'name', 'price', 'amount', 'description', 'direction', 'stars', 'state', 'time']


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone_number', 'city', 'amount_rastra',
                  'type']


class RatingSerializers(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['user', 'rastra', 'stars', 'comment']


class ReservationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'user', 'rastra', 'amount', 'time', 'date', 'is_active']
