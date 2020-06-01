from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from django.contrib.auth.models import User
from .models import TodoItem
import datetime

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('username','first_name','last_name','email')

class TodoItemSerializer(serializers.ModelSerializer):
    user=UserSerializer()   
    label=serializers.CharField(source='item_label')
    status=serializers.CharField(source='item_status')
    description=serializers.CharField(source="item_description")    
    class Meta:
        model=TodoItem
        #fields='__all__'
        fields=('id','label','description','status','due_date_time','date_time_set','date_time_modified','user')

