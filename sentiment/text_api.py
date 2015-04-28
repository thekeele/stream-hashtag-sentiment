#!/usr/bin/python

# API used
# http://text-processing.com/docs/sentiment.html

import sys
import urllib
import urllib2
import json
from math import floor

url ='http://text-processing.com/api/sentiment/'

def process_args():
    args = sys.argv
    if len(args) == 1:
        return {'text': 'great'}
    elif len(args) == 2:
        return {'text': str(args[1])}
    else:
        text = ''
        args.pop(0)
        for arg in args:
            text = text + arg + ' '
        return {'text': text.strip()}

def encode_tweet():
    tweet = process_args()
    print 'JSON is: ', tweet
    print 'Tweet is: ' + tweet['text']
    return urllib.urlencode(tweet)

def post_tweet(url):
    req = urllib2.Request(url, encode_tweet())
    res = urllib2.urlopen(req)
    print 'HTTP Status: ', res.code
    data = res.read()
    res.close()
    return json.loads(data)

def floored_percentage(val, digits):
    val *= 10 ** (digits + 2)
    return '{1:.{0}f}%'.format(digits, floor(val) / 10 ** digits)

for key, val in post_tweet(url).items():
    if key == 'label':
        print 'Sentiment is: ' + 'Positive' if val == 'pos' else 'Negative'
    if key == 'probability':
        for k,v in val.items():
            print k, floored_percentage(v, 2)
