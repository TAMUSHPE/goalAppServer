var User = require('./user');
var Image = require('../images/index');
var debug = require('debug')('accounts');
var fields= ["email","username"]; 
var mongoose = require('mongoose');
module.exports = {
	/*
	TODO set a default pic
		call to create a new User
	*/
	create: function (params, cb) {
		var newUser = new User();
		Helper.retrieveFeilds(fields,newUser,params);
		newUser.save(function(err,newUser){
			if(err){
			  cb(err);
			}
			cb(null,newUser);
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
			cb(null,goal);
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
