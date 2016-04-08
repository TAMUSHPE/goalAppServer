var Goal = require('./goal');
var Helper = require('../../lib/incomingFilterData');
var fields = ["name","desc","completed","assigned","creator"];
module.exports = {
	create: function (req, cb) {
	    var newGoal = new Goal();
        newGoal.name = req.body.name;
        newGoal.desc = req.body.desc;
        newGoal.completed = req.body.completed;
        newGoal.assigned = req.body.assigned;
        newGoal.creator = req.body.creator;
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
	      	goal.name = req.body.name;
	        goal.desc = req.body.desc;
	        goal.coop = req.body.coop;
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
