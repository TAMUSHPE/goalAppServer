var express = require('express');
var router = express.Router();
var Organization = require('../models/organization/index');

router.route('/organizations')
    .get(function(req, res) {
        Organization.all(function(err, data) {
            if(err) {
                return res.send(500, err);
            }
            return res.send(data);
        });
    })
    .post(function(req, res) {
        Organization.create(req, function(err, newOrganization) {
            if(err) {
                return res.send(500, err);
            }
            return res.json(newOrganization);
        });
    });
router.route('/organizations/:id')
    .put(function(req, res) {
        Organization.put(req, function(err, organization) {
            if(err) {
                res.send(err);
            }
            res.json(organization);
        });
    })
    .get(function(req, res) {
        Organization.get(req.params.id, function(err, organization) {
            if(err) {
                res.send(err);
            }
       		res.json(organization);
        });
    })
    .delete(function(req, res) {
        Organization.delete(req.params.id, function(err) {
            if(err) {
                res.send(err);
            }
            res.json('Deleted!');
        });
    });

module.exports = router;
