var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
	name: { type: String, required: true},
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

module.exports = mongoose.model('User', User);
