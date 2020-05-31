from rest_framework import serializers
from django.contrib.auth.models import User
from .models import TodoItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('username','first_name','last_name','email')

class TodoItemSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    class Meta:
        model=TodoItem
        #fields='__all__'
        fields=('id','item_title','item_description','completed','due_date_time','date_time_set','date_time_modified','user')

