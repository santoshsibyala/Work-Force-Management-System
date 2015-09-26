'use strict';
wfms.controller("ShowBuildingController", function($scope, $rootScope, $modal,
		$location, DataService) {

	$scope.getData = function() {
		
		getBuilding();
		
	}
	
	$scope.modifyBuilding = function(data) {
		console.log("did i get called");
		console.log("$rootScope.idclient" + $rootScope.idclient);
		var modalInstance = $modal.open({
			templateUrl : 'templates/client/editBuilding.html',
			controller : 'EditBuildingCtrl',
			size : 'lg',
			resolve : {
				isEdit : function(){
					return data;
				}
		
			}
		});

		modalInstance.result.then(function(isValid) {
			if (isValid) {
				getBuilding();
			}
		}, function() {
		});
	};

	$scope.deleteBuilding = function(building) {
			
			//console.log("to delete"+building.building.idbuilding);
		angular.toJson(building);
		console.log("Building to be deleted"+ building.data.idbuilding);
		var uri = urlConstants.DELETE_BUILDING+building.data.idbuilding;
		
		DataService.deleteData(uri,[]).success(function(response){
			alert("Building Deleted Successfully");
			getBuilding();
		}).error(function(err){
			
		});
		
	};
	
	
	
	function getBuilding(){
		
		var uri ="/api/listBuilding/"+$rootScope.idclient;
		DataService.getData(uri,[]).success(function(response){
			$scope.building = response.data;
		}).error(function(err){
			console.log(err.message);
		});
	}
	
	
});
	

	