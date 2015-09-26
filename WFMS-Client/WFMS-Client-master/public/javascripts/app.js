'use strict';
var wfms = angular.module("wfms", [ 'ngRoute', 'ui.bootstrap','ngTable','uiGmapgoogle-maps'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl : 'templates/index.ejs',
		controller : 'IndexController'
	}).when('/client', {
		templateUrl : 'templates/client.ejs',
		controller : 'ClientController'
	}).when('/guard', {
		templateUrl : 'templates/guard.ejs',
		controller : 'GuardController'
	}).when('/admin', {
		templateUrl : 'templates/admin.ejs',
		controller : 'AdminController'
	}).when('/logout', {
		templateUrl : 'templates/index.ejs',
		controller : 'IndexController'
	}).when('/map', {
		templateUrl : 'templates/map.ejs',
		controller : 'MapController'
	}).otherwise({
		redirectTo : '/'
	});
	// ,
	/**
	 * to remove hash in the URL
	 */
	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});

}).run(['$rootScope','$window' ,'$location', 'DataService',function($rootScope,$window, $location,DataService) {
	$rootScope.$on('$routeChangeStart', function(event) {

//				if($rootScope.idperson){
//					$rootScope.lastLogin = $window.sessionStorage.lastLogin;
//					$rootScope.idclient = $window.sessionStorage.idclient;
//					$rootScope.idperson = $window.sessionStorage.idperson;
//					$rootScope.fname = $window.sessionStorage.fname;
//					$rootScope.fname = $window.sessionStorage.fname;
//					$rootScope.email = $window.sessionStorage.email;
//					$rootScope.idguard = $window.sessionStorage.idguard;
//				}
//				else
//				{
//					$rootScope.lastLogin = "undefined";
//					$rootScope.idclient = "undefined";
//					$rootScope.idperson = "undefined";
//					$rootScope.fname = "undefined";
//					$rootScope.fname = "undefined";
//					$rootScope.email = "undefined";
//					$rootScope.idguard = "undefined";
//					$location.path('/');
//				}
		
		
        console.log("Called in app.js first");

		DataService.getData("/api/loggedin",{}).success(
                function(response) {
                                if($window.sessionStorage.idperson && $window.sessionStorage.type=='CLNT'){
                                        $rootScope.lastLogin = $window.sessionStorage.lastLogin;
                                        $rootScope.idclient = $window.sessionStorage.idclient;
                                        $rootScope.idperson = $window.sessionStorage.idperson;
                                        $rootScope.fname = $window.sessionStorage.fname;
                                        $rootScope.fname = $window.sessionStorage.fname;
                                        $rootScope.email = $window.sessionStorage.email;
                                       // $rootScope.idguard = $window.sessionStorage.idguard;
                                        $location.path('/client');
                                        console.log("Called in app.js");
                                }
                                else if($window.sessionStorage.idperson && $window.sessionStorage.type=='GUARD'){
                                	 $rootScope.lastLogin = $window.sessionStorage.lastLogin;
                                   //  $rootScope.idclient = $window.sessionStorage.idclient;
                                     $rootScope.idperson = $window.sessionStorage.idperson;
                                     $rootScope.fname = $window.sessionStorage.fname;
                                     $rootScope.fname = $window.sessionStorage.fname;
                                     $rootScope.email = $window.sessionStorage.email;
                                     $rootScope.idguard = $window.sessionStorage.idguard;
                                     $location.path('/guard');
                                     console.log("Called in app.js");
                                
                                }
                                else if($window.sessionStorage.idperson &&  $window.sessionStorage.type == "ADMIN"){
                               	 $rootScope.lastLogin = $window.sessionStorage.lastLogin;
                                  //  $rootScope.idclient = $window.sessionStorage.idclient;
                                    $rootScope.idperson = $window.sessionStorage.idperson;
                                    $rootScope.fname = $window.sessionStorage.fname;
                                    $rootScope.fname = $window.sessionStorage.fname;
                                    $rootScope.email = $window.sessionStorage.email;
                                  //  $rootScope.idguard = $window.sessionStorage.idguard;
                                    $location.path('/admin');
                                    console.log("Called in app.js");
                               
                               }
                               
                                else{
                                        $location.path('/');
                                }

                        console.log("inside loggedin");
                        
                }).error(function(err) {
        console.log("Error while fetching data");
        $location.path('/');
});
		
	});
}]);



   