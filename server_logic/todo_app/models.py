from django.db import models
from django.contrib.auth.models import User
class TodoItem(models.Model):
    item_label=models.CharField(max_length=200,null=False,unique=False,blank=True)
    item_description=models.TextField(null=False,blank=True)
    item_status=models.TextField(max_length=200,null=False,unique=False)
    due_date_time=models.DateTimeField(null=False)  
    date_time_set=models.DateTimeField(auto_now_add=True) 
    date_time_modified=models.DateTimeField(auto_now=True) 
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=False)
    def __str__(self):
        return self.item_description
    
