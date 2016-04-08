var Goal = require('./goal');
var Helper = require('../../lib/incomingFilterData');
var fields = ["name","desc","completed","assigned","creator"];
module.exports = {
	create: function (req, cb) {
	    var newGoal = new Goal();
        Helper.retrieveFields(fields,newGoal,req.body);
        newGoal.save(function(err, newGoal) {
            if(err) {
                cb(err);
            }
            cb(null, newGoal);
        });
	}, //close create
	get: function (id, cb) {
		Goal.findById(id, function(err, goal) {
            if(err) {
                cb(err);
            }
          cb(null, goal);
        });
	},
	all: function (cb) {
		Goal.find(function(err, goals) {
            if(err) {
                cb(err);
            }
          cb(null, goals);
        });
	},
	put: function (req, cb) {
		Goal.findById(req.params.id, function(err, goal) {
            if(err) {
                cb(err);
            }
        Helper.retrieveFields(fields,goal,req.body);
            goal.save(function(err, goal) {
                if(err) {
                    cb(err);
                }
                cb(null,goal);
            });
        });
	},
	delete: function (id, cb) {
		  Goal.remove({
            _id: id
        }, function(err) {
            if(err) {
                cb(err);
            }
        });
	}
} 
