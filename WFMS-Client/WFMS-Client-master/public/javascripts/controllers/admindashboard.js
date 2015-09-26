'use strict';

wfms.controller("AdminDashBoard", function($scope, $rootScope, $modal,

$location, DataService, $window) {



$scope.getData = function() {


adminInfo();


}


function adminInfo(){

console.log("$rootScope.idperson:" + $rootScope.idperson);

//	console.log("$rootScope.idclient:" + $rootScope.idclient);

var uri = "/api/getPersonInfo/"+$rootScope.idperson;

//console.log($rootScope.idperson);

DataService.getData("/api/getPersonInfo/" + $window.sessionStorage.idperson,[]).success(function(response){





console.log(angular.toJson(response));

$scope.adminProperties = response.data[0];

$scope.lastlogin=$window.sessionStorage.lastLogin


}).error(function(err){

console.log(err.message);

});

};



//addAdmin()

$scope.addAdmin = function() {

console.log("add admin");



var modalInstance = $modal.open({

templateUrl : 'templates/guard/addadmin.html',

controller : 'AddController',

size : 'lg',

/*resolve : {

companies : function() {

return $scope.building;

},

isEdit : function(){

return data;

}

}*/

});



modalInstance.result.then(function(isValid) {

if (isValid) {

getData();

}

}, function() {

});

};




});


