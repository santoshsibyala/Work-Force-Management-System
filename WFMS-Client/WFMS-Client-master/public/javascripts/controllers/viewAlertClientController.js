'use strict';
wfms.controller("viewAlertClientController", function($scope, $rootScope, $filter, 
		$location, $window, DataService, ngTableParams)  {

	var data = [];
	function getAll (){
		DataService.getData("/api/alertPerClient/"+$rootScope.idclient, []).success(
				function(response) {
					angular.toJson(response);
					$scope.alert = response.resultAlert;	
					data = response.resultAlert;			
				}).error(function(err) {
			console.log("Error while fetching data");
		});
	}
	$scope.getAlert = function(){
		getAll();
	};
	
	$scope.tableParams = new ngTableParams({
                                         page: 1,            // show first page
                                         count: 10,          // count per page
                                         filter: {
                                                 description: ''       // initial filter
                                         },
                                         sorting: {
                                                 description: ''     // initial sorting
                                         }
                         }, {
                                         total: data.length, // length of data
                                         getData: function($defer, params) {
                                                         // use build-in angular filter
                                                         var filteredData = params.filter() ?
                                                                                         $filter('filter')(data, params.filter()) :
                                                                                         data;
                                                         var orderedData = params.sorting() ?
                                                                                         $filter('orderBy')(filteredData, params.orderBy()) :
                                                                                         data;

                                                         params.total(orderedData.length); // set total for recalc pagination
                                                         $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                         }
                         });
	

	 $scope.severityOnSelect = function ($item, $model, $label) {
     
                $scope.$selection_made = $item;
                console.log("Selection Made: "+$scope.$selection_made.severity);



  //               DataService.getData("/api/alertByidalertInfo/"+$scope.$selection_made.idalertInfo, []).success(
		// 		function(response) {
		// 			angular.toJson(response);
		// 			$scope.alert = response.resultAlert;	
		// 			//this.getAlert();		
		// 		}).error(function(err) {
		// 	console.log("Error while fetching data");
		// });
     };

	


	$scope.seen = function(alertinfo){
		//console.log(angular.isObject(alertinfo));
		
		console.log(alertinfo.idalertInfo);
		console.log("Id Alert: "+ alertinfo);
		var params = {
				idalertInfo : alertinfo.idalertInfo,
				seenByClient : 'T'
				
			};

		DataService.putData("/api/alert/seenByClient",params).success(function(response){
				console.log("Done Successfully");
				getAll();

			}).error(function(err){
				console.log("Error");
			});
			
		
	}
});