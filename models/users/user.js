var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
	username: { type: String, required: true, index: { unique: true }},
	email: { type: String, required: true, index: { unique: true }},
	password: String,
    image: { 
     	type: mongoose.Schema.Types.ObjectId, 
     	ref: 'Image'},
    bio: String,
    avatars : [{ 
     	type: mongoose.Schema.Types.ObjectId, 
     	ref: 'Image'}],
	following: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'}],
	followers: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'}],
	resetPasswordToken: String,
  	resetPasswordExpires: Date,
    activateAccountToken: String,
    activateAccountExpires: Date,
    accountActivated: {type: Boolean, required: true, default: false},
    facebook: {
        id: String,
        token: String
    },
    google : {
        id: String,
        token: String
    }

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
