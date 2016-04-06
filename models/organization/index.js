var Organization = require('./organization');
module.exports = {
	create: function (req, cb) {
	    var newOrganization = new Organization();
        newOrganization.name = req.body.name;
        newOrganization.desc = req.body.desc;
        newOrganization.coop = req.body.coop;
        newOrganization.save(function(err, newOrganization) {
            if(err) {
                cb(err);
            }
            cb(null, newOrganization);
        });
	}, //close create
	get: function (id, cb) {
		Organization.findById(id, function(err, organization) {
            if(err) {
                cb(err);
            }
          cb(null, organization);
        });
	},
	all: function (cb) {
		Organization.find(function(err, organizations) {
            if(err) {
                cb(err);
            }
          cb(null, organizations);
        });
	},
	put: function (req, cb) {
		Organization.findById(req.params.id, function(err, organization) {
            if(err) {
                cb(err);
            }
	      	organization.name = req.body.name;
	        organization.desc = req.body.desc;
	        organization.coop = req.body.coop;
            organization.save(function(err, organization) {
                if(err) {
                    cb(err);
                }
                cb(null,organization);
            });
        });
	},
	delete: function (id, cb) {
		  Organization.remove({
            _id: id
        }, function(err) {
            if(err) {
                cb(err);
            }
        });
	}
} 