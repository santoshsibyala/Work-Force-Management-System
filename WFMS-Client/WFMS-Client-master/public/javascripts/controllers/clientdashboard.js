'use strict';
wfms.controller("ClientDashboard", function($scope, $rootScope, $modal,
		$location, DataService, $window) {

	$scope.getData = function() {
		
		clientInfo();
		
	}
	
	function clientInfo(){
		console.log("$rootScope.idperson:" + $rootScope.idperson);
		console.log("$rootScope.idclient:" + $rootScope.idclient);
		var uri = "/api/getClientInfo/"+$rootScope.idperson;
		console.log($rootScope.idperson);
		DataService.getData("/api/getClientInfo/" + $window.sessionStorage.idperson,[]).success(function(response){
	

			//angular.toJson(response);
			console.log(response.data[0]);
			$scope.clientProperties = response.data[0];
			$scope.lastlogin=$window.sessionStorage.lastLogin
			
		}).error(function(err){
			console.log(err.message);
		});
	}
	
	$scope.modifyClientInfo = function() {
		console.log("did i get called");

		var modalInstance = $modal.open({
			templateUrl : 'templates/client/editClientInformation.html',
			controller : 'EditClientProfileCtrl',
			size : 'lg',
			resolve : {
				isEdit : function(){
					return $scope.clientProperties;
					//return data;
				}
		
			}
		});

		modalInstance.result.then(function(isValid) {
			if (isValid) {
				clientInfo();
			}
		}, function() {
		});
	};
	
	
});
	

	