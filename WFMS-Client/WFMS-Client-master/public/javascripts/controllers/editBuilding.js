'use strict';
wfms.controller("EditBuildingCtrl", function($scope, $modalInstance,
		 isEdit, $rootScope, DataService, $http) {

	$scope.getLocation = function(val) {
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        return {
          location: item.geometry.location,
          formatted_address: item.formatted_address
        }
      });
    });
  };

  
  function compareDate(first,second) {
      if(first>second){return false;}
      else{return true;}
}
  
  function checkGuardNumber(guardnum){
	  
	  return (!isNaN(guardnum) && guardnum > 0 && guardnum <= 4)
  }
  
function checkCheckPoint(checkpoint){
	  
	  return (!isNaN(checkpoint) && checkpoint > 0 && checkpoint <= 4)
  }
	
	
	console.log("isEdit"+ isEdit);

	if (isEdit) {
		console.log(isEdit.start_date);
		$scope.buildingname = isEdit.buildingname;
		$scope.start_date = isEdit.start_date;
		$scope.release_date = isEdit.release_date;
		$scope.address = isEdit.address;
		$scope.checkpoint = isEdit.checkpoint;
		$scope.no_of_guards = isEdit.no_of_guards;
		
		
	} else {
		$scope.buildingname ="";
		$scope.start_date = "";
		$scope.release_date="";
		$scope.address = "";
		$scope.checkpoint = "";
		$scope.no_of_guards=""
	};
	
	
	

	
	$scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };
	  
	  


$scope.okay = function() {
	
	 var first = $scope.start_date ;
     var second = $scope.release_date ;
     var guardnum =  $scope.no_of_guards;
     var checkpoint = $scope.checkpoint;
	if((compareDate(second,first))){
		console.log("did i come here")
		$scope.formError = "start date cannot be greater then end date!!!"	
		
	}
	else if(!(checkGuardNumber(guardnum))){
		
		$scope.formError = "Guard should be number between 1-4!!!"
		
	}
	
else if(!(checkCheckPoint(checkpoint))){
		
		$scope.formError = "CheckPoint should be number between 1-4!!!"
		
	}
	
	
	
	else{
		
	console.log($scope.address.location.lat);
	console.log($scope.address.location.lng );
	console.log($scope.buildingname + $scope.start_date  + $scope.address.formatted_address);
	if($scope.buildingname &&
	$scope.start_date &&
	$scope.release_date &&
	$scope.address.formatted_address &&
	$scope.checkpoint &&
	$scope.no_of_guards){
	
		if (isEdit) {
			console.log(isEdit);

			var params = {
				
				
					//idclient : $rootScope.userId,
					idclient : 1,
					idbuilding:isEdit.idbuilding,
					start_date:$scope.start_date,
					release_date : $scope.release_date,
					buildingname:  $scope.buildingname,
					address : $scope.address.formatted_address,
					no_of_guards: $scope.no_of_guards,
					checkpoint : $scope.checkpoint,
					latitude : $scope.address.location.lat,
					longitude : $scope.address.location.lng
				
			};
			
			
			DataService.putData('/api/editBuilding', params)
			.success(function(response) {
				$modalInstance.close(true);
			}).error(function(err) {
				$modalInstance.close(false);
			});

}
		
		else {
			var params = {
					
					idclient : $rootScope.idclient,
					//idclient : 1,
					start_date:$scope.start_date,
					release_date : $scope.release_date,
					buildingname:  $scope.buildingname,
					address : $scope.address.formatted_address,
					no_of_guards: $scope.no_of_guards,
					checkpoint : $scope.checkpoint,
					latitude : $scope.address.location.lat,
					longitude : $scope.address.location.lng
				
						
				};
				console.log($scope.address.location.lat);
	console.log($scope.address.location.lng);
			DataService.postData("/api/createBuilding",params).success(function(response){
				$modalInstance.close(true);
			}).error(function(err){
				$modalInstance.dismiss(false);
			});
		}
	}
	
	else{
		
		$scope.formError = "Form Invalid !!!";
	}
	}

};

$scope.cancel = function() {
	$modalInstance.dismiss(false);
};


});





