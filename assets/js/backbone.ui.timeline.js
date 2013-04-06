Backbone.UI = {};

Backbone.UI.Timeline = Backbone.View.extend({
	
	initialize: function( options ){
		var self = this;
		this.data = ( options.data ) ? options.data : [];
		// 
		this.$timeline = $(this.el).find('input');
		this.$timelineDate = $(this.el).find('.date');
		this.dataCount = this.data.length;
		this.timelineWidth = this.$timeline.width();
		this.step =  this.timelineWidth / (this.dataCount-1);
			
		// set the  max and value in timeline
		this.$timeline
			.attr('value', 1)
			.attr('max', this.dataCount);
			
		setTimeout(function(){
			self.$timeline.trigger("change");
		}, 500);
	},
	
	events: {
		"change input" : "updateTimelineDate"
	},
	
	updateTimelineDate: function( e ) {
		var val = $(e.target).val();
		this.$timelineDate.html(this.data[val-1]);
		this.$timelineDate.css("left", (val-1) * this.step +"px" );
	}
});