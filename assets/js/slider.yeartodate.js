function init(){ 
	

}

var slider = { 
	"init": function() {
		var self = this;
		// get today's date
		this.today = new Date(); // looks like: Mon Dec 24 2012 17:58:26 GMT-0800 (PST) 
		// get year from today's date
		this.year = this.today.getFullYear(); // looks like 2012
		// get the day number of the year for todays date
		this.dateAsDayNumber = this.dateToDayNumber(this.today); // looks like 359
		this.$slider = $('#slider input');
		this.$sliderDate = $('#slider .date');
		// setup the slider
		this.initializeSlider(this.year, this.dateAsDayNumber);
		// monitor slider change and update slider date
		this.$slider.change(function() {
			var currentDay = ($(this).val());
			self.updateSliderDate(self.year, currentDay);
		});
	},
	// end init
	
	 "initializeSlider": function(year, dateAsDayNumber) {
		// get the width of the slider input
		var width = this.$slider.width();
		// set the amount to multiply the date display position
		this.multiplier = width / dateAsDayNumber;
		this.newdate = this.getSliderDate(year, dateAsDayNumber);
		// set the number of steps, max and value in slider to today
		this.$slider
					.attr('max', dateAsDayNumber)
					.attr('value', dateAsDayNumber)
					.attr('steps', dateAsDayNumber);
		// set the position of the slider date display
		this.$sliderDate.css("left", dateAsDayNumber * this.multiplier +"px" );
		// update the date display
		this.updateSliderDate(year, dateAsDayNumber); 
	},
		
	"updateSliderDate": function(year, date) {
		var newdate = this.getSliderDate(year, date);
		var day = newdate.getDate();
		var mon = newdate.getMonth();
		var mon = this.monthToString(mon);
		var fyear = newdate.getFullYear();
		var pretty = mon + " " + day + " " + fyear;
		var width = this.$slider.width();
		var multiplier = width / this.dateAsDayNumber;
		this.$sliderDate.html(pretty);
		this.$sliderDate.css("left", date * multiplier +"px" );
	},
	// helper functions
	"getSliderDate": function(year, day) {
		var dfd = this.dateFromDay(year, day); // looks like Mon Dec 24 2012 00:00:00 GMT-0800 (PST) 
		return(dfd);
	},
	// converts day of year (ie 359) to a date
	"dateFromDay": function (year, day) {
		var date = new Date(year, 0); // initialize a date in `year-01-01`
		return new Date(date.setDate(day)); // add the number of days
	},
	
	"monthToString": function(month) {
		var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
		return(monthNames[month]);
	},
	
	// returns date today as a number (ie 359)
	"dateToDayNumber": function (date) {
    	var feb = this.daysInFebruary(date.getFullYear());
    	var aggregateMonths = [0, // January
                           31, // February
                           31 + feb, // March
                           31 + feb + 31, // April
                           31 + feb + 31 + 30, // May
                           31 + feb + 31 + 30 + 31, // June
                           31 + feb + 31 + 30 + 31 + 30, // July
                           31 + feb + 31 + 30 + 31 + 30 + 31, // August
                           31 + feb + 31 + 30 + 31 + 30 + 31 + 31, // September
                           31 + feb + 31 + 30 + 31 + 30 + 31 + 31 + 30, // October
                           31 + feb + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31, // November
                           31 + feb + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30, // December
                         ];
    	return aggregateMonths[date.getMonth()] + date.getDate();
	},
	// works out how many days in Feb for current year
	"daysInFebruary": function (year) {
    	if(year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        	// Leap year
        	return 29;
    	} else {
        	// Not a leap year
        	return 28;
    	}
	}
};