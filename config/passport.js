var BearerStrategy = require('passport-http-bearer').Strategy;
var configAuth = require('./auth');
var User = require('./../models/users/user');


module.exports = function(passport) {

            
passport.use(new BearerStrategy(
  function(token, cb) {
    User.findOne({'facebook.token': token}, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));		
};
