# Generated by Django 4.0.5 on 2022-07-06 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miRastra', '0003_user'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Rastra',
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'User', 'verbose_name_plural': 'User'},
        ),
        migrations.AddField(
            model_name='user',
            name='type',
            field=models.IntegerField(default=1, verbose_name='Type'),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(blank=True, max_length=10, verbose_name='Phone Number'),
        ),
    ]
