var BearerStrategy = require('passport-http-bearer').Strategy;
var configAuth = require('./auth');
var User = require('./../models/users/user');
var authHelper = require("./../lib/helper.js");

module.exports = function(passport) {

            
passport.use(new BearerStrategy(
  function(token, cb) {
   var temp = {};
   temp.accessToken = token;
   authHelper.authFacebook(temp, function(err,response){
    User.findOne({'facebook.id': response.data.user_id}, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
    });
  }));		
};
