// Backbone.js Slider extension
//
// Created by: Lyndel Thomas (@ryndel)
// Source: https://github.com/backbone-ui/timeline
//
// Licensed under the MIT license: 
// http://makesites.org/licenses/MIT

(function(_, Backbone) {
	
	// fallbacks
	if( _.isUndefined( Backbone.UI ) ) Backbone.UI = {};
	
	Backbone.UI.Slider = Backbone.View.extend({
		
		initialize: function( options ){
			var self = this;
			this.data = ( options.data ) ? options.data : [];
			// 
			this.$slider = $(this.el).find('input');
			this.$sliderDate = $(this.el).find('.date');
			this.dataCount = this.data.length;
			this.timelineWidth = this.$slider.width();
			this.step =  this.timelineWidth / (this.dataCount-1);
				
			// set the  max and value in timeline
			this.$slider
				.attr('value', 1)
				.attr('max', this.dataCount);
				
			setTimeout(function(){
				self.$slider.trigger("change");
			}, 500);
		},
		
		events: {
			"change input" : "updateSliderDate"
		},
		
		updateSliderDate: function( e ) {
			var val = $(e.target).val();
			this.$sliderDate.html(this.data[val-1]);
			this.$sliderDate.css("left", (val-1) * this.step +"px" );
		}
	});


})(this._, this.Backbone);
