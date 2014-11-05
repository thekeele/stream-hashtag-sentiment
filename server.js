/*
 * Server App
 * server.js
 */

// Include Modules
var express = require('express')
  , http = require('http')
  , https = require('https')
  , sys = require("sys")
  , fs = require("fs")
  , path = require('path')
  , socketio = require('socket.io');
  // , mongoose = require('mongoose')
  // , database = require('./server/config/db')
  // , FooSchema = require('./server/models/foo')
  // , BarSchema = require('./server/models/bar');


// create app, server, sockets
var app = module.exports = express();
var server = http.createServer(app);
var io = socketio.listen(server);

// Database Connection
// var db = mongoose.connection;

// https options
// var options = {
  // key: fs.readFileSync("~/.ssh/server.key"),
  // cert: fs.readFileSync("~/.ssl/server.crt"),
  // ca: fs.readFileSync("~/.ssl/ca.crt"),
  // requestCert: true,
  // rejectUnauthorized: true
// };

// Check db connection
// db.on('error', console.error);

// This calls our schemas defined in app/models
// and inserts a few test objects into the db
// *note* this code only runs once
/*db.once('open', function(error, client) {
  console.log('Connected to ' + database.url);
  // load schemas
  var Foo = mongoose.model('Foo', FooSchema);
  var Bar = mongoose.model('Bar', BarSchema);

  // create objects from schemas
  var fooing = new Foo({ name: 'foo', desc: 'fooing' });
  var baring = new Bar({ name: 'bar', desc: 'baring' });

  console.log(fooing.desc + ' my ' + baring.name);
  console.log(baring.desc + ' your ' + fooing.name);

  // save the two objects we just created
  fooing.save(function (err) {
    if (err) return console.error(err);
    console.log('Inserting object ' + fooing.name);
  });
  baring.save(function (err) {
    if (err) return console.error(err);
    console.log('Inserting object ' + baring.name);
  });
});*/

// Connect to db
// mongoose.connect(database.url);

// App Configuration
app.configure(function() {
  app.set('port', process.env.PORT || 8000);
  app.use(express.static(__dirname + '/client'));
  app.use(express.favicon(__dirname + '/client/images/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// All HTTP Routes
require('./server/routes.js')(app);

// All Socket Routes
require('./server/sockets.js')(app);

// Unsecure Server
server.listen(app.get('port'), function(){
  console.log('Node http server lending an ear on port ' + app.get('port'));
});

// Secure Server
// https.createServer(options, function (req, res) {
  // res.writeHead(200);
  // sys.puts("request from: " + req.connection.getPeerCertificate().subject.CN);
  // res.end("Hello World, " + req.connection.getPeerCertificate().subject.CN + "\n");
// }).listen(8000);

// setup socket.io communication
io.sockets.on('connection', function(client_socket){
  var sock = require('./app/sockets');
  sock(client_socket);
});
