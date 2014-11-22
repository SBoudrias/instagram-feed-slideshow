var config = require('../config');
var Instagram = require('instagram-node-lib');

exports.get = function( req, res ) {
	Instagram.subscriptions.handshake( req, res );
};
