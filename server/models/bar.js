/*
 * Bar Model for Mongo
 * app/models/
 * bar.js
 */

var mongoose = require('mongoose');

var BarSchema = mongoose.Schema( {
    name: String,
    desc: String
});

module.exports = mongoose.model('Bar', BarSchema);
