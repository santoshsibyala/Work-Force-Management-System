'use strict';
wfms.controller("ShowAdminController", function($scope, $rootScope, $modal,
		$location, DataService,$window) {
	
	$scope.loginAdmin = function() {

		console.log("Inside login admin Funct");
		if($scope.email=== "" ||  $scope.password === ""){
			$scope.formError = "Form Invalid !!!";
		}else{
			
			var params = {
					
					email : $scope.email,
					password:  $scope.password,
					userType: "ADMIN"
						
				};
			DataService.postData("/api/login",params).success(
				function(response) {
					$window.sessionStorage.type = "ADMIN";
					$window.sessionStorage.idperson = response.idperson;
					$window.sessionStorage.fname = response.fname;
					$window.sessionStorage.lname = response.lname;
					$window.sessionStorage.email = response.email;
					$window.sessionStorage.lastLogin = response.lastLogin;
					
					$rootScope.lastLogin = $window.sessionStorage.lastLogin;
					$rootScope.idperson = $window.sessionStorage.idperson;
					$rootScope.fname = $window.sessionStorage.fname;
					$rootScope.fname = $window.sessionStorage.fname;
					$rootScope.email = $window.sessionStorage.email;

					$location.path('/admin');
				}).error(function(err) {
			console.log("Error while fetching data");
			$scope.formError="Invalid Username/Password";
			$location.path('/');
		});
		}
	};
	
	
	
	
	
});
	
	