from tkinter import Variable
from unicodedata import category
from urllib import response
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics

from rest_framework.response import Response
from . models import Person, Category
from . serializers import PersonSerializer, CategorySerializer

from rest_framework.decorators import api_view

# Basic Api-request for verifing data
class ListCategory(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class DetailCategory(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ListPerson(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class DetailPerson(generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


# Get 10 random Persons for that requested category
@api_view(['GET'])
def random_persons(request, pk):
    if request.method == 'GET':
        persons = Person.objects.all().filter(category=pk).order_by('?')[:10]
        serializer = PersonSerializer(persons, many=True)
        return Response(serializer.data)






