# Generated by Django 4.0.5 on 2022-07-20 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miRastra', '0021_reservation_state'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'User', 'verbose_name_plural': 'Users'},
        ),
        migrations.AlterField(
            model_name='reservation',
            name='state',
            field=models.CharField(choices=[('Pendiente...', 'Pendiente...'), ('Activo', 'Activo'), ('Finalizado', 'Finalizado'), ('Cancelado', 'Cancelado')], default='Pendiente...', max_length=20),
        ),
    ]