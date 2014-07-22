/*
 * Backbone UI: Slider
 * Source: https://github.com/backbone-ui/slider
 * Copyright © Makesites.org
 *
 * Initiated by Lyndel Thomas (@ryndel)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function(window, $, _, Backbone, APP) {

	// support for Backbone APP() view if available...
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.View : Backbone.View;


	var Slider = View.extend({

		events: {
			"input input" : "updateSliderLabel"
		},

		initialize: function( options ){
			var self = this;
			this.data = ( options.data ) ? options.data : [];
			//
			this.$slider = $(this.el).find('input');
			this.$sliderLabel = $(this.el).find('.date');
			this.dataCount = this.data.length;
			this.timelineWidth = this.$slider.width();
			this.step =  this.timelineWidth / (this.dataCount-1);

			// set the  max and value in timeline
			this.$slider
				.attr('value', 1)
				.attr('max', this.dataCount);

			// trigger input once on init
			setTimeout(function(){
				self.$slider.trigger("input");
			}, 500);
		},

		updateSliderLabel: function( e ) {
			var val = $(e.target).val();
			this.$sliderLabel.html(this.data[val-1]);
			this.$sliderLabel.css("left", (val-1) * this.step +"px" );
		}
	});


	// Support module loaders
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = Slider;
	} else {
		// Register as a named AMD module, used in Require.js
		if ( typeof define === "function" && define.amd ) {
			//define("backbone.ui.slider", ['jquery''underscore', 'backbone'], function(){ return Slider; });
		}
	}
	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
		// update APP namespace
		if( isAPP ){
			APP.UI = APP.UI || {};
			APP.UI.Slider = Slider;
			// save namespace
			window.APP = APP;
		}
		// update Backbone namespace regardless
		Backbone.UI = Backbone.UI || {};
		Backbone.UI.Slider = Slider;
		window.Backbone = Backbone;
	}



})(this.window, this.$, this._, this.Backbone, this.APP);
