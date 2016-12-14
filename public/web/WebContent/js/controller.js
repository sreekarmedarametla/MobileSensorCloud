/**
 * 
 */
var SensorRequestApp = angular.module("SensorRequestApp", ["720kb.datepicker"])



SensorRequestApp.$inject = ['$sessionStorage'];
//function SensorRequestApp($sessionStorage) {
//sessionStorage.setItem('userid','123456')
	 var userid = sessionStorage.getItem("useridvalue");
	 console.log(userid)
    
//}


 
SensorRequestApp.controller('RequestController',function($scope,$http) {
	
$scope.requestdata = {
		numberofsensors:'',
		location:'',
		date:''
		};
	
	$scope.select = {isselected: false};
	
	$scope.locationnames=[];
    $scope.selectedItem;
    $scope.dropboxitemselected = function (item) {
 
        $scope.selectedItem = item;
        alert($scope.selectedItem);
    }
 
    
   
$scope.choices = [{id: 'choice1','Userid':userid}];

$scope.addNewChoice = function() {
  var newItemNo = $scope.choices.length+1;
  $scope.choices.push({'id':'choice'+newItemNo}
  );
};
  
$scope.removeChoice = function() {
  var lastItem = $scope.choices.length-1;
  $scope.choices.splice(lastItem);
};
	

	$scope.Add=function(requestdata)
	{
		 
				
   
	$http ({
        method: 'POST',
        url: Constants.getInstance().hostname + "/MobileSensorCloud/computeapi/SensorRequestService/submitsensorrequest",
        data: JSON.stringify($scope.choices),
        contentType: "application/json",
        dataType: "json"
    });
	alert("Your sensor has been allocated successfully");
			window.location="ViewSensorAllocation.html"
	}
	
	
	
	$http.get (
			Constants.getInstance().hostname + "/MobileSensorCloud/computeapi/ControlDropDownService/contollerdropdownlist/"
        ).success(function(response) 

        	    {

        	   	   $scope.locationnames=response;
                    console.log($scope.locationnames);
        	    });

	
	
	
	
	

});
/*SensorRequest.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'InstanceController'
        })
        .when('/viewStudents', {
            templateUrl: 'viewStudents.html',
            controller: 'InstanceController'
        })
        .when('/instances/:id',
        		{
        	     templateUrl:'instancedetail.html',
        	     controller:'InstanceController1'
        		}
        		
        )
        .otherwise({
            redirectTo: '/home'
        });
});*/
