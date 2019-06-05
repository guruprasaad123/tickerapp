
from django.urls import path ,include
from . import app
urlpatterns = [
    path('',app.post)
]