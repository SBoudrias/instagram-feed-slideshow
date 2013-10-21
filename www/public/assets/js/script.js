/*global window,jQuery,io,_*/
(function ( window, $, io ) {
	"use strict";

	// Connect server
	var socket = io.connect("http://cossette-halloween.herokuapp.com/");

	$(function() {
		
		var $main = $('#main');

		// Render available information on start
		$main.append( _.map(window.slideshow, createSlide) );

		// Listen for new images
		socket.on('newphoto', function( slides ) {
			console.log("photo");
		// 	_.each( slides, function( slide ) {
		// 		var $slides = $main.find('.slide');

		// 		// Prevent duplicate
		// 		if ( $slides.find('[data-id='+ slide.id +']').length ) return;

		// 		var $li = createSlide( slide );
		// 		var $lastInQueue = $slides.not('.shown');
		// 		var $active = $slides.filter('.js-active');

		// 		// Add to the optimal place in queue
		// 		if( $lastInQueue.length ) {
		// 			$lastInQueue.after( $li );
		// 		} else if( $active.length ) {
		// 			$active.after( $li );
		// 		} else {
		// 			$main.append( $li );
		// 		}

		// 		// Remove extra DOM elements
		// 		if ( $slides.length > 50 ) {
		// 			var rest = $slides.length - 50;
		// 			var shown = $slides.filter('.shown').not(".js-active");

		// 			shown.slice(0, rest).remove();

		// 			if (shown.length < rest) {
		// 				rest = rest - shown.length;
		// 				$slides.slice(0, rest).remove();
		// 			}
		// 		}
		// 	});
		});

		(function launchSlider() {
			var $active = $main.find('.js-active'),
				$next;

			if ( !$active.length ) {
				$active = $main.find('.slide').last().addClass('js-active');
			}

			$next = $active.next('.slide');

			if ( !$next.length ) {
				$next = $main.find('.slide').first();
			}

			$next.addClass('js-next-active');

			setTimeout(function() {
				$active.removeClass('js-active');
				$next.removeClass('js-next-active').addClass('js-active').addClass('shown');
			}, 0);

			setTimeout( launchSlider, 5000 );
		}());
		
	});

	// Create a DOM slide element
	function createSlide( slide ) {
		return $('<li/>')
			.addClass('slide')
			.data( 'id', slide.id )
			.css( "background-image", "url("+ slide.img.url +")" );
	}


	
}( window, jQuery, io ));
