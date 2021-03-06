var Instagram = require('instagram-node-lib');
var _ = require('underscore');
var config = require('../config');

function parseInstragram( data ) {
	return _.map( data, function( imgData ) {
		return {
			id          : imgData.id,
			img         : imgData.images.standard_resolution,
			author      : imgData.user.full_name
		};
	});
}

exports.newphoto = require('./newphoto');

exports.index = function( req, res ) {
	Instagram.tags.recent({
		name     : config.hashtag,
		complete : function( r ) {
			var data = parseInstragram( r );
			res.render('index', {
				data: JSON.stringify(data),
				title: config.title
			});
			res.end();
		}
	});
};
