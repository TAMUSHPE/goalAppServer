var Account = require('../models/users/user'),
   User = require('../models/users/index'),
	configAuth = require('../config/auth'),
    request = require("request");

function authFacebook (token,cb) 
{
	var url = "https://graph.facebook.com/debug_token?"+
	"input_token="+token.accessToken+
	"&access_token="+configAuth.facebookAuth.appAcessToken;
	request(url, function(err, response, body) {
		console.log(body);
		var response = JSON.parse(body);

		if (!('error' in response.data))
		{
			//is the response app id same as the current apps
			if(configAuth.facebookAuth.clientID === response.data.app_id)
			{
		             cb(null,response);
			}
			else
				return cb(Error("user has not given permissios to our app"));
		}
		else
			return cb(Error("error on retrieving token data from facebook"));

	});

}
function facebookLogin (token,cb)
{
  authFacebook(token, function(err,response)
  {
   if(err) return cb(err);
   accountCheck(response,cb);
  });

}
function accountCheck(response,cb)
{
	Account.findOne({'facebook.id': response.data.user_id}, function(err,user) {
		if (err) 
		{
			return cb(err);
		}
		if (user) 
		{
			return cb(null,user);
		}
		else 
		{
			return createUser(token,cb);
		}
	});

}

function createUser (token,cb) {
	request('https://graph.facebook.com/me?fields=name,email&access_token='+token.accessToken, function(err,response,body){
	       var userData = JSON.parse(body);
	       userData.token = token.accessToken;
	       console.log(userData);
	       User.create(userData,function(err,user){
				if (err) 
				{
					return cb(err);
				}
		       return cb(null,user);
		});
	});	
}


module.exports ={
	authFacebook: authFacebook,
	createUser: createUser,
        facebookLogin: facebookLogin
};
