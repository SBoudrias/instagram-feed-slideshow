var config     = require('../config'),
	Instagram  = require('instagram-node-lib'),
	_          = require('underscore'),
	config     = require('../config');

exports.newphoto = require('./newphoto');


exports.index = function( req, res ) {
	Instagram.tags.recent({
		name     : config.hashtag,
		complete : function( r ) {
			var data = parseInstragram( r );
			res.render('index', { data: JSON.stringify(data) });
			res.end();
		}
	});
};

function parseInstragram( data ) {
	return _.map( data, function( imgData ) {
		return {
			id          : imgData.id,
			img         : imgData.images.standard_resolution,
			author      : imgData.user.full_name
		};
	});
}
