'use strict';
wfms.controller("CreateReportCtrl", function($scope, $rootScope, DataService, $location , $window) {
	
	
	//to fetch guard building schedule
	$scope.getGuardBuilding=function(){
	
		console.log("guard Building");
		var idguard=$window.sessionStorage.idguard;
		var uri = urlConstants.GET_GUARD_BUILDING+idguard;
		DataService.getData(uri,[]).success(function(response){
			angular.toJson(response);
			console.log("in controller"+response.data);
		//	console.log("Guard Info"+response);
			$scope.guardSchedule = response.data;
			$scope.val="Hello";
		}).error(function(err){
			console.log(err.message);
		});
	};
	
	
$scope.publish = function() {
	//console.log("desc"+description);
	/*
	 $scope.template = "templates/guardframe.html";

	$scope.setTemplate = function(tabName){
		$scope.template = "templates/"+tabName + ".html";
	};

	$scope.getTemplate = function(){
		return $scope.template;
		|| $scope.idbuilding=== "" || $scope.alert_date=== "" || $scope.severity=== "" || $scope.timemy=== "--"
	};*/
	if(!($scope.desc || $scope.idbuilding || $scope.alert_date || $scope.severity || $scope.timemy)){
		console.log("Form Invalid-Alert");
		$scope.formError = "Form Invalid !!!";
	}
	else
		{
		console.log("hello from create Alert"+ $scope.idbuilding );
		var params = {
				
				idbuilding : $scope.idbuilding,
				description : $scope.desc,
				idguard : 2,
				status : 'F',
				seenByClient : 'F',
				datemy : $scope.alert_date,
				severity : $scope.severity,
				timemy : $scope.time
			
				
			};
		
		DataService.postData(urlConstants.CREATE_ALERT,params).success(function(response){
			console.log("Alert Info"+response.data);
			$location.path('/guard');
		}).error(function(err){
			console.log(err.message);
		});
		}
	
		
};



});
