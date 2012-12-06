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
			$.each( slides, function( i, slide ) {
				if( store.add( slide ) ) {
					var $li = createSlide( slide );
					var $active = $main.find('.js-active');

					if( $active.length ) {
						$active.after( $li );
					} else {
						$main.append( $li );
					}
				}
			});
		});

		launchSlider();

		function launchSlider() {
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

			$next.animate({ opacity: 1 }, 1000, function() {
				$active.removeClass('js-active').css("opacity", 1);
				$next.removeClass('js-next-active').addClass('js-active');
			});

			setTimeout( launchSlider, 5000 );

		}
		
	});

	function createSlide( slide ) {

		var $li = $('<li/>')
			.addClass('slide')
			.css("background-image", "url("+ slide.img.url +")");

		return $li;
	}


	
}( window, jQuery, io ));
