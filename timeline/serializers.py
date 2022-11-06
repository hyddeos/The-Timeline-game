from urllib import request
from rest_framework import serializers
from .models import Category, Person


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'category',
        )
        model = Category

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'born',
            'quote',
            'category',
            'level',
        )
        model = Person