var express = require('express');
var router = express.Router();
var Goal = require('../models/goals/index');
var Organization = require('../models/organization/index');
var passport = require('passport');

router.route('/goals')
    .get(function(req, res) {
        Goal.all(function(err, data) {
            if(err) {
                return res.send(500, err);
            }
            return res.send(data);
        });
    })
    .post(function(req, res) {
	req.body.creator = req.user._id;
	Organization.get(req.body.org, function(err,org){
		if (err) {
		return res.send(500,err);
		}
		Goal.create(req, function(err, newGoal) {
		    if(err) {
			return res.send(500, err);
		    }
			org.goals.push(newGoal._id);
			org.save(function(err,org){
			
			    return res.json(newGoal);
			});
		});
	});
    });
router.route('/goals/:id')
    .put(function(req, res) {
        Goal.put(req, function(err, goal) {
            if(err) {
                res.send(err);
            }
            res.json(goal);
        });
    })
    .get(function(req, res) {
        Goal.get(req.params.id, function(err, goal) {
            if(err) {
                res.send(err);
            }
       		res.json(goal);
        });
    })
    .delete(function(req, res) {
        Goal.delete(req.params.id, function(err) {
            if(err) {
                res.send(err);
            }
            res.json('Deleted!');
        });
    });
router.route('/test')
	.get(passport.authenticate('bearer', { session: false }),function(req,res){
  res.json("sucess");
});
module.exports = router;
