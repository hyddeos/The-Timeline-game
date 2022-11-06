from django.urls import path

from . import views


urlpatterns = [
    # API
    # Categorys
    path('api/categorys', views.ListCategory.as_view()),
    path('api/categorys/<int:pk>/', views.DetailCategory.as_view()),
    # Persons
    path('api/persons', views.ListPerson.as_view()),
    path('api/persons/<int:pk>/', views.DetailPerson.as_view()),
    # Random list, category.pk as varible
    path('api/random/', views.random_persons),
    path('api/random/<int:pk>', views.random_persons),
]
