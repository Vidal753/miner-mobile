# Generated by Django 4.0.5 on 2022-07-20 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miRastra', '0025_remove_reservation_finish_remove_reservation_state_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='finish',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='reservation',
            name='state',
            field=models.CharField(choices=[('Pendiente...', 'Pendiente...'), ('Activo', 'Activo'), ('Finalizado', 'Finalizado'), ('Cancelado', 'Cancelado')], default='Pendiente...', max_length=20),
        ),
        migrations.DeleteModel(
            name='Notifications',
        ),
    ]
