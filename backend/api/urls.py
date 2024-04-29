# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('game/<str:word>/', views.word_vector_view, name='words'),
    path('hit/<str:max_guess_score>/', views.hits, name='hits'),
    path('game_bert/<str:word>/', views.bert_endpoint, name='bert'),
    path('game_gpt/<str:word>/', views.gpt_endpoint, name='gpt'),
]