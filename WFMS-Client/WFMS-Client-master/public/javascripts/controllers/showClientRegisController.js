'use strict';
wfms.controller("ShowClientRegisController", function($scope, $rootScope, $modal,
		$location, DataService,$window) {
	
	$scope.registerClient = function() {
		
		 //$scope.zipCodeRegex = "/^\d{5}(?:[-\s]\d{4})?$/";
		  //$scope.ssnRegex = "/^(?!000)(?!666)(?!9)\d{3}[- ]?(?!00)\d{2}[- ]?(?!0000)\d{4}$/";


		

		console.log("inside register Client");

		var modalInstance = $modal.open({
			templateUrl : 'templates/index/register.html',
			controller : 'ClientRegistrationController',
			size : 'lg',
		});

		modalInstance.result.then(function(isValid) {
			if (isValid) {
				getData();
			}
		}, function() {
		});
	};
    
	$scope.loginClient = function() {

		console.log("Inside login client Funct");
		if($scope.email=== "" ||  $scope.password === ""){
			$scope.formError = "Form Invalid !!!";
		}else{
			
			var params = {
					
					email : $scope.email,
					password:  $scope.password,
					userType: "CLNT"
						
				};
			DataService.postData("/api/login",params).success(
				function(response) {


					$rootScope.idclient = response.idclient;
					$rootScope.idperson = response.idperson;
					$rootScope.fname = response.fname;
					$rootScope.lname = response.lname;
					$rootScope.email = response.email;
					$rootScope.lastLogin = response.lastLogin;

					console.log("window element:" + $window.sessionStorage.idperson);
					$window.sessionStorage.type = response.type;
					$window.sessionStorage.idclient = response.idclient;
					$window.sessionStorage.idperson = response.idperson;
					$window.sessionStorage.fname = response.fname;
					$window.sessionStorage.lname = response.lname;
					$window.sessionStorage.email = response.email;
					$window.sessionStorage.lastLogin = response.lastLogin;
					
					$rootScope.type = $window.sessionStorage.type;
					$rootScope.lastLogin = $window.sessionStorage.lastLogin;
					$rootScope.idclient = $window.sessionStorage.idclient;
					$rootScope.idperson = $window.sessionStorage.idperson;
					$rootScope.fname = $window.sessionStorage.fname;
					$rootScope.fname = $window.sessionStorage.fname;
					$rootScope.email = $window.sessionStorage.email;

					$location.path('/client');
				}).error(function(err) {
					$scope.formError="Invalid Username/Password";
			console.log("Error while fetching data");
			$location.path('/');
		});
		}
	};
	
	
	
});
	
	