from django.db.models.signals import pre_save
from .models import User

def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != "":
        user.username = user.email
        
    
    
pre_save.connect(receiver=updateUser, sender=User)