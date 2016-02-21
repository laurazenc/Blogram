var express       = require('express'),
    bodyParser    = require('body-parser'),
    passport      = require('passport'),
    morgan        = require('morgan'),
    multer        = require('multer'),
    session       = require('express-session'),
    cookieParser  = require('cookie-parser');


module.exports = function(app, config){
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true}));
  app.use(cookieParser());
  app.use(session({secret: 'thesupersecretpass'}));
  //app.use(multer());
  app.use(morgan('dev'));
  app.use(express.static(config.rootPath + '/public'));
}
