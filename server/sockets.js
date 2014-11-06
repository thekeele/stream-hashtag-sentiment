/*
 * API and Browser Routes
 * app/routes/
 * routes.js
 */

// MongoDB Models
// var Foo = require('./models/foo')
  // , Bar = require('./models/bar');

// Include Modules
var twit = require('twit');

// Global Variables
var numClients = 0;
var TWEET_BUFF = 1;
var tweetBuffer = [];

// Access Control
var tweet = new twit({
  consumer_key:         'TLtsLmgRmn0c8mj2HYwAt1E44',
  consumer_secret:      'Lk5Hv5wy9BfhE2Uk9xQceG5J9rHv2sDaw5I71tdNatUCjJxbtK',
  access_token:         '1546258921-5Dk4ybc9cL2NLAIzQHdg5jhfKrFLHYR0GyRIOXP',
  access_token_secret:  'YARvN5yO5gfxHN2u8lr3xTWb4Dj0BXvGZgo3lon28Quw4'
});

module.exports = function (client_socket) {

  // stream tweets with the word bitcoin
  var stream = tweet.stream('statuses/filter', { track: 'bitcoin' });
  console.log("Listening for tweets with the word bitcoin...");

  if (numClients <= 0) {
    numClients = 0;
    console.log('Client Connected. Starting stream from Twitter');
  }

  numClients++;

  client_socket.on('disconnect', function() {
    numClients--;

    if (numClients <= 0) {
      numClients = 0;
      console.log("Client Disconnected. Stop stream from Twitter");
      stream.stop();
    }
  });

  stream.on('connect', function(request) {
    console.log('Connected to Twitter API');
  });

  stream.on('disconnect', function(message) {
    console.log('Disconnected from Twitter API. Message: ' + message);
  });

  stream.on('reconnect', function (request, response, connectInterval) {
    console.log('Trying to reconnect to Twitter API in ' + connectInterval + ' ms');
  });

  stream.on('tweet', function(tweet) {
    var msg = {};
    msg.text = tweet.text;
    msg.created = tweet.created_at;
    msg.ts = tweet.timestamp_ms;
    msg.user = {
        name: tweet.user.name,
        location: tweet.user.location
    };

    // log message to console
    console.log(msg);

    // push msg into buffer
    tweetBuffer.push(msg);

    // send buffer only if full
    if (tweetBuffer.length >= TWEET_BUFF) {
      // broadcast tweets to client
      client_socket.emit('tweets', tweetBuffer);

      // empty buffer
      tweetBuffer = [];
    }
  });

};
