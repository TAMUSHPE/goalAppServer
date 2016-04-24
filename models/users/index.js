var User = require('./user');
var Helper = require('../../lib/incomingFilterData');
var debug = require('debug')('accounts');
var fields= ["email","name"]; 
var mongoose = require('mongoose');
module.exports = {
	/*
	TODO set a default pic
		call to create a new User
	*/
	create: function (params, cb) {
		var newUser = new User();
		Helper.retrieveFields(fields,newUser,params);
		newUser.facebook.id = params.id;
		newUser.facebook.token = params.token;
		newUser.image = "http://graph.facebook.com/" + params.id + "/picture?type=square"
		newUser.save(function(err,user){
			if(err){
			  cb(err);
			}
			cb(null,user);
		});

	}, //close create
	//retrieves one user by id
	get: function (id, cb,name) {
		var findBy={};
		if (name) {
			findBy = {username: id};
		}
		else
		{
			findBy = {_id: id};
		}
		User.findOne(findBy, function(err, user) {
            if(err) {
                return cb(err);
            }
            if (!user) {

            	return cb(Error("User not found"));
            };
          cb(null, user);
        });
	},
	//retrieves all users
	all: function (cb) {
		User.find(function(err, users) {
            if(err) {
                return cb(err);
            }
          cb(null, users);
        });
	},
	put: function (id, params, cb) {
	  User.findById(id, function(err, user){
	  	if(err){ cb(err);}
		Helper.retrieveFields(fields,user,params);
		user.save(function(err,user){
			if(err){
			cb(err);
			}
			cb(null,user);
		});
          });
	},
	delete: function (id, cb) {
		  User.remove({
            _id: id
        }, function(err) {
            if(err) {
                return cb(err);
            }
        });
	},
	//retrieves one user by id
	getUsers: function (id,type, cb) {
		User.findOne({username: id}).populate(type).exec(function(err, user) {
            if(err) {
                return cb(err);
            }
          cb(null, user);
        });
	},

} 
