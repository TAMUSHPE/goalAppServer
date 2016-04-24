var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
	username: { type: String, required: true, index: { unique: true }},
	email: { type: String, required: true, index: { unique: true }},
	password: String,
    image: {type:String, required: true} 
     	,
	following: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'}],
	followers: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'}],
    facebook: {
        id: String,
        token: String
    },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
