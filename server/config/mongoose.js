var mongoose = require('mongoose');
var User = require('../models/user');


module.exports = function(config){
  mongoose.connect(config.db);
  var MongoDB = mongoose.connection;
  MongoDB.on('error', function(err) { console.log(err.message); });
  MongoDB.once('open', function() {
    console.log("mongodb connection open");
  });
}
