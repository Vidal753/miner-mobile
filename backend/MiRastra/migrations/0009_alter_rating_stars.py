# Generated by Django 4.0.5 on 2022-07-09 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miRastra', '0008_alter_user_city_alter_user_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='stars',
            field=models.IntegerField(default=0, max_length=5, verbose_name='Stars'),
        ),
    ]
