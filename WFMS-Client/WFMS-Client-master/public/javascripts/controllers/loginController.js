'use strict';
wfms.controller("LoginController", function($scope, $rootScope,
		$location, $window, DataService) {

	$scope.template = "templates/wfms.html";
	$scope.getTemplate = function(){
		return $scope.template;
	};

	$scope.logout = function(req,res){

		console.log("I am getting called.");

		DataService.getData('/api/logout').success(function(response){
			if(response){
				
				
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
				
//				
//				$window.sessionStorage.type =="undefined";
//				$window.sessionStorage.idperson = "undefined";
//				$rootScope.idperson == "undefined";
//				$rootScope.idclient == "undefined";
//				$rootScope.idgaurd == "undefined";
//				console.log("I am getting logged out");
//				$location.path('/');
			}else{
				
			}
		}).error(function(err){
			console.log(err.message);
		});
	}
	// $scope.signInFormError = "";

	// $scope.signIn = function() {
	// 	if ($scope.loginForm.email.$invalid || $scope.loginForm.pwd.$invalid) {
	// 		$scope.signInFormError = "Invalid Credentials";
	// 	} else {
	// 		var params = {
	// 			email : $scope.email,
	// 			password : $scope.pwd
	// 		};
	// 		DataService.postData(urlConstants.LOGIN, params).success(
	// 				function(response) {
	// 					*
	// 					 * For encrypting password at client side as well
	// 					 * $scope.pwd =
	// 					 * CryptoJS.SHA256($scope.pwd).toString(CryptoJS.enc.hex);
						 
	// 					$window.sessionStorage.userId = response.email;
	// 					$window.sessionStorage.userName = response.name;
	// 					$window.sessionStorage.userLastLogin = response.lastLogin;
	// 					$rootScope.userId = response.email;
	// 					$rootScope.userName = response.name;
	// 					$rootScope.userLastLogin = response.lastLogin;
	// 					$location.path('/home');
	// 				}).error(function(err) {
	// 			$scope.signInFormError = err.message;
	// 		});
	// 	}
	// }
});