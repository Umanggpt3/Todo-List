"""server_logic URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from todo_app.views import handle_user_login,handle_user_signup,get_user_info,user_logout,create_item,delete_item,get_item,update_item,get_all

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/login/',handle_user_login,name="user_login"),
    path('user/signup/',handle_user_signup),
    path('user/getinfo/',get_user_info),
    path('user/logout/',user_logout),
    path('item/create',create_item),
    path('item/update',update_item),
    path('item/delete',delete_item),
    path('item/get',get_item),
    path('item/get_all',get_all)
]
