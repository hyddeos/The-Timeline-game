from django.db import models

# Create your models here.

class Category(models.Model):
    category = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.category}, {self.pk}'


class Person(models.Model):

    name = models.CharField(max_length=50)
    born = models.IntegerField()
    quote = models.CharField(max_length=240, blank=True)
    category = models.ManyToManyField(Category,blank=True, related_name="theme")
    level = models.IntegerField(default=5)

    def __str__(self):
        return f'{self.name}, {self.born}'

