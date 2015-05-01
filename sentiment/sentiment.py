#!/usr/bin/python

# Example
# http://www.laurentluce.com/posts/twitter-sentiment-analysis-using-python-and-nltk/

## Modules
import nltk

## Data

# Positive list of tuple entries, text and sentiment. Used for training
pos_train_tweets = [
    ('I love bitcoin', 'positive'),
    ('Bitcoin is great', 'positive'),
    ('The bitcoin revolution has begun', 'positive'),
    ('Bitcoin is valuable', 'positive'),
    ('Bitcoin is my best friend', 'positive')
]

# Negative list of tuple entries, text and sentiment. Used for training
neg_train_tweets = [
    ('I hate bitcoin', 'negative'),
    ('Bitcoin is stupid', 'negative'),
    ('Bitcoin is a waste of money', 'negative'),
    ('Bitcoin will destroy the earth', 'negative'),
    ('Bitcoin is the devil', 'negative')
]

# Mixed list of tuple entries, text and sentiment. Used for testing
test_tweets = [
    ('Bitcoin is the truth', 'positive'),
    ('Bitcoin is fantastic', 'positive'),
    ('Bitcoin is crap', 'negative'),
    ('Bitcoin is worthless', 'negative'),
    ('Death to Bitcoin', 'negative'),
]

## Data Cleaning

# Function: word_filter
# Argument: List of tuples, text and sentiment
#  Filters out words that are less than 3 characters
#  Also filters out words that don't help with determining sentiment
# Return: List of tuples, text and sentiment. All lowercase characters
def word_filter(tweets):
    processed_tweets = []

    for words, sentiment in tweets:
        filted_words = []

        for word in words.split():
            word = word.lower()
            if len(word) >= 3:
                if word == 'the':
                    pass
                else:
                    filted_words.append(word)

        processed_tweets.append((filted_words, sentiment))

    return processed_tweets

train_tweets = word_filter(pos_train_tweets + neg_train_tweets)
print 'Training tweets: \n', train_tweets

test_tweets = word_filter(test_tweets)
print '\nTesting tweets: \n', test_tweets

## Classifier

# Function: get_all_words
# Argument: List of tuples, text and sentiment
#  Creates list of all words found in tuple argument
# Return: List of words. All lowercase characters
def get_all_words(tweets):
    all_words = []

    for words, sentiment in tweets:
        all_words.extend(words)

    return all_words

all_words = get_all_words(train_tweets)
print '\nAll words: \n', all_words

# Function: get_word_features
# Argument: List of tokens
#  Computes Frequency Distribution on list, number of occurrences
# Return: List of unique words, most frequent to least
def get_word_features(word_list):
    word_list = nltk.FreqDist(word_list)

    print '\n', word_list

    for key, val in word_list.items():
        print key, val

    word_features = word_list.keys()
    return word_features

word_features = get_word_features(all_words)
print '\nWord features: \n', word_features
