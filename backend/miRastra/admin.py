from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin


class UserAdmin(UserAdmin):
    list_display = ['username', 'first_name', 'last_name', 'type', 'phone_number', 'city', 'amount_rastra',
                    'is_active']
    fieldsets = [
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'phone_number', 'city', 'type')}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    ]
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username', 'password1', 'password2', 'first_name', 'last_name', 'email', 'phone_number', 'city',
                'type'),
        }),
    )
    list_filter = ['type', 'city']


class RastraAdmin(admin.ModelAdmin):
    list_display = ['user', 'propietario', 'name', 'price', 'amount', 'stars', 'finish', 'is_active']
    list_filter = ['price', 'user']
    search_fields = ['name', 'propietario']


class RatingAdmin(admin.ModelAdmin):
    list_display = ['user', 'rastra', 'stars', 'comment']
    list_filter = ['rastra', 'stars']


class ReservationAdmin(admin.ModelAdmin):
    list_display = ['user', 'rastra', 'amount', 'total', 'finish', 'date', 'state', 'is_active']
    list_filter = ['is_active', 'rastra']


admin.site.register(Rastra, RastraAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Rating, RatingAdmin)
admin.site.register(Reservation, ReservationAdmin)
