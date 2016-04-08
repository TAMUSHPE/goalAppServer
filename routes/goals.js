var express = require('express');
var router = express.Router();
var Goal = require('../models/goals/index');

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
        Goal.create(req, function(err, newGoal) {
            if(err) {
                return res.send(500, err);
            }
            return res.json(newGoal);
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

module.exports = router;