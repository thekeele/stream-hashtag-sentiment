/*
 * Foo Model for Mongo
 * app/models/
 * foo.js
 */

var mongoose = require('mongoose');

var FooSchema = mongoose.Schema( {
    name: String,
    desc: String
});

module.exports = mongoose.model('Foo', FooSchema);
