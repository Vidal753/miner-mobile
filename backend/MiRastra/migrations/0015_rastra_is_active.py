# Generated by Django 4.0.5 on 2022-07-09 22:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miRastra', '0014_remove_rastra_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='rastra',
            name='is_active',
            field=models.BooleanField(blank=True, default=False, null=True, verbose_name='Is_active'),
        ),
    ]