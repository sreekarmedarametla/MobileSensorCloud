$(document).ready(function() {
	initialize();
	google.maps.event.addListener(map, "click", function (e) {

	    //lat and lng is available in e object
	    var latLng = e.latLng;
	    console.log(latLng.lat());
	    console.log(latLng.lng());
	    document.getElementById("controllerLat").value =latLng.lat() ;
	    document.getElementById("controllerLng").value =latLng.lng() ;

	});
	var $post_new_sensor = $('#new_controller_form');
	
	$('#submit_new_controller').click(function(e) {
		e.preventDefault();
		
		var jsObj = $post_new_sensor.serializeObject()
			, ajaxObj = {};
		
		ajaxObj = {  
			type: "POST",
			url: Constants.getInstance().hostname + "/MobileSensorCloud/computeapi/sensormanagement/addNewController", 
			data: JSON.stringify(jsObj), 
			contentType:"application/json",
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
			},
			success: function(data) { 
				console.log(data[0].responseData);
					$('#div_ajaxResponse').text(data[0].responseData);
				
			},
			complete: function(XMLHttpRequest) {
			}, 
			dataType: "json"
		};
		
		$.ajax(ajaxObj);
	});

});

function initialize() {
	  geocoder = new google.maps.Geocoder();
	  var latlng = new google.maps.LatLng(37.33474664945566, -121.8819808959961);
	  var mapOptions = {
	    zoom: 14,
	    center: latlng,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  }
	  map = new google.maps.Map(document.getElementById('mymap'), mapOptions);
	}