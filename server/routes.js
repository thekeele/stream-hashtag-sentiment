/*
 * API and Browser Routes
 * app/routes/
 * routes.js
 */

// MongoDB Models
var Foo = require('./models/foo')
  , Bar = require('./models/bar');

// Include Modules
var fs = require('fs')
  , path = require('path')
  , http = require('http')
  , https = require('https')
  , url = require('url');


module.exports = function(app) {

  app.get('/api', function(req, res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    console.log('BODY: ' + JSON.stringify(res.body));

    var routes = [];
    var hostname = req.headers.host;
    var pathname = url.parse(req.url).pathname;

    routes.push('http://' + hostname + pathname + '/foo');
    routes.push('http://' + hostname + pathname + '/bar');

    res.json(routes);
  });

  app.get('/api/foo', function(req, res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    console.log('BODY: ' + JSON.stringify(res.body));

    // Access Model Created from Mongo
    Foo.find(function(err, foos) {
      if (err)
        res.send(err);

      console.log(foos);
      res.json(foos);
    });
  });

  app.get('/api/bar', function(req, res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    console.log('BODY: ' + JSON.stringify(res.body));

    // Access Model Created from Mongo
    Bar.find(function(err, bars) {
      if (err)
        res.send(err);

      console.log(bars);
      res.json(bars);
    });
  });

  app.get('*', function(req, res) {
    res.sendfile('../client/index.html');
  });

};
