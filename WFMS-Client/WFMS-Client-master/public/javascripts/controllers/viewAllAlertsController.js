'use strict';
wfms.controller("ViewAllAlertsCtrl", function($scope, $rootScope, $modal, $filter, ngTableParams, DataService) {

	var data = [];

	$scope.getAllAlerts = function(){
		console.log("function called");
		var uri = urlConstants.GET_ACTIVE_ADMIN_ALERTS;
		
		DataService.getData(uri,[]).success(function(response){
			if(response.data){
				console.log(JSON.stringify(response.data));
				data = response.data;
				$scope.activeAdminAlerts = response.data;
			}
		}).error(function(err){
			console.log(err.message);
		});
	}

	$scope.tableParams = new ngTableParams({
                                         page: 1,            // show first page
                                         count: 10,          // count per page
                                         filter: {
                                                 fname: ''       // initial filter
                                         },
                                         sorting: {
                                                 fname: ''     // initial sorting
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
	
	$scope.publishAlert = function(data) {
		var modalInstance = $modal.open({
			templateUrl : 'templates/admin/publishAlert.html',
			controller : 'PublishAlertCtrl',
			size : 'lg',
			resolve : {
				isEdit : function(){
					return data;
				}
		
			}
		});
		
		modalInstance.result.then(function(isValid) {
			if (isValid) {
				$scope.getAllAlerts();
			}
		}, function() {
		});
	}

});
