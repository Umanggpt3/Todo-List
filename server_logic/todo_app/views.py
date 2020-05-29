#serializers and models
from .models import TodoItem
from .serializers import TodoItemSerializer,UserSerializer
#user model and functions for user functions
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
#django functions
import json
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
#Rest framework function and variables
from rest_framework.status import HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND,HTTP_200_OK
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.authtoken.models import Token
class TodoItemsView(viewsets.ModelViewSet): #performs automatic CRUD ops
    serializer_class=TodoItemSerializer
    queryset=TodoItem.objects.all()
    permission_classes=(IsAuthenticated,) #only allow CRUD if user has already logged in

#######################################################################
# User related operations
#######################################################################
@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny,))
def handle_user_login(request):
    uname=request.data.get('username')
    passw=request.data.get('password')
    if uname==None or passw==None: #wrong request format
        return Response({'error':'username or password not entered'},status=HTTP_400_BAD_REQUEST)
    u=authenticate(username=uname,password=passw)
    if not u: #wrong credentials
        return Response({'error':'wrong username or password'},status=HTTP_400_BAD_REQUEST)
    token,x=Token.objects.get_or_create(user=u)
    return Response({'auth_token':token.key},status=HTTP_200_OK) 

@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny,))
def handle_user_signup(request):
    uname=request.data['username']
    passw=request.data['password']
    email=request.data['email']
    u=User.objects.filter(username=uname)
    if len(u) != 0:
        return Response({'error':'username already taken'},status=HTTP_400_BAD_REQUEST)
    User.objects.create_user(username=uname,email=email,password=passw)
    return Response({'status':'user registration successful'},status=HTTP_200_OK)


@api_view(['POST'])
def get_user_info(request):
    dat=UserSerializer(request.user).data
    return Response(data=dat,content_type='application/json')

@api_view(['POST'])
def user_logout(request):
    request.user.auth_token.delete()
    logout(request)
    return Response()
