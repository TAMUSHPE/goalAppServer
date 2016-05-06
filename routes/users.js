var express = require('express');
var passport = require('passport');
var Account = require('../models/users/user');
var User = require('../models/users/index');
var router = express.Router();
var configAuth = require('../config/auth'),
    request = require("request");
var email = require('../models/users/email'),
    handlebars = require('hbs'),
    middleware = require('../middleware/authentication'),
    authHelper = require('../lib/helper.js');
var mongoose = require('mongoose');
router.route('/login')
    //takes facebook sdk token checks if its real
    //if so then retrieves user email and id and stores token,email,id
    .post(function(req,res){
      var token = JSON.parse(req.body.user);
      authHelper.facebookLogin(token,function (err,user) {
        if (err) 
        {
          res.json(err);
        }
        res.json(user);
      })
    });
router.route('/addOrg')
     .post(passport.authenticate('bearer', { session: false }),function(req,res){
      var userId = req.user._id;
      var orgId = mongoose.Types.ObjectId(req.body.orgId);
      var admin = JSON.parse(req.body.admin);
	User.addOrg(orgId, userId, admin, function(err,user){
		if(err) {
		res.json(err);
		}
		res.json(user);
	});
     });
module.exports = router;
