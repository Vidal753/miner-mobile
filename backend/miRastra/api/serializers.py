from django.contrib.auth import authenticate
from rest_framework import serializers
from miRastra.models import Rastra, Reservation, User, Rating
from rest_framework_simplejwt.serializers import TokenObtainSerializer as BaseTokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import update_last_login
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


class TokenObtainSerializer(BaseTokenObtainSerializer):
    def validate(self, attrs):
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
            "password": attrs["password"],
        }

        try:
            authenticate_kwargs["request"] = self.context["request"]
        except KeyError:
            pass

        user_to_validate = User.objects.filter(
            email=authenticate_kwargs['email'])
        self.user = authenticate(**authenticate_kwargs)

        if not user_to_validate:
            raise ValidationError(
                {'email': 'El correo electrónico proporcionado no está en nuestra base de datos'})
        elif not user_to_validate[0].is_active:
            raise ValidationError(
                {'__all__': 'El usuario que ha ingresado ha sido deshabilitado'})
        elif not self.user:
            raise ValidationError({'password': 'Contraseña incorrecta'})
        return {}


class TokenObtainPairSerializer(TokenObtainSerializer):
    token_class = RefreshToken

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data['user'] = UserSerializer(self.user).data
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        update_last_login(None, self.user)

        return data


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=80)
    last_name = serializers.CharField(max_length=80)
    phone_number = serializers.CharField(max_length=8)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name', 'phone_number', 'city',
                  'type', 'password1', 'password2')

    def validate(self, attrs):
        password1 = attrs.pop('password1')
        password2 = attrs.pop('password2')
        # If you use the API to register, you'll automatically be asigned as a parent
        if password1 != password2:
            raise ValidationError(
                {'password2': 'Las contraseñas no coinciden'})

        attrs['password'] = password1
        user = User(**attrs)

        safe_params = ('email', 'username', 'first_name', 'last_name', 'phone_number', 'city', 'type', 'password')

        for attr in attrs.keys():
            if attr not in safe_params:
                raise ValidationError(
                    {'__all__': f'No puedes registrarte con el atributo "{attr}" en la API'})

        try:
            validate_password(password1, user)
        except ValidationError as e:
            raise ValidationError({'password1': e})

        return attrs

    def create(self, validated_data):
        validated_data['password'] = make_password(
            validated_data.get('password'))

        return super(UserSerializer, self).create(validated_data)


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
        extra_kwargs = {'city': {'required': False}, 'first_name': {'required': True}}

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



