var geocoder;
var map;
var maplocations;
$(document).ready(function() {
	
	getSensorNetwork();
	initialize();
	getSensorLocations();	
});

function getSensorNetwork()
{
    var table = document.getElementById("sensor_network");
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    
    ajaxObj = {
			type : "GET",
			url : Constants.getInstance().hostname + "/MobileSensorCloud/computeapi/sensormanagement/getSensorNetwork",
			contentType : "application/json",
			error : function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
			},
			success : function(data) {
				console.log(data);
				console.log(data.controllerList);
				for(var obj in data){
				    if(data.hasOwnProperty(obj)){
				    	for(var prop in data[obj]){
				            if(data[obj].hasOwnProperty(prop)){
				            	//console.log(prop + ':' + data[obj][prop]);
				            	var tr = document.createElement('TR');
				            	var controller = data[obj][prop];
				            	//console.log(controller.location);
				            	var td1 = document.createElement('TD');
				            	td1.appendChild(document.createTextNode(controller.location));
				            	console.log(controller.sensorArray);
				            	var sensorArray = controller.sensorArray;
				            	tr.appendChild(td1);
				            	var td2 = document.createElement('TD');
				            	if(sensorArray.length > 0)
				            		{
				            	var innertable = document.createElement('TABLE');
				            	innertable.className = "table table-striped";
			            		var innertableBody = document.createElement('TBODY');
			            		var innertableheader = document.createElement('THEAD');
			            		var innerhtr = document.createElement('TR');
			            		var innerth1 = document.createElement('TH');
			            		innerth1.appendChild(document.createTextNode('Sensor ID'));
			            		innerhtr.appendChild(innerth1);
			            		var innerth2 = document.createElement('TH');
			            		innerth2.appendChild(document.createTextNode('Sensor Status'));
			            		innerhtr.appendChild(innerth2);
			            		innertableheader.appendChild(innerhtr);
			            		innertable.appendChild(innertableheader);
				            	for(var i =0;i<sensorArray.length;i++){
				            		console.log(sensorArray[i].sensorState);
				            		var innertr = document.createElement('TR');
				            		var innertd1 =  document.createElement('TD');
				            		innertd1.appendChild(document.createTextNode(sensorArray[i].sensorID));
				            		innertr.appendChild(innertd1);
				            		innertableBody.appendChild(innertr);
				            		
				            		var innertd2 =  document.createElement('TD');
				            		if(sensorArray[i].sensorState == 0){
				            			innertd2.innerHTML = '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true" style="color:red"></span>';
				            			}
				            		else{
				            			innertd2.innerHTML = '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true" style="color:green"></span>';

				            		}
				            		
				            		innertr.appendChild(innertd2);
				            		
				            		var innertd3 =  document.createElement('TD');
				            		innertd3.innerHTML = '<button type="button" class="btn btn-primary" onClick="gotoNode(\'' + sensorArray[i].sensorID + ","+sensorArray[i].location+'\')">Toggle State</button>';
				            		innertr.appendChild(innertd3);
				            		innertableBody.appendChild(innertr);
				            		
				            	}
				            	
				            	innertable.appendChild(innertableBody);
				            	td2.appendChild(innertable);
				            		}
				            	else{
				            		td2.appendChild(document.createTextNode('No Sensors'));
				            	}
				            	tr.appendChild(td2);
				            	
				            	var td3 = document.createElement('TD');
				            	td3.innerHTML = '<span class="glyphicon glyphicon-ok" aria-hidden="true" style="color:green"></span>';
				            	tr.appendChild(td3);
				            					      
				            	
				            	tableBody.appendChild(tr);
				            	
				            }
				    	}
				    }
				}

			},
			complete : function(XMLHttpRequest) {
				// console.log( XMLHttpRequest.getAllResponseHeaders() );
			},
			dataType : "json" // request JSON
		};

		return $.ajax(ajaxObj);
	
	}

function gotoNode(input){
	var sensorData = input.split(",");
	var jsondata = '{"sensorID":'+sensorData[0]+',"location":\"'+sensorData[1]+'\"}';
	ajaxObj = {  
			type: "POST",
			url: Constants.getInstance().hostname + "/MobileSensorCloud/computeapi/sensormanagement/toggleSensor", 
			data: jsondata, 
			contentType:"application/json",
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
			},
			success: function(data) { 
				console.log(data);
				alert(data);	
				location.reload();
			},
			complete: function(XMLHttpRequest) {
			}, 
			dataType: "text"
		};
		
		$.ajax(ajaxObj);
	
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
				    //var opt = document.createElement('option');
				    //opt.innerHTML = locations[i].location;
				    //opt.value = locations[i].location;
				    //selectlocations.appendChild(opt);
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