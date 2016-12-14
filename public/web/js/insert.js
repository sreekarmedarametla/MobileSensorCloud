var geocoder;
var map;
var maplocations;
$(document).ready(function() {
	
	getSensorLocations();
	initialize();
	
	var $post_new_sensor = $('#new_sensor_form');
	
	$('#submit_new_sensor').click(function(e) {
		e.preventDefault();
		
		var jsObj = $post_new_sensor.serializeObject()
			, ajaxObj = {};
		
		ajaxObj = {  
			type: "POST",
			url: Constants.getInstance().hostname + "/MobileSensorCloud/computeapi/sensormanagement/addNewSensor", 
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

function getSensorLocations(){
	ajaxObj = {
			type : "GET",
			url : Constants.getInstance().hostname + "/MobileSensorCloud/computeapi/sensormanagement/getControllerLocations",
			contentType : "application/json",
			error : function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
			},
			success : function(data) {
				console.log(data.locationData);
				var locations = data.locationData;
				var selectlocations = document.getElementById('sensor_location');
				for(var i = 0; i < locations.length; i++) {
				    var opt = document.createElement('option');
				    opt.innerHTML = locations[i].location;
				    opt.value = locations[i].location;
				    selectlocations.appendChild(opt);
				    var lat = locations[i].x;
				    var lng = locations[i].y;
				    marker = new google.maps.Marker({
				        position: new google.maps.LatLng(lat, lng),
				        map: map,
				        title: locations[i].location
				      });
				}
			},
			complete : function(XMLHttpRequest) {
				// console.log( XMLHttpRequest.getAllResponseHeaders() );
			},
			dataType : "json" // request JSON
		};

		return $.ajax(ajaxObj);
	
}
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

