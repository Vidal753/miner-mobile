# Generated by Django 4.0.5 on 2022-07-20 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miRastra', '0023_alter_reservation_state'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='state',
            field=models.CharField(choices=[('Pendiente...', 'Pendiente...'), ('Activo', 'Activo'), ('Finalizado', 'Finalizado'), ('Cancelado', 'Cancelado')], default='Pendiente...', max_length=20),
        ),
    ]