var Organization = require('./organization');
var Helper = require('../../lib/incomingFilterData');
var underscore = require("underscore");
var async = require("async");
var fields = ["name","desc","private","admins","members","hash"];
var HASH_KEY_LENGTH = 10;

/**
 * get_hash returns a random hash length of ten
 * @return {[string]}hash [random hash of length ten]
 */
function get_hash () {
	var possibleString ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	return underscore.sample(possibleString,HASH_KEY_LENGTH).join("");
}
/**
 * add_hash function generates a unique hash_key and returns it
 * @param {Function} cb      [callback function]
 * @return {stiring}hash_key [hash key]
 */
function add_hash(cb){
	var unique = false;
	var hash_key;
	//keep generating hash keys till one is unique
	async.doUntil(function(callback) {
		//generate hash_key
		hash_key =get_hash();
		//check if its found in db
		Organization.findOne({hash_key},function(err,organization){
			if(err)  {
				unique = false;
				return callback(null,hash_key)
			};
			if(organization == null) {
				unique = true;
				return callback(null,hash_key);
			}
			else {
				unique = false;
				return callback(null,hash_key);
			}
		}); 
	}, function () {
		//test
		if (unique) {
			return true
		} 
		else
		{
			return false;
		}
		
	},
	function (err, hash) {
		return cb(hash);
	});
}

module.exports = {
	create: function (req, cb) {
	    var newOrganization = new Organization();
        Helper.retrieveFields(fields,newOrganization,req.body);
        async.waterfall([function (callback) {
			add_hash(function(hash){
				newOrganization.hash_key = hash;
				callback(null,newOrganization)
			});
			
		}, function (newOrganization,callback) {
			
			newOrganization.save(function(err, organization) {
				if(err){
					callback(err);
				}
				callback(null, organization);
			});	
		}],function (err,organization) {
			if (err) {
				cb(err);
			}
			return cb(null,organization);
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
	    Helper.retrieveFields(fields,organization,req.body);
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
