var Goal = require('./goal');
module.exports = {
	create: function (req, cb) {
	    var newGoal = new Organization();
        newGoal.name = req.body.name;
        newGoal.desc = req.body.desc;
        newGoal.coop = req.body.coop;
        newGoal.save(function(err, newOrganization) {
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
          cb(null, Goal);
        });
	},
	all: function (cb) {
		Goal.find(function(err, goals) {
            if(err) {
                cb(err);
            }
          cb(null, Goals);
        });
	},
	put: function (req, cb) {
		Goal.findById(req.params.id, function(err, goal) {
            if(err) {
                cb(err);
            }
	      	Goal.name = req.body.name;
	        Goal.desc = req.body.desc;
	        Goal.coop = req.body.coop;
            Goal.save(function(err, goal) {
                if(err) {
                    cb(err);
                }
                cb(null,Goal);
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
