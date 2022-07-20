from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('rastra/', rastra_list),
    path('rastra/detail', rastra_detail),
    path('rastra/detail/supplier', get_supplier_rastras),
    path('user/', get_user),
    path('rating/', rating_list),
    path('rating/create', create_rating),
    path('reservation/', reservation_list),
    path('reservation/confirm', confirmReservation),
    path('register/', register),
    path('login/', login),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]