 /**************************/
/*** parallax ************/
/*** by Ron Marcelle ******/
/*** Licensed under MIT ***/
/**************************/
(function( window, $ ){
	"use strict";

	var name = 'parallax',
		$window = $(window),
		methods = {
			destroy: function() { 
				$window.off('scroll resize', function() { move($this); });
			},
			enable: function() {
				$window.on('scroll resize', function() { move($this); });
			},
		},
		getPos = function(adjuster, inertia){ return (-(adjuster - $window.scrollTop() ) * inertia) + "px"; },
	    xValue = function(adjuster, inertia){
	    	var horz = $.fn.parallax.settings.horz,
	    		horzFixed = ( typeof horz.fixed !== false || typeof horz.fixed !== "undefined" ? horz.fixed : false );
	    	if ( horzFixed ) { return horzFixed; }
	    	else {
	    		var o =  $(this).offset() && typeof $(this).offset().left ? $(this).offset().left : 0;	    	
		    	if ( o ) { return (-( o - $window.scrollLeft() ) * horz.inertia) + "px"; }
	    	}
	    },
	    yValue = function(adjuster, inertia){
	    	var vert = $.fn.parallax.settings.vert,
	    		vertFixed = ( typeof vert.fixed !== false || typeof vert.fixed !== "undefined" ? vert.fixed : false );
	    	if ( vertFixed ) { return vertFixed; }
	    	else {
	    		var o =  $(this).offset() && typeof $(this).offset().top ? $(this).offset().top : 0;
		    	if ( o ) { return (-( o - $window.scrollTop() ) * vert.inertia) + "px"; }
	    	}
	    },
	    init = function( options ) {
	    	var $this = $(this);
	    	$.fn.parallax.settings = $.extend( $.fn.parallax.settings, options );
	    	$window.on('scroll resize', function() { move.apply( $this ); });
	    },
	    move = function() {
	    	var $this = $(this);
	    	$this.css({'backgroundPosition': xValue.apply( $this ) + " " + yValue.apply( $this ) });
	    };    
		
	
	$.fn.parallax = (function( method ){
		 if ( typeof method === 'object' || ! method ) {
	      return init.apply( this, arguments );
	    } else if ( methods[method] ) {
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on Parallax' );
	    }   
	});
	
	
	$.fn.parallax.settings = { horz: { inertia: .2, fixed: "50%" }, vert: { inertia: .2, fixed: false } };

	
})( window, jQuery );
