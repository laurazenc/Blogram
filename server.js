// Dependencies
var express = require('express'),
    mongoose = require('mongoose');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Create express instance
var app = express();


// Middlewares
var config = require('./server/config/config')[env];
var router = express.Router();
require('./server/config/express')(app,config);
require('./server/config/mongoose')(config);
require('./server/config/passport')(app);


// Create api
var api = require('./server/routes/api')(app, express, router);

// Middleware to the api
app.use('/api', api);
app.all('/api/*',function(req,res){
  res.send(404);
});


// Any request is going to look for index
app.get('*', function (req, res) {
	res.sendFile(__dirname + '/public/app/index.html');
});

// Run server
app.listen(config.port, function (err) {
	if(err){
		console.log(err);
	}else{
		console.log('Listening on port '+ config.port);
	}
});
