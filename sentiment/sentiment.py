#!/usr/bin/python

# Example
# http://www.laurentluce.com/posts/twitter-sentiment-analysis-using-python-and-nltk/

pos_train_tweets = [
    ('I love bitcoin', 'positive'),
    ('Bitcoin is great', 'positive'),
    ('The bitcoin revolution has begun', 'positive'),
    ('Bitcoin is valuable', 'positive'),
    ('Bitcoin is my best friend', 'positive')
]

neg_train_tweets = [
    ('I hate bitcoin', 'negative'),
    ('Bitcoin is stupid', 'negative'),
    ('Bitcoin is a waste of money', 'negative'),
    ('Bitcoin will destroy the earth', 'negative'),
    ('Bitcoin is the devil', 'negative')
]

test_tweets = [
    ('Bitcoin is the truth', 'positive'),
    ('Bitcoin is fantastic', 'positive'),
    ('Bitcoin is crap', 'negative'),
    ('Bitcoin is worthless', 'negative'),
    ('Death to Bitcoin', 'negative'),
]

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
print 'Testing tweets: \n', test_tweets