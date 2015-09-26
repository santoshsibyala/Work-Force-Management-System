'use strict';
wfms.controller("GuardController", function($scope,$modal, $rootScope,
		$location, $window, DataService) {
    console.log("inside GC");
	//$scope.template = "templates/guardframe.html";
	$scope.template = "templates/guard/guardframe.html";

	$scope.setTemplate = function(tabName){
		$scope.template = "templates/"+tabName + ".html";
	};

	$scope.getTemplate = function(){
		return $scope.template;
	};
	
$scope.getAllData = function() {
		
		getGuardDetails();
		
		/**
		 * Getting List of Companies for adding experience 
		 */
		
		
		function getGuardDetails(){
			console.log("I am called.gc");
			var idperson=$window.sessionStorage.idperson;
			console.log(idperson);
			var uri = "/api/getGuardInfo/"+idperson;
			DataService.getData(uri,[]).success(function(response){
				angular.toJson(response);
				console.log("guard detaiks"+response.data[0]);
			//	console.log("Guard Info"+response);
				$scope.myProperties = response.data[0];			
			}).error(function(err){
				console.log(err.message);
			});
		
			
		}
		$scope.edit = function() {
			console.log("edit guard");

			var modalInstance = $modal.open({
				templateUrl : 'templates/guard/editGuard.html',
				controller : 'EditGuardController',
				size : 'lg',
				/*resolve : {
					companies : function() {
									return $scope.building;
								},
					isEdit : function(){
						return data;
					}
				}*/
			});

			modalInstance.result.then(function(isValid) {
				if (isValid) {
					getData();
				}
			}, function() {
			});
		};
		
};
$scope.logout = function(req,res){

	console.log("I am getting called.");

	DataService.getData('/api/logout').success(function(response){
		if(response){
			/*$rootScope.idperson == "undefined";
			$rootScope.idclient == "undefined";
			$rootScope.idgaurd == "undefined";*/
			$window.sessionStorage.idguard = "undefined";
			$window.sessionStorage.idclient = "undefined";
			$window.sessionStorage.idperson = "undefined";
			$window.sessionStorage.fname = "undefined";
			$window.sessionStorage.lname = "undefined";
			$window.sessionStorage.email = "undefined";
			$window.sessionStorage.lastLogin = "undefined";
			$window.sessionStorage.type ="undefined"
			console.log("I am getting logged out");
			$location.path('/');
		}else{
			
		}
	}).error(function(err){
		console.log(err.message);
	});
}
	
	});
		

