from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    type = models.IntegerField(default=1, verbose_name='Type')
    phone_number = models.CharField(max_length=10, blank=True, verbose_name='Phone Number')

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'User'

    def __str__(self):
        return self.username


class Rastra(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, verbose_name='User')
    name = models.CharField(max_length=100, verbose_name='Name')
    price = models.FloatField(verbose_name='Price')
    is_active = models.BooleanField(default=False, null=True, blank=False, verbose_name='Is_active')
    state = models.CharField(max_length=100, verbose_name='State')
    stars = models.FloatField(default='Stars')
    amount = models.FloatField(default=0, verbose_name='Amount')
    description = models.CharField(max_length=300, null=True, verbose_name='Description')

    class Meta:
        verbose_name = 'Rastra'
        verbose_name_plural = 'Rastras'

    def __str__(self):
        return self.name

