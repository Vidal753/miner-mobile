from django.contrib import admin
from .models import *


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name', 'last_name', 'email', 'city', 'phone_number', 'amount_rastra', 'type']


class RastraAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'price', 'amount', 'stars', 'time', 'state']
    list_filter = ['price']
    search_fields = ['name']


class RatingAdmin(admin.ModelAdmin):
    list_display = ['rastra', 'stars', 'comment']
    list_filter = ['rastra', 'stars']


class ReservationAdmin(admin.ModelAdmin):
    list_display = ['user', 'rastra', 'amount', 'time', 'date','is_active']


admin.site.register(Rastra, RastraAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Rating, RatingAdmin)
admin.site.register(Reservation, ReservationAdmin)
