# Generated by Django 4.0.5 on 2022-07-19 01:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miRastra', '0020_rename_time_reservation_finish'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='state',
            field=models.CharField(choices=[('Pendiente...', 'Pendiente...'), ('Ocupado', 'Ocupado'), ('Finalizado', 'Finalizado'), ('Cancelado', 'Cancelado')], default='Pendiente...', max_length=20),
        ),
    ]
