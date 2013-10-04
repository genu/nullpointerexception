$.fn.toggleClick = function(){

	var functions = arguments ;

	return this.click(function(){
		var iteration = $(this).data('iteration') || 0;
		functions[iteration].apply(this, arguments);
		iteration = (iteration + 1) % functions.length ;
		$(this).data('iteration', iteration);
	});
};

$(document).ready(function(){
	var timer_active = false;

	var timer_update = function() {
		if(timer_active == false)
			return;

		var timer = $('.dash-time');

		var time_parse = Date.parse(timer.html()).addSeconds(1);

		timer.html(time_parse.toString("hh:mm:ss"));
		setTimeout(timer_update, 1000);

		
	}
	$('.starter').toggleClick(
		function() {
			var now = new Date().toString("HH:mm");
			if($('#start').val() == "")
				$('#start').val(now);

			timer_active = true;

			$(this).html('Pause');
			//Update
			setTimeout(timer_update, 1000);
		},
		function() {
			$(this).html('Start');
			timer_active = false;
		}
	)
	// Show loging screen if necessary
	if(!$.jStorage.get('auth')) {
			$('#myModal').modal('show');

	}

	// Dashboard actions
	$('#ribbon-today').toggleClick(
		function() {
			$('#today-bubble').show();
			var lastTime = $(document).data("lastTimeObject");
			if (typeof lastTime === "undefined") {
				
			}
			else {
				Parse.initialize("0KNVOKg5KNqqDZgXYfDTNd4ZQWvkoXd70HyWqYFF", "AZAjLdDa6B7vYjwKmOaPYFHt05yckFwXo0fAHN9C");
				var DailyTimes = Parse.Object.extend("DailyTimes");
				var dailyTimes = new DailyTimes();
				var query = new Parse.Query(DailyTimes);
				query.get(lastTime, {
					success: function(object) {}
					},
					{error: function(object, error) {}
				});
				//Lookup is functional, but retrieving the data from the object returned is broken.				
				//$('#startDateBox').val(dailyTimes.get("LunchStartDate"));
				//$('#lunchBeginDateBox').val(dailyTimes.get("LunchStartDate"));
				//$('#lunchEndDateBox').val(dailyTimes.get("LunchEndDate"));
				//$('#endDateBox').val(dailyTimes.get("EndDate"));
			}
		},
		function() {
			$('#today-bubble').hide();
		}
		);

var DatepickerDemoCtrl = function ($scope, $timeout) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.showWeeks = true;
  $scope.toggleWeeks = function () {
    $scope.showWeeks = ! $scope.showWeeks;
  };

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = ( $scope.minDate ) ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function() {
    $timeout(function() {
      $scope.opened = true;
    });
  };

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };
};
	$( "#Save" ).click(function() { 

		var dateSelected = $( "#timeDateBox" ).val();
		$( "#ForecastDate" ).html( dateSelected );

		// $( "#ForecastDate" ).add( "<span>Again</span>" ).appendTo($( "#ForecastDate" ));

	});

})
