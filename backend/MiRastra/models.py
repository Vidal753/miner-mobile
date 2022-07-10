from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime


class User(AbstractUser):
    class Type(models.IntegerChoices):
        CUSTOMER = 1
        SUPPLIER = 2
        ADMIN = 3
    type = models.IntegerField(choices=Type.choices, default=3, verbose_name='Type')
    phone_number = models.CharField(max_length=10, verbose_name='Phone Number')
    city = models.CharField(max_length=200, verbose_name="City")

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'User'

    def __str__(self):
        return self.username

    def amount_rastra(self):
        rastras = self.rastra_set.all()
        return rastras.count()


class Rastra(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, verbose_name='User')
    name = models.CharField(max_length=100, verbose_name='Name')
    price = models.FloatField(verbose_name='Price')
    amount = models.FloatField(default=0, verbose_name='Amount')
    direction = models.CharField(max_length=500, null=True, verbose_name='Direction')
    description = models.CharField(max_length=500, null=True, verbose_name='Description')

    class Meta:
        verbose_name = 'Rastra'
        verbose_name_plural = 'Rastras'

    def __str__(self):
        return self.name

    def stars(self):
        ratings = self.rating_set.all()
        registers = ratings.count()
        if not registers == 0:
            stars = sum([rating.stars for rating in ratings])/registers
        else:
            stars = 0
        return stars

    def state(self):
        status = self.reservation_set.all()
        is_active = True
        for state in status:
            if state.is_active:
                is_active = False
        return is_active

    def time(self):
        status = self.reservation_set.all()
        time = ''
        for state in status:
            if state.is_active:
                time = state.time
        return time


class Rating(models.Model):
    rastra = models.ForeignKey(Rastra, on_delete=models.CASCADE, null=True, blank=True, verbose_name='Rastra')
    stars = models.IntegerField(default=0, verbose_name='Stars')
    comment = models.CharField(max_length=500, verbose_name='Comment')

    class Meta:
        verbose_name = 'Rating'
        verbose_name_plural = 'Ratings'

    def __str__(self):
        return self.comment


class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='User')
    rastra = models.ForeignKey(Rastra, on_delete=models.CASCADE, verbose_name='Rastra')
    amount = models.FloatField(default=0, verbose_name='Amount')
    time = models.DateField(null=True, blank=True)
    date = models.DateField(auto_now_add=True, verbose_name='Date')
    is_active = models.BooleanField(default=False, null=True, blank=True, verbose_name='Is_active')

    class Meta:
        verbose_name = 'Reservation'
        verbose_name_plural = 'Reservations'

