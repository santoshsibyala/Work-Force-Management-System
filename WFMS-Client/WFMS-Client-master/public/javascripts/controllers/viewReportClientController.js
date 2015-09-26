'use strict';
wfms.controller("viewReportClientController", function($scope, $rootScope,
		$location, $window, $filter, DataService, ngTableParams) {

	var data = [];

	
	$scope.getData = function() {
		
		getAllReport();
		
	}

	function getAllReport(){

		console.log("getdata is getting called ");

		var idclient = $rootScope.idclient;
		//var idclient = 1;

		DataService.getData("/api/reportDataPerClientClient/"+idclient, []).success(
				function(response) {
					// angular.toJson(response);
					//console.log("Response "+ response.data[1].idbuilding);
					$scope.reportData = response.result;
					data = response.result
					console.log("Report Date came"+data);
					//$scope.selectedbuilding = $scope.data.buildingname;
				}).error(function(err) {
			console.log("Error while fetching data"+err);
		});

	}

	// $scope.getdata = function(req,res) {
	// 	var idperson = 1;

	// 	DataService.getData("/api/listBuilding/"+idperson, []).success(
	// 			function(response) {
	// 				angular.toJson(response);
	// 				//console.log("Response "+ response.data[1].idbuilding);
	// 				$scope.buildingName = response.data;
	// 				//$scope.selectedbuilding = $scope.data.buildingname;
	// 			}).error(function(err) {
	// 		console.log("Error while fetching data");
	// 	});

		
	// }

	$scope.viewReport = function(report){
		$scope.error = "";
		console.log("Details in generate report"+report.idbuilding);
		console.log("Details in generate report"+report.date);
		console.log("Details in generate report"+report.idclient);
		$scope.buildingname = report.buildingname;
		$scope.clientfirst = report.clientfirst;
		$scope.clientlast = report.clientlast;
		$scope.guardfirst = report.guardfirst + " "+ report.guardlast;
		//$scope.guardlast = report.guardlast;
		$scope.date = report.date;

		if(!report.idbuilding || !report.date || !report.idclient){

			$scope.error = "Data for report is not complete";
			alert($scope.error);
			$scope.resultPatrol = "";
			$scope.clientfirst	= "";
			$scope.buildingname = "";
			$scope.clientlast = "";
			$scope.resultAlert = "";
			$scope.guardfirst = "";
		} else{


				//idclient: $rootScope.idclient;
			var params = {
				idclient :  report.idclient,
				date : 		report.date,
				idbuilding: report.idbuilding
			};

		DataService.postData("/api/reportPerClientPerBuilding/", params ).success(
				function(response) {
					
					if(response.status == 501 ){
						console.log("Message: "+response.message);
						$scope.error = response.message;
					}
					else{
						console.log(response.resultPatrol[0]);
						console.log("Response "+ response.resultAlert + response.resultPatrol);
						$scope.resultPatrol = response.resultPatrol;
						$scope.resultAlert = response.resultAlert;
						
					}
					
				}).error(function(err) {
			console.log("Error while fetching data");

		});
		}

	}
	$scope.tableParams = new ngTableParams({
                                         page: 1,            // show first page
                                         count: 10,          // count per page
                                         filter: {
                                                 buildingname: ''       // initial filter
                                         },
                                         sorting: {
                                                 buildingname: ''     // initial sorting
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

	




	});