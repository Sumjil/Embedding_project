from transformers import BertTokenizer, BertModel, GPT2Tokenizer, GPT2LMHeadModel
import torch
from gensim.models import KeyedVectors
import gensim.downloader as api
from transformers import AutoTokenizer, AutoModel
import torch
import torch.nn.functional as F
import os
from openai import OpenAI
# importing os module for environment variables
import os
# importing necessary functions from dotenv library
from dotenv import load_dotenv, dotenv_values 
# loading variables from .env file

class Word2VecModels:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            # cls._instance.model_name = 'fasttext-wiki-news-subwords-300'
            cls._instance.load_word2vec_model() 
            # cls._instance.load_bert_model()
            cls._instance.load_gpt_model()
            cls._instance.load_fasttext_model()
            cls._instance.load_Glove_model()
            cls._instance.load_SentenceTransformer()
        return cls._instance
    
    def load_bert_model(self):
        self.bert_tokenizer = BertTokenizer.from_pretrained('bert-large-uncased')
        self.bert_model = BertModel.from_pretrained('bert-large-uncased')

    def load_gpt_model(self):
    #     # self.gpt_tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
    #     # self.gpt_model = GPT2LMHeadModel.from_pretrained('gpt2')
            print(load_dotenv())
            
    
    def load_word2vec_model(self):
        self.word2vec_model = api.load('word2vec-google-news-300')

    def load_fasttext_model(self):
        self.fasttext_model = api.load('fasttext-wiki-news-subwords-300')  

    def load_Glove_model(self):
        # glove_file = "./archive/glove.6B.200d.txt"
        glove_file = "/Users/yulia/Downloads/coding/thesis_copy/backend/api/archive/glove.6B.200d.txt"
        self.Glove_model = KeyedVectors.load_word2vec_format(glove_file, binary=False, no_header=True)
    def load_SentenceTransformer(self):
        # Load model from HuggingFace Hub
        self.SentenceTransformer_tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
        self.SentenceTransformer_model = AutoModel.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')

    def get_word_vector(self, word, model_type='word2vec'):
        if model_type == 'word2vec':
            try:
                embedding = self.word2vec_model[word]
                return embedding
            except KeyError:
                return None
        elif model_type == 'fast_text':
            try:
                embedding = self.fasttext_model[word]
                return embedding
            except KeyError:
                return None
            # import cohere
            # import numpy as np
            # co = cohere.Client("pKH0SziG17EWZev7bXMugvkcfbAZECDukMTO8frP")

            # model="embed-english-v3.0"
            # input_type="search_query"

            # res = co.embed(texts=[word],
            #                 model=model,
            #                 input_type=input_type,
            #                 embedding_types=['float'])

            # (embadding) = res.embeddings.float
            # embadding_array = np.array(embadding)

            # return embadding_array

        elif model_type == 'Glove':
            if word in self.Glove_model:
                embedding = self.Glove_model[word]
                return embedding
            else:
                return None
        elif model_type == 'SentenceTransformer':
            if word in self.Glove_model:
                def mean_pooling(model_output, attention_mask):
                    token_embeddings = model_output[0]  # First element of model_output contains all token embeddings
                    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
                    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)
                encoded_words = self.SentenceTransformer_tokenizer(word, padding=True, truncation=True, return_tensors='pt')
                # Compute token embeddings for words
                with torch.no_grad():
                    word_model_output = self.SentenceTransformer_model(**encoded_words)
                # Perform pooling for words
                word_embeddings = mean_pooling(word_model_output, encoded_words['attention_mask'])
                # Normalize word embeddings
                word_embeddings = F.normalize(word_embeddings, p=2, dim=1)
                return word_embeddings
            else:
                print("no in dict")
                return None

            # return self.get_word2vec_vector(word)
        # elif model_type == 'bert':
        #     return self.get_bert_vector(word)
        elif model_type == 'gpt':
            if word in self.Glove_model:
                from openai import OpenAI
                client = OpenAI()
                response = client.embeddings.create(
                    input=word,
                    model="text-embedding-3-small"
                )

                # print(response.data[0].embedding)
                # text_index = self.gpt_tokenizer.encode(word, add_prefix_space=True)
                # word_embedding = self.gpt_model.transformer.wte.weight[text_index,:].detach().numpy()
                # return word_embedding
                return response.data[0].embedding
            else:
                print(f"'{word}' does not exist in the GPT-2 tokenizer's vocabulary.")
                return None
            # return self.get_gpt_vector(word)


  
