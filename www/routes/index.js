var config     = require('../config'),
	events     = require('../events'),
	Instagram  = require('instagram-node-lib'),
	_          = require('underscore'),
	config     = require('../config');

exports.newphoto = require('./newphoto');


exports.index = function( req, res ) {
	Instagram.tags.recent({
		name     : config.hashtag,
		complete : function( r ) {
			var data = parseInstragram( r );
			console.log( config.hashtag, data );
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
			description : imgData.caption.text,
			author      : imgData.user.full_name
		};
	});
}
