var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Organization = new Schema({
    name: String,
    desc: String,
    private: {type:Boolean , default: false},
    admins: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'}],
    members: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'}],
	hash: {type:String, required:true},
   	created_at: Date,
  	updated_at: Date
});
//on every save, add the date
Organization.pre('save', function(next){
	//get the current date
	var currentDate = new Date();
	//change the udpated_at field to current date
	this.updated_at = currentDate;

	//if created_at doesn't exist, add to the field
	if(!this.created_at)
		this.created_at = currentDate;

	next();
});
module.exports = mongoose.model('Organization', Organization);