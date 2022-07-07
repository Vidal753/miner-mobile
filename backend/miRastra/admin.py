from django.contrib import admin
from .models import *


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name', 'last_name', 'email', 'phone_number', 'type']


class RastraAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'price', 'state', 'stars', 'amount', 'description', 'is_active']


admin.site.register(Rastra, RastraAdmin)
admin.site.register(User, UserAdmin)