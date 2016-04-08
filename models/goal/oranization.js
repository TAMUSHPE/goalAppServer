var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Goal = new Schema({
    name: String,
    desc: String,
    completed: Boolean,
    assigned: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'}
    creator: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'},
    hash: {type:String, required:true},
    created_at: Date,
    pdated_at: Date
});
//on every save, add the date
Goal.pre('save', function(next){
	//get the current date
	var currentDate = new Date();
	//change the udpated_at field to current date
	this.updated_at = currentDate;

	//if created_at doesn't exist, add to the field
	if(!this.created_at)
		this.created_at = currentDate;

	next();
});
module.exports = mongoose.model('Goal', Goal);
