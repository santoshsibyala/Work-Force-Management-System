'use strict';

wfms.controller("ViewAllGuardsCtrl", function($scope, $rootScope, $modal, $filter, DataService, ngTableParams,$location,$route) {



var data = [];



$scope.getData = function() {


getAllGaurds();


}






$scope.deleteCall = function(guard){


console.log("to delete"+guard.guard.fname);


var uri = urlConstants.DELETE_GUARD+"/"+guard.guard.idguard;


DataService.deleteData(uri,[]).success(function(response){

alert("Guard Deleted Successfully");


}).error(function(err){


});

$route.reload();

//getAllGaurds();

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




$scope.modifyGuard = function(data) {

console.log("edit guard");



var modalInstance = $modal.open({

templateUrl : 'templates/admin/editGuard.html',

controller : 'EditGuardCtrl',

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

}


$scope.addGuard = function() {

console.log("add guard");



var modalInstance = $modal.open({

templateUrl : 'templates/admin/addGuard.html',

controller : 'AddGuardCtrl',

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


}







function getAllGaurds(){

var uri = urlConstants.GET_ALL_GUARDS;


DataService.getData(uri,[]).success(function(response){

if(response.data){

data = response.data;

$scope.guardListResults = response.data;

}

}).error(function(err){

console.log(err.message);

});

};





});