var config     = require('../config'),
	events     = require('../events'),
	Instagram  = require('instagram-node-lib'),
	_          = require('underscore');

exports.newphoto = require('./newphoto');


exports.index = function( req, res ) {
	Instagram.tags.recent({
		name     : 'bonparty',
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
			description : imgData.caption.text,
			author      : imgData.user.full_name
		};
	});
}
