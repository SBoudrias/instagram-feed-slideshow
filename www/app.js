/**
 * Module dependencies.
 */

var express  = require('express'),
	routes   = require('./routes'),
	config   = require('./config'),
	http     = require('http'),
	path     = require('path'),
	Instagram = require('instagram-node-lib'),
	io        = require('socket.io'),
	_         = require('underscore'),

	EventEmitter = require('events').EventEmitter;

var ev = new EventEmitter();


// ---
// Setup Instagram

Instagram.set( 'client_id', config.instagram.id );
Instagram.set( 'client_secret', config.instagram.secret );
Instagram.set( 'callback_url', 'http://ressac-slideshow.herokuapp.com/newphoto' );


// ---
// Setup Express

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'hjs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});


// ---
// Request Handlers

app.get('/newphoto', routes.newphoto.get);
app.post('/newphoto', function( req, res ) {
	ev.emit( 'newphoto', parseInstragram( req ) );

	res.end();
});

app.get('/', routes.index);


// ---
// Launch server

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});


// ---
// Sockets

var ioServer = io.listen( server );

ioServer.sockets.on('connection', function( socket ) {
	// setTimeout(function() {
	// 	socket.emit('newphoto', {
	// 		"img":{
	// 			"url":"http://distilleryimage7.s3.amazonaws.com/b97986ac3fb711e2890a22000a1fbc9a_7.jpg",
	// 			"width":612,
	// 			"height":612
	// 		},
	// 		"description":"La pompe #bonparty",
	// 		"author":"Ressac"
	// 	});
	// }, 3000);

	ev.on('newphoto', function( photo ) {
		socket.emit('newphoto', photo);
	});
});

ioServer.set("transports", ["xhr-polling"]);
ioServer.set("polling duration", 10);


// ---
// Subscribe to instagram

Instagram.tags.subscribe({ object_id: 'bonparty' });


// ---
// Helper functions

function parseInstragram( data ) {
	return _.map( data, function( imgData ) {
		return {
			img         : imgData.images.standard_resolution,
			description : imgData.caption.text,
			author      : imgData.user.full_name
		};
	});
}
