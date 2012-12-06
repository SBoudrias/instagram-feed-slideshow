/*global window,jQuery,io*/
(function ( window, $, io ) {
	"use strict";

	// Connect server
	/*
	var socket = io.connect('http://127.0.0.1:3000/');
	 */
	var socket = io.connect('http://ressac-slideshow.herokuapp.com/');

	socket.on('status', function( data ) {
		alert( data.status );
	});
	
	// On dom ready
	$(function() {
		
		var $main = $('#main');

		// Render available information
		$.each( window.slideshow, function( i, slide ) {
			var $li = createSlide( slide );
			$main.append( $li );
		});

		// Listen for new images
		socket.on('newphoto', function( slide ) {
			var $li = createSlide( slide );
			$main.prepend( $li );
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
