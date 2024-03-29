# Generated by Django 4.0.5 on 2022-07-28 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miRastra', '0027_alter_user_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='state',
            field=models.CharField(choices=[('Pendiente...', 'Pendiente...'), ('Activa', 'Activa'), ('Finalizado', 'Finalizado'), ('Cancelado', 'Cancelado')], default='Pendiente...', max_length=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='type',
            field=models.IntegerField(choices=[(1, 'Customer'), (2, 'Supplier'), (3, 'Admin')], default=3, verbose_name='Type'),
        ),
    ]
