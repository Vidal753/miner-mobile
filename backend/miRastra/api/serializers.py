from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from miRastra.models import Rastra, Reservation, User, Rating


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RatraSerializers(serializers.ModelSerializer):
    class Meta:
        model = Rastra
        fields = ['id', 'user', 'propietario', 'name', 'price', 'amount', 'description', 'direction', 'stars', 'finish',
                  'is_active']

    def validate(self, attrs):
        if attrs == '':
            raise serializers.ValidationError("Este campo no puede estar en blanco.")
        return attrs


class SupplierRatrasSerializers(serializers.ModelSerializer):
    class Meta:
        model = Rastra
        fields = ['id', 'name', 'active']

    def validate(self, attrs):
        if attrs == '':
            raise serializers.ValidationError("Este campo no puede estar en blanco.")
        return attrs


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'city', 'amount_rastra',
                  'type']

    def validate(self, attrs):
        if attrs == '':
            raise serializers.ValidationError("No se permite dejar el campo vacío")
        return attrs


class CreateUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'first_name', 'last_name', 'phone_number', 'city',
                  'type']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_first_name(self, value):
        if value == '':
            raise serializers.ValidationError("Este campo no puede estar en blanco.")
        return value

    def validate_last_name(self, value):
        if value == '':
            raise serializers.ValidationError("Este campo no puede estar en blanco.")
        return value

    def validate(self, attrs):
        if attrs == '':
            raise serializers.ValidationError("No se permite dejar el campo vacío")
        return attrs

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number'],
            city=validated_data['city'],
            type=validated_data['type'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class RatingSerializers(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['user', 'rastra', 'name', 'user_name', 'stars', 'comment']


class ReservationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'user', 'rastra', 'user_name', 'name', 'amount', 'finish', 'date', 'state', 'phone_number', 'total', 'is_active']
        extra_kwargs = {'user': {'write_only': True, 'required': False}, 'rastra': {'write_only': True, 'required': False}}
