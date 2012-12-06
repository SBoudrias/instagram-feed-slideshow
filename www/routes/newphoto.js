var config   = require('../config'),
	events   = require('../events'),
	_        = require('underscore'),
	Instagram = require('instagram-node-lib'),
	ev       = require('../utils/events');

exports.get = function( req, res ) {

	Instagram.subscriptions.handshake( req, res );

};
