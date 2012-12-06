var config   = require('../config'),
	events   = require('../events'),
	_        = require('underscore');

exports.get = function( req, res ) {
	console.log( arguments );
	res.write( req.query["hub.challenge"] );
	res.end();
};

exports.post = function( req, res ) {
	console.log( arguments );
};
