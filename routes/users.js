var express = require('express');
var passport = require('passport');
var Account = require('../models/users/user');
var User = require('../models/users/index');
var router = express.Router();
var configAuth = require('../config/auth'),
    request = require("request");
var email = require('../models/users/email'),
    handlebars = require('hbs'),
    middleware = require('../middleware/authentication');


router.route('/register')
    //takes facebook sdk token checks if its real
    //if so then retrieves user email and id and stores token,email,id
    .post(function(req,res){
      var token = JSON.parse(req.body.user);
      var url = "https://graph.facebook.com/debug_token?"+
     "input_token="+token.accessToken+
     "&access_token="+configAuth.facebookAuth.appAcessToken;
      request(url, function(err, response, body) {
            console.log(body);
	    var response = JSON.parse(body);
            if (!('error' in response.data)){
		    if(configAuth.facebookAuth.clientID === response.data.app_id && 
		     token.userID === response.data.user_id)
		     {
			request('https://graph.facebook.com/me?fields=name,email&access_token='+token.accessToken, function(err,response,body){
			       var userData = JSON.parse(body);
			       userData.token = token.accessToken;
			       console.log(userData);
			       User.create(userData,function(err,user){
				       res.json(user);
				});
			});

		     }

		    else
		       res.json("error");
	    }
            else
               res.json("error");
      });
    });
module.exports = router;
