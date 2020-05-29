from django.db import models
from django.contrib.auth.models import User
class TodoItem(models.Model):
    #automatic primary key
    item_title=models.CharField(max_length=200,null=False,unique=False)
    item_description=models.TextField(null=False,blank=True)
    completed=models.BooleanField(unique=False,null=False,default=False)
    due_date_time=models.DateTimeField(null=False) #store due date time 
    date_time_set=models.DateTimeField(auto_now_add=True) #store date time at which the item was added
    date_time_modified=models.DateTimeField(auto_now=True) #store date time at which item was last modified
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=False)
    def __str__(self):
        return self.item_title
    
