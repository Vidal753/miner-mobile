# Generated by Django 4.0.5 on 2022-07-09 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miRastra', '0016_remove_rastra_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='time',
            field=models.DateField(blank=True, null=True),
        ),
    ]
