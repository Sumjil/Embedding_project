from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .word2vecmodels import Word2VecModels
import torch
from datetime import datetime
import csv
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from .models import UserInteraction
import logging

logger = logging.getLogger(__name__)

word2vec_models = Word2VecModels()

@api_view(['GET'])
def getRoutes(request):
    return Response('Our API')

@api_view(['POST', 'GET'])
def word_vector_view(request, word):
    secret_word = 'sheep'
    
    if request.method == 'POST':
        data = request.data
        attempt_number = data.get('attemptNumber')
        user_guess = data.get('guess')
        win = (user_guess == secret_word)

        word1_embeddings = word2vec_models.get_word_vector(word, model_type='word2vec')
        word2_embeddings = word2vec_models.get_word_vector(secret_word, model_type='word2vec')
        
        if word1_embeddings is not None and word2_embeddings is not None:
            word1_embeddings = word1_embeddings.reshape(1, -1)
            word2_embeddings = word2_embeddings.reshape(1, -1)
            similarity = cosine_similarity(word1_embeddings, word2_embeddings)[0][0]
            current_time = datetime.now()
            user_ip = request.META.get('REMOTE_ADDR')
            model = "word2vec"
            
            with open('game_data.csv', mode='a', newline='') as file:
                writer = csv.writer(file)
                writer.writerow([request.user, model, attempt_number, word, similarity, current_time, win])
                logger.info([user_ip, model, attempt_number, word, similarity, current_time, win])
            
            return Response(similarity)
        else:
            return Response(-1)

    return Response(status=405)

@api_view(['POST', 'GET'])
def bert_endpoint(request, word):
    secret_word = 'school'
    
    if request.method == 'POST':
        data = request.data
        attempt_number = data.get('attemptNumber')
        user_guess = data.get('guess')
        win = (user_guess == secret_word)
        current_time = datetime.now()
        user_ip = request.META.get('REMOTE_ADDR')
        model = "bert"

        word1_embeddings = word2vec_models.get_word_vector(word, model_type='bert')
        word2_embeddings = word2vec_models.get_word_vector(secret_word, model_type='bert')

        if word1_embeddings is not None and word2_embeddings is not None:
            similarity = cosine_similarity(word1_embeddings, word2_embeddings)[0][0]

            with open('game_data.csv', mode='a', newline='') as file:
                writer = csv.writer(file)
                writer.writerow([request.user, model, attempt_number, word, similarity, current_time, win])
                logger.info([user_ip, model, attempt_number, word, similarity, current_time, win])

            return Response(similarity)
        else:
            return Response(-1)

    return Response(status=405)

@api_view(['POST', 'GET'])
def gpt_endpoint(request, word):
    secret_word = 'work'
    
    if request.method == 'POST':
        word1_embeddings = word2vec_models.get_word_vector(word, model_type='gpt')
        word2_embeddings = word2vec_models.get_word_vector(secret_word, model_type='gpt')
        
        if word1_embeddings is not None and word2_embeddings is not None:
            max_length = max(len(word1_embeddings), len(word2_embeddings))
            word1_embedding_padded = np.pad(word1_embeddings, ((0, max_length - len(word1_embeddings)), (0, 0)), mode='constant')
            word2_embedding_padded = np.pad(word2_embeddings, ((0, max_length - len(word2_embeddings)), (0, 0)), mode='constant')
            similarity = cosine_similarity(word1_embedding_padded, word2_embedding_padded)[0][0]
            return Response(similarity)
        else:
            return Response(-1)

    return Response(status=405)

@api_view(['POST', 'GET'])
def hits(request, max_guess_score):
    threshold = 0.1
    secret_word = 'book'
    loaded_model = word2vec_models.get_model()

    if request.method == 'GET' or request.method == 'POST':
        similar_words = [word for word, sim in loaded_model.most_similar(positive=[secret_word], topn=10000) if sim > float(max_guess_score) + threshold]
        
        if len(similar_words) == 0:
            return Response(status=405)

        threshold += 0.1
        hit_word = similar_words[-1]
        hit_word_similarity = loaded_model.similarity(hit_word, secret_word)

        if hit_word != secret_word:
            logger.info({'hit_word': hit_word, 'hit_word_similarity': hit_word_similarity})
            return Response({'hit_word': hit_word, 'hit_word_similarity': hit_word_similarity})

    return Response(status=405)
