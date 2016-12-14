$(document).ready(function() {
	
	getSensorNetwork();
});

function getSensorNetwork()
{
    var table = document.getElementById("sensor_data");
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
				            		innertd3.innerHTML = '<button type="button" class="btn btn-primary" onClick="gotoNode(\'' + sensorArray[i].sensorID + ","+sensorArray[i].location+'\')">Get Data</button>';
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
	var no2 = document.getElementById("no2");
	var co = document.getElementById("co");
	var temp = document.getElementById("temp");
	var humidity = document.getElementById("humidity");
	ajaxObj = {  
			type: "POST",
			url: Constants.getInstance().hostname + "/MobileSensorCloud/computeapi/sensormanagement/pullSensorData", 
			data: jsondata, 
			contentType:"application/json",
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Error " + jqXHR.getAllResponseHeaders() + " " + errorThrown);
			},
			success: function(data) { 
				data1 = JSON.parse(data);
				console.log(data1.no2);
				var no2percent = (data1.no2/500)*100;
				document.getElementById("no2").style.width=no2percent +"%";
				document.getElementById("no2").innerHTML ="NO"+"<sub>2</sub> --> "+ data1.no2 +"μg/m" + "<sup>3</sup>";
				var progressbarclass = getprogressclass(no2percent);
				document.getElementById("no2").className = progressbarclass;
				
				var copercent = (data1.co/40)*100;
				document.getElementById("co").style.width=copercent +"%";
				document.getElementById("co").innerHTML ="CO --> "+ data1.co +"μg/m" + "<sup>3</sup>";
				var progressbarclass = getprogressclass(copercent);
				document.getElementById("co").className = progressbarclass;
				
				var temppercent = ((data1.temperature+10)/100)*100;
				document.getElementById("temp").style.width=temppercent +"%";
				document.getElementById("temp").innerHTML ="Temperature --> "+data1.temperature + "&#8451";
				var humidpercent = data1.humidity;
				document.getElementById("humidity").style.width=humidpercent +"%";
				document.getElementById("humidity").innerHTML ="Humidity --> "+data1.humidity + "%"
				//console.log(progressbarclass);
				//no2.width((data.no2/500)*100);
				//location.reload();
			},
			complete: function(XMLHttpRequest) {
			}, 
			dataType: "text"
		};
		
		$.ajax(ajaxObj);
	
}

function getprogressclass(percentage)
{
	if(percentage > 80)
		{
		 return "progress-bar progress-bar-danger progress-bar-striped";
		}
	else if(percentage > 50){
		return "progress-bar progress-bar-warning progress-bar-striped";
	}
	else
		{
		return "progress-bar progress-bar-success progress-bar-striped";
		}
	}