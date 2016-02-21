var User = require('../models/user');
var passport = require('passport');

// API RESTful
module.exports = function(app, express,router){


  var api = router;
    // SignUp
  api.post('/signup', function(req,res,next){
    var user = new User({
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		});

    user.save(function(err){
			if(err){
        if(err.toString().indexOf('E11000') > -1){
          err = new Error('That username is already in use!');
        }
				res.status(400);
				return res.send({reason: err.toString()});
			}

      req.logIn(user, function(err){
        if(err){ return next(err) }
        var userData = {
          email: user.email,
          username: user.username,
          _id: user._id
        }
        res.send({success: true, user:userData});
      });
    });





});

  // LogIn
  api.post('/login', function(req,res,next){
    var auth = passport.authenticate('local', function(err, user){
      if(err) { return next(err)};
      if(!user){
        res.send({success: false, reason: 'Email or password incorrect'});
      }
      req.logIn(user, function(err){
        if(err){ return next(err) }
        var userData = {
          email: user.email,
          username: user.username,
          _id: user._id
        }
        res.send({success: true, user:userData});
      });
    });

  auth(req,res,next);
});

  api.get('/profile', function(req,res){
    res.json(req.user);
  });



  api.post('/logout', function(req,res){
    req.logout();
    res.end();
  });

  return api;
};
