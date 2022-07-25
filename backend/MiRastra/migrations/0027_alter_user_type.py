# Generated by Django 4.0.5 on 2022-07-25 00:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miRastra', '0026_reservation_finish_reservation_state_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='type',
            field=models.IntegerField(choices=[(1, 'Pregunta abierta'), (2, 'Supplier'), (3, 'Admin')], default=3, verbose_name='Type'),
        ),
    ]
