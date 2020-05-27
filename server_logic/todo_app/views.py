from django.shortcuts import render
from rest_framework import viewsets
from .models import TodoItem
from .serializers import TodoItemSerializer,UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

class TodoItemsView(viewsets.ModelViewSet): #performs automatic CRUD ops
    serializer_class=TodoItemSerializer
    queryset=TodoItem.objects.all()

@csrf_exempt
@api_view(['POST'])
def handle_user_login(request):
    uname=request.data['username']
    passw=request.data['password']
    u=authenticate(username=uname,password=passw)
    d={'message':'Incorrect credentials!'}
    if u != None:
        d['message']='Login successful!'
        login(request,u)
    return Response(data=json.dumps(d),content_type='application/json') 

@csrf_exempt
@api_view(['POST'])
def handle_user_signup(request):
    uname=request.data['username']
    passw=request.data['password']
    email=request.data['email']
    u=User.objects.filter(username=uname)
    d={'message':'successful'}
    if len(u) != 0:
        print("Already exists")
        d['message']='username already exists!'
        return Response(data=json.dumps(d),content_type='application/json')
    User.objects.create_user(uname,email,passw)
    return Response(data=json.dumps(d),content_type='application/json')

@csrf_exempt
@api_view(['POST'])
@login_required(login_url="user_login")
def get_user_info(request):
    dat=UserSerializer(request.user).data
    return Response(data=json.dumps(dat),content_type='application/json')

@csrf_exempt
@api_view(['GET','POST'])
@login_required(login_url="user_login")
def user_logout(request):
    logout(request)
    return Response()
