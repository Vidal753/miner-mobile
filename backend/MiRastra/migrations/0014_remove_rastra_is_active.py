# Generated by Django 4.0.5 on 2022-07-09 19:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('miRastra', '0013_alter_reservation_is_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rastra',
            name='is_active',
        ),
    ]
