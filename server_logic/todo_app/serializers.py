from rest_framework import serializers
from django.contrib.auth.models import User
from .models import TodoItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('username','first_name','last_name','email')

class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=TodoItem
        fields='__all__'

