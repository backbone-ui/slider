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

		el : '.ui-slider',

		options: {
			count: 1,
			min: 0,
			max: 0,
			step: 1
		},

		events: {
			"input input" : "updateSliderLabel",
			"change input" : "updateData"
		},

		initialize: function( options ){
			// fallbacks
			options = options || {};
			if( !_.isEmpty(options) ) this.options = _.extend({}, this.options, options);
			// fallback(s)
			this.options.max = this.options.max || (( parseInt(this.options.count)-1) * parseInt(this.options.step) ) + parseInt(this.options.min);
			// get data
			this.data = this._getData();
			// set options
			this.options.count = (this.data instanceof Array) ? this.data.length : this._count( this.data.attributes ); // check if it's a simple array...

			// render straight away if init ends here
			if( !isAPP ) this.render();

			return View.prototype.initialize.call( this, options );
		},

		render: (isAPP) ? View.prototype.render : function(){

			this.postRender();
		},

		postRender: function(){
			$(this.el).addClass("ui-slider");
			//
			this.$slider = $(this.el).find('input');
			this.$sliderLabel = $(this.el).find('label');
			this.timelineWidth = this.$slider.width();
			// update this on window resize
			this.step = this.timelineWidth / (this.options.count-1);

			// set the max, step and value in timeline
			this.$slider
				.attr('value', this.options.min)
				.attr('min', this.options.min)
				.attr('max', this.options.max )
				.attr('step', this.options.step);

			// trigger input once on render
			var self = this;
			setTimeout(function(){
				self.$slider.trigger("input");
			}, 500);
		},

		updateSliderLabel: function( e ) {
			var index = ( $(e.target).val() - this.options.min) / this.options.step; // normalized index
			var label = ( this.data.attributes ) ? this.data.get( index ) : this.data[index];
			this.$sliderLabel.html(label);
			this.$sliderLabel.css("left", (index) * this.step +"px" );
		},

		updateData: function( e ) {
			var val = $(e.target).val(); // actual value
			this.trigger("change", { value: val });
		},

		// Helpers
		// - counts the items in an array or an object
		_count: function( data ) {
			if (typeof data == "object") {
				var count = 0;
				for (var i in data) {
					count++;
				}
				return count;
			} else {
				// assume it's an array?
				return data.length;
			}
		},
		// - look up data from options or create
		_getData: function(){
			if( this.options.data ){
				// easy...
				return this.options.data;
			}
			// otherwise "make up" data based on the options
			var data = [];
			var min = parseInt( this.options.min );
			var max = parseInt( this.options.max );
			var step = parseInt( this.options.step );
			for( var i = min; i < max; i += step ){
				data.push(i);
			}
			// at the end push the max value
			data.push(max);
			return new Backbone.Model( data );
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
