from django.db import models
from django.contrib.auth.models import AbstractUser


class Type(models.IntegerChoices):
    CUSTOMER = 1
    SUPPLIER = 2
    ADMIN = 3


class User(AbstractUser):
    type = models.IntegerField(choices=Type.choices, default=3, verbose_name='Type')
    phone_number = models.CharField(max_length=10, verbose_name='Phone Number')
    city = models.CharField(max_length=200, verbose_name="City")

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

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

    def propietario(self):
        return [self.user.first_name, self.user.last_name]

    def stars(self):
        ratings = self.rating_set.all()
        registers = ratings.count()
        if not registers == 0:
            stars = round(sum([rating.stars for rating in ratings])/registers)
        else:
            stars = 0
        return stars

    def is_active(self):
        status = self.reservation_set.all()
        is_active = True
        for state in status:
            if state.is_active:
                is_active = False
        return is_active

    def finish(self):
        status = self.reservation_set.all()
        finish = ''
        for state in status:
            if state.is_active:
                finish = state.finish
        return finish


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True )
    rastra = models.ForeignKey(Rastra, on_delete=models.CASCADE, null=True, blank=True, verbose_name='Rastra')
    stars = models.IntegerField(default=0, verbose_name='Stars')
    comment = models.CharField(max_length=500, verbose_name='Comment')

    class Meta:
        verbose_name = 'Rating'
        verbose_name_plural = 'Ratings'

    def __str__(self):
        return self.rastra.name

    def name(self):
        return self.rastra.name

    def user_name(self):
        return [self.user.first_name, self.user.last_name]


class Reservation(models.Model):
    PENDING = 'Pendiente...'
    ACTIVE = 'Activo'
    FINISH = 'Finalizado'
    CANCELLED = 'Cancelado'
    RESERVATION_STATES = [
        (PENDING, 'Pendiente...'),
        (ACTIVE, 'Activo'),
        (FINISH, 'Finalizado'),
        (CANCELLED, 'Cancelado'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='User')
    rastra = models.ForeignKey(Rastra, on_delete=models.CASCADE, verbose_name='Rastra')
    amount = models.FloatField(default=0, verbose_name='Amount')
    date = models.DateField(auto_now_add=True, verbose_name='Date')
    finish = models.DateField(blank=True, null=True)
    state = models.CharField(
        max_length=20,
        choices=RESERVATION_STATES,
        default=PENDING,
    )
    is_active = models.BooleanField(default=False, null=True, blank=True, verbose_name='Is_active')

    class Meta:
        verbose_name = 'Reservation'
        verbose_name_plural = 'Reservations'

    def __str__(self):
        return self.rastra.name

    def name(self):
        return self.rastra.name

    def user_name(self):
        return [self.user.first_name, self.user.last_name]

    def total(self):
        return self.rastra.price * self.amount

    def phone_number(self):
        return self.user.phone_number