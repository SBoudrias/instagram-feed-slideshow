var config   = require('../config'),
	events   = require('../events'),
	_        = require('underscore'),
	ev       = require('../utils/events');

exports.get = function( req, res ) {
	console.log( arguments );
	res.write( req.query["hub.challenge"] );
	res.end();
};
