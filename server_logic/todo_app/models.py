from django.db import models
class TodoItem(models.Model):
    #automatic primary key
    item_title=models.CharField(max_length=200,null=False,unique=False)
    item_description=models.TextField(null=False,blank=True)
    completed=models.BooleanField(unique=False,null=False,default=False)
    due_date=models.DateField(null=True) #store due date if entered 
    due_time=models.TimeField(null=True) #store due time if entered
    def __str__(self):
        return self.item_title
    
