var passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var User  = require('../models/user');

module.exports = function(app){
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions

  passport.serializeUser(function(user,done){
    if(user){
      done(null, user._id);
    }
  });

  passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user) {
        if(user){
          done(err, user);
        } else{
          done(err, false);
        }

    });
  });

  passport.use('local', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password'
    },function(email, pass, done) {
    // check in mongo if a user with username exists or not
    User.findOne({ email :  email }, '+password', function(err, user) {
      var validPassword = user.validPassword(pass);
      console.log(validPassword);
        if(err)
          return done(err);
        if(user && validPassword){
          return done(null, user);
        }else{
          return done(err,false);
        }
      }
    );
}));



};
