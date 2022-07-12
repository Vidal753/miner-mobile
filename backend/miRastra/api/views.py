from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated

from miRastra.models import Rastra
from .serializers import *
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/token/refresh',
    ]

    return Response(routes)


@api_view(['POST'])
def rastra_list(request):
    data = request.data
    if request.method == 'POST':
        serializer = RatraSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'__all__': 'Successful save'}, status=status.HTTP_201_CREATED)

        elif data == {}:
            rastras = Rastra.objects.all()
            serializer = RatraSerializers(rastras, many=True)
            return Response(serializer.data)

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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_user(request):
    user_id = request.user.id
    try:
        user = User.objects.get(pk=user_id)
        serializer = UserSerializers(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'__all__': 'The id does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rating_list(request):
    user = request.user.id
    data = request.data
    if data == {}:
        ratings = Rating.objects.all()
        serializer = RatingSerializers(ratings, many=True)
        return Response(serializer.data)
    data["user"] = user
    if request.method == 'POST':
        serializer = RatingSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'__all__': 'Successful save'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reservation_list(request):
    user = request.user.id
    data = request.data
    if data == {}:
        reservation = Reservation.objects.all()
        serializer = ReservationSerializers(reservation, many=True)
        return Response(serializer.data)
    data["user"] = user
    if request.method == 'POST':
        serializer = ReservationSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'__all__': 'Successful save'}, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
def confirmReservation(request):
    try:
        reservation = Reservation.objects.get(pk=2)
    except Reservation.DoesNotExist:
        return Response({'__all__': 'The id does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        serializer = ReservationSerializers(reservation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'__all__': 'Successful update'})

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)