# from django.db import models

# # Create your models here.
# # models.py

# class UserInteraction(models.Model):
#     word = models.CharField(max_length=100)
#     score = models.FloatField()
#     timestamp = models.DateTimeField(auto_now_add=True)
#     # Add more fields as needed

#     def __str__(self):
#         return f"{self.word} - Score: {self.score} - Timestamp: {self.timestamp}"



from django.contrib.auth.models import User
from django.db import models

class UserInteraction(models.Model):
    user_ip = models.CharField(max_length=15)  # Максимальная длина IP адреса
    number_guess = models.IntegerField()
    word = models.CharField(max_length=100)
    score = models.FloatField()
    time = models.DateTimeField(auto_now_add=True)
    win = models.BooleanField()

    def __str__(self):
        return f"User IP: {self.user_ip} - Word: {self.word} - Score: {self.score} - Time: {self.time} - Win: {self.win}"
