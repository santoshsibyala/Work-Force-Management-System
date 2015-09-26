'use strict';
wfms.controller("ClientsReqCtrl", function($scope, $rootScope, $modal,
		$location, DataService) {

	$scope.getAllPNDGClients = function() {
		getAllPendingClients();
	};

	function getAllPendingClients(){
		DataService.getData(urlConstants.GET_PNDG_CLIENTS,[]).success(function(response){
			if(response.data){
				console.log(response.data);
				$scope.clientReqList = response.data;
			}
		}).error(function(err){
			console.log(err.message);
		});
	}

	$scope.assignGuards = function(data) {
		console.log("did i get called");

		var modalInstance = $modal.open({
			templateUrl : 'templates/admin/assignGuards.html',
			controller : 'AssignGuardsCtrl',
			size : 'lg',
			resolve : {
				isEdit : function(){
					return data;
				}
			}
		});

		modalInstance.result.then(function(isValid) {
			if (isValid) {
				getAllPendingClients();
			}
		}, function() {
		});
	};

});