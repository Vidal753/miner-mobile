from django.contrib.auth.models import AnonymousUser
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import PermissionDenied
from miRastra.models import Rastra
from .serializers import *
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView as BaseTokenObtainPairView


class TokenObtainPairView(BaseTokenObtainPairView):
    def post(self, request, *args, **kwargs):
        data = request.data
        token_serializer = TokenObtainPairSerializer(data=data)
        token_serializer.is_valid(raise_exception=True)

        token_data = token_serializer.validated_data
        return Response(token_data)


@api_view(['POST'])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response({'success': 'Su cuenta ha sido creada exitosamente'})


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['last_name'] = user.last_name

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/token/refresh',
    ]

    return Response(routes)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rastra_list(request):
    user = request.user
    data = request.data
    if data == {}:
        rastras = Rastra.objects.all()
        serializer = RatraSerializers(rastras, many=True)
        return Response(serializer.data)
    data["user"] = user.id
    serializer = RatraSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'__all__': 'Successful save'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def rastra_detail(request):
    rastra_id = request.data["id"]
    try:
        rastra = Rastra.objects.get(pk=rastra_id)
    except Rastra.DoesNotExist:
        return Response({'__all__': 'The id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        serializer = RatraSerializers(rastra, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'__all__': 'Successful update'})
    elif request.method == 'DELETE':
        rastra.delete()
        return Response({'__all__': 'Successful delete'})
    elif request.method == 'POST':
        serializer = RatraSerializers(rastra)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_supplier_rastras(request):
    user = request.user
    rastras = user.rastra_set.all()
    serializer = SupplierRatrasSerializers(rastras, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_user(request):
    user_id = request.user.id
    user = User.objects.get(pk=user_id)
    serializer = UserSerializers(user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rating_list(request):
    user = request.user
    data = request.data
    if user.type == 1:
        ratings = user.rating_set.all()
        serializer = RatingSerializers(ratings, many=True)
        return Response(serializer.data)
    try:
        rastra = Rastra.objects.get(pk=data["id"])
    except Rastra.DoesNotExist:
        return Response({"__all__": "El id no existe"}, status=status.HTTP_400_BAD_REQUEST)
    ratings = rastra.rating_set.all()
    serializer = RatingSerializers(ratings, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_rating(request):
    data = request.data
    data["user"] = request.user.id
    if request.method == 'POST':
        serializer = RatingSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'__all__': 'Successful save'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reservation_list(request):
    user = request.user
    data = request.data
    if data == {}:
        reservation = user.reservation_set.all()
        serializer = ReservationSerializers(reservation, many=True)
        return Response(serializer.data)
    data["user"] = user.id
    if request.method == 'POST':
        serializer = ReservationSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'__all__': 'Successful save'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def confirmReservation(request):
    data = request.data
    try:
        reservation = Reservation.objects.get(pk=data["id"])
    except Reservation.DoesNotExist:
        return Response({'__all__': 'The id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        serializer = ReservationSerializers(reservation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'__all__': 'Successful update'})

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
