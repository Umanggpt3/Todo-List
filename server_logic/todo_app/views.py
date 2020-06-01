import datetime
import time
from django.utils import timezone
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
# class TodoItemsView(viewsets.ModelViewSet): #performs automatic CRUD ops
#     serializer_class=TodoItemSerializer
#     queryset=TodoItem.objects.all()
#     permission_classes=(IsAuthenticated,) #only allow CRUD if user has already logged in

#     def perform_create(self, serializer):
#         item_user=UserSerializer(self.request.user).data
#         y,m,d,h,mi,s=request.get("due_date_time").split(" ")
#         date_time_obj=datetime.datetime(year=y,month=m,day=d,hour=h,minute=m,second=s)

#######################################################################
# User related operations
#######################################################################

# User Login
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

# User Signup
@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny,))
def handle_user_signup(request):
    uname=request.data['username']
    passw=request.data['password']
    email=request.data['email']
    f_name=request.data['first_name']
    l_name=request.data['last_name']
    u=User.objects.filter(username=uname)
    if len(u) != 0:
        return Response({'error':'username already taken'},status=HTTP_400_BAD_REQUEST)
    user_obj=User.objects.create_user(username=uname,email=email,password=passw)
    user_obj.first_name=f_name
    user_obj.last_name=l_name
    user_obj.save()
    return Response({'status':'user registration successful'},status=HTTP_200_OK)

# User Info
@api_view(['POST'])
def get_user_info(request):
    dat=UserSerializer(request.user).data
    return Response(data=dat,content_type='application/json')

# User Logout
@api_view(['POST'])
def user_logout(request):
    request.user.auth_token.delete()
    logout(request)
    return Response()

#######################################################################
# Item related operations
#######################################################################

#add item
@api_view(['POST'])
def create_item(request):
    cur_usr=request.user
    due_date_time=datetime.datetime.strptime(request.data.get("date")+" "+request.data.get("time"),"%Y-%m-%d %H:%M")
    TodoItem.objects.create(item_label=request.data.get('label'),item_description=request.data.get('description'),item_status=request.data.get('status'),due_date_time=due_date_time,user=cur_usr)
    return Response()

#get particular item
@api_view(['GET','POST'])
def get_item(request):
    item_id=request.data.get('id')
    try:
        it=TodoItem.objects.get(id=item_id)
        if it.user!=request.user:
            return Response({"error":"invalid user!"})
        return Response({'item':TodoItemSerializer(it).data},status=HTTP_200_OK)
    except Exception as e:
        return Response({'error':e.__str__},status=HTTP_400_BAD_REQUEST)

#get all items
@api_view(['GET','POST'])
def get_all(request):
    cur_usr=request.user
    obj_set=TodoItem.objects.filter(user=cur_usr)
    return Response(TodoItemSerializer(obj_set,many=True).data,status=HTTP_200_OK)

#update particular item
@api_view(['POST'])
def update_item(request):
    item_id=request.data.get('id')
    try:
        it=TodoItem.objects.get(id=item_id)
        if it.user!=request.user:
            return Response({"error":"invalid user!"})
        it.item_label=request.data.get('label')
        it.item_description=request.data.get('description')
        it.due_date_time=datetime.datetime.strptime(request.data.get("date")+" "+request.data.get("time"),"%Y-%m-%d %H:%M")
        it.item_status=request.data.get('status')
        it.save()
        return Response({'status':'success'},status=HTTP_200_OK)
    except Exception as e:
        return Response({'error':e.__str__},status=HTTP_400_BAD_REQUEST)

#delete item
@api_view(['POST'])
def delete_item(request):
    del_id=request.data.get('id')
    try:
        TodoItem.objects.get(id=del_id).delete()
        return Response(status=HTTP_200_OK)
    except Exception as e:
        return Response({"error":e.__str__},status=HTTP_400_BAD_REQUEST)
