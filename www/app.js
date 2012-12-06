/**
 * Module dependencies.
 */

var express  = require('express'),
	routes   = require('./routes'),
	config   = require('./config'),
	http     = require('http'),
	path     = require('path'),
	Instagram = require('instagram-node-lib'),
	io        = require('socket.io');


// ---
// Setup Instagram

Instagram.set( 'client_id', config.instagram.id );
Instagram.set( 'client_secret', config.instagram.secret );


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

app.get('/newphoto', routes.auth.get);
app.post('/newphoto', routes.newphoto.post);

app.get('/', routes.index);


// ---
// Launch server

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});


// ---
// Sockets

io.listen( server ).sockets.on('connection', function( socket ) {
	setTimeout(function() {
		socket.emit('newphoto', {
			"img":{
				"url":"http://distilleryimage7.s3.amazonaws.com/b97986ac3fb711e2890a22000a1fbc9a_7.jpg",
				"width":612,
				"height":612
			},
			"description":"La pompe #bonparty",
			"author":"Ressac"
		});
	}, 3000);
});


// ---
// Subscribe to instagram

Instagram.tags.subscribe({ object_id: 'bonparty' });
