from django.urls import path

from . import views

urlpatterns = [
    path('getEventFactors', views.getEventFactors, name='getEventFactors'),
    path('getTimecodes', views.getTimecodes, name='getTimecodes'),
    path('events', views.getEvents, name='events'),
    path('getEventPage', views.getEventPage, name='getEventPage'),
    path('getEvent', views.getEvent, name='getEvent')
]