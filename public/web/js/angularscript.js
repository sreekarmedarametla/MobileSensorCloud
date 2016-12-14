var index = angular.module('index', ['ngRoute']);
/**
 * provides page routing
 */
index.config(function($routeProvider) {
        $routeProvider
        	.when('/', {
        		templateUrl: 'LandingPage.html',
        		controller : 'mainController'
        	})
            // route for the home page
            .when('/combined', {
                templateUrl : '/dashboard.html',
                controller  : 'combinedController'
            })


    });

    // create the controller and inject Angular's $scope
	index.controller('mainController', function($scope, $http){
		 console.log("reached");
		$(document).ready(function(){
		    $('.art.show').css('height',$(window).height()+'px');
		  });
		$scope.$on('$viewContentLoaded', function() {
			 $.each($('.nav').find('li'), function() {
                 $(this).toggleClass('active',
                     $(this).find('a').attr('href') == "#" + window.location.href.split("/").pop());
             });
    	});
	})
    index.controller('combinedController', function($scope, $http) {
    	var x = "";
    	var y = "";
    	var z = "";
    	function updateData() {
    		 x = document.getElementById("realm").value;
    		 y = document.getElementById("start").value;
    		 z = document.getElementById("end").value;
    	}
    	$("#submitbtn").unbind().on("click", function() {
    		updateData();
    		homecontent(x,y,z);
    	  });
    	$scope.$on('$viewContentLoaded', function() {
    		updateData();
    		homecontent(x, y, z);
    	});    	
    });

