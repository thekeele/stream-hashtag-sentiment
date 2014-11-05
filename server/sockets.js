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

var nbOpenSockets = 0;

module.exports = function (client_socket) {

  // establish client socket
  console.log('Client connected');

  var TWEET_BUFF = 3;
  var tweetBuffer = [];

  var tweet = new twit({
  });

  var stream = tweet.stream('statuses/filter', { locations: [-122.75,36.8,-121.75,37.8] });
  console.log("Listening for tweets from San Francisco...");

  if (nbOpenSockets <= 0) {
      nbOpenSockets = 0;
      console.log('First active client. Start streaming from Twitter');
      stream.start();
  }

  nbOpenSockets++;

  client_socket.on('disconnect', function() {
      console.log('Client disconnected');
      nbOpenSockets--;

      if (nbOpenSockets <= 0) {
          nbOpenSockets = 0;
          console.log("No active client. Stop streaming from Twitter");
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
      if (tweet.geo == null) {
          return ;
      }

      //Create message containing tweet + username + profile pic + geo
      var msg = {};
      msg.text = tweet.text;
      msg.geo = tweet.geo.coordinates;
      msg.user = {
          name: tweet.user.name,
          image: tweet.user.profile_image_url
      };

      console.log(msg);

      //push msg into buffer
      tweetBuffer.push(msg);

      //send buffer only if full
      if (tweetBuffer.length >= TWEET_BUFF) {
          //broadcast tweets
          client_socket.emit('tweets', tweetBuffer);
          tweetBuffer = [];
      }
  });

};
