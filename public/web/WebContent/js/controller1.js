var InstanceApp = angular.module("InstanceApp", ["ngRoute"]);
 
InstanceApp.config(function($routeProvider) {
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
        .when('/sensordetail/:id',
        		{
        		templateUrl: 'SensorInfo.html',
        		controller:'SensorConfigController'
        		
        		}	
        		
        )
        .otherwise({
            redirectTo: '/home'
        })
});
 
InstanceApp.controller('InstanceController', function($scope,$http) {
   
    $http.get(Constants.getInstance().hostname + "/MobileSensorCloud/computeapi/SensorService/sensorinfo")

    .success(function(response) 

    {

   	   $scope.array=response;

    });

       

$scope.searchFilter = function (instance) 
{

        var keyword = new RegExp($scope.namefilter, 'i');

        return !$scope.nameFilter || keyword.test(instance.Instanceid);

       

}

    $scope.message = "Click on the hyper link to view the Virtual Instance list.";
});
InstanceApp.filter('encodeURIComponent', function() {

    return window.encodeURIComponent;

});

InstanceApp.controller('InstanceController1',function($scope,$routeParams,$http)

		{

		     $scope.id=decodeURIComponent($routeParams.id);
		     $scope.array=[];
		     $scope.id2;
 

		   $http({
		        url: Constants.getInstance().hostname +"/MobileSensorCloud/computeapi/InstanceDetailService/"+$scope.id, 
		        method: "GET"
		        
		     })
		     .success(function(response)
		    		 {
		 		    	$scope.array=response;

		 		    });
		  
		    }


		);


InstanceApp.controller("SensorConfigController", function ($scope) {
	
	});
		    
		    
		    
		    
		    