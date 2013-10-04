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
		},
		function() {
			$('#today-bubble').hide();
		}
		);

	$( "#Save" ).click(function() { 

		var dateSelected = $( "#timeDateBox" ).val();
		$( "#ForecastDate" ).html( dateSelected );

		// $( "#ForecastDate" ).add( "<span>Again</span>" ).appendTo($( "#ForecastDate" ));

	});

})
