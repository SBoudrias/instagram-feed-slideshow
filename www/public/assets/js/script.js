/*global window,jQuery,io,_*/
(function ( window, $, io ) {
	"use strict";

	// Connect server
	/*
	var socket = io.connect('http://127.0.0.1:3000/');
	 */
	var socket = io.connect('http://ressac-slideshow.herokuapp.com/');
	var store  = {
		data : [],
		add: function( model ) {
			if( !model.id ) {
				this.data.push( model );
				return true;
			}

			var s = _.where( this.data, { id: model.id } );
			if( s.length ) { return false; }

			this.data.push( model );
				return true;
		}
	};
	
	// On dom ready
	$(function() {
		
		var $main = $('#main');

		// Render available information
		$.each( window.slideshow, function( i, slide ) {
			store.add( slide );
			var $li = createSlide( slide );
			$main.append( $li );
		});

		// Listen for new images
		socket.on('newphoto', function( slides ) {
			console.log( slides );
			$.each( slides, function( i, slide ) {
				if( store.add( slide ) ) {
					var $li = createSlide( slide );
					$main.append( $li );
				}
			});
		});

		socket.on('debug', function( data ) {
			console.log( JSON.parse(data) );
		});
		
	});

	function createSlide( slide ) {

		var $img = $('<img/>')
			.attr({
				src: slide.img.url,
				width: slide.img.width,
				height: slide.img.height
			});

		var $li = $('<li/>')
			.addClass('slide')
			.append( $img );

		return $li;
	}
	
}( window, jQuery, io ));
