from transformers import BertTokenizer, BertModel, GPT2Tokenizer, GPT2LMHeadModel
import torch
from gensim.models import KeyedVectors
import gensim.downloader as api

class Word2VecModels:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.model_name = 'fasttext-wiki-news-subwords-300'
            cls._instance.word2vec_model = cls._instance.load_word2vec_model()
            cls._instance.load_bert_model()
            cls._instance.load_gpt_model()
        return cls._instance
    
    def load_bert_model(self):
        self.bert_tokenizer = BertTokenizer.from_pretrained('bert-large-uncased')
        self.bert_model = BertModel.from_pretrained('bert-large-uncased')

    def load_gpt_model(self):
        self.gpt_tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
        self.gpt_model = GPT2LMHeadModel.from_pretrained('gpt2')

    def load_word2vec_model(self):
        try:
            return KeyedVectors.load("word2vec_model.bin")
        except FileNotFoundError:
            try:
                model = api.load(self.model_name)
                model.save_word2vec_format("word2vec_model.bin", binary=True)
                return model
            except Exception as e:
                print(f"Error downloading or saving the model: {e}")
                return None
    
    def get_word_vector(self, word, model_type='word2vec'):
        if model_type == 'word2vec':
            return self.get_word2vec_vector(word)
        elif model_type == 'bert':
            return self.get_bert_vector(word)
        elif model_type == 'gpt':
            return self.get_gpt_vector(word)

    def get_word2vec_vector(self, word):
        if self.word2vec_model and word in self.word2vec_model:
            return self.word2vec_model[word]
        else:
            return None

    def get_bert_vector(self, word):
        if word in self.bert_tokenizer.vocab:
            tokenized_word = self.bert_tokenizer.tokenize(word)
            token_ids = self.bert_tokenizer.convert_tokens_to_ids(tokenized_word)
            tensor = torch.tensor(token_ids).unsqueeze(0)
            with torch.no_grad():
                embedding = self.bert_model(tensor)[0][:, 0, :]
            return embedding.numpy()
        else:
            print(f"'{word}' does not exist in the BERT tokenizer's vocabulary.")
            return None

    def get_gpt_vector(self, word):
        if word in self.gpt_tokenizer.get_vocab():
            text_index = self.gpt_tokenizer.encode(word, add_prefix_space=True)
            word_embedding = self.gpt_model.transformer.wte.weight[text_index,:].detach().numpy()
            return word_embedding
        else:
            print(f"'{word}' does not exist in the GPT-2 tokenizer's vocabulary.")
            return None
