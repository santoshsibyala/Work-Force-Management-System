'use strict';
wfms.controller("mapCntr", function($scope, $rootScope,  
		$location, DataService)  {

var numberOfBuilding;

$scope.randomMarkers = [];

$scope.getBuilding = function(){

		console.log("idclient: "+$rootScope.idclient);

		DataService.getData("/api/getBuildingClientReport/"+$rootScope.idclient, []).success(
				function(response) {
          console.log("response.data.length: "+response.data.length);
					$scope.data = response.data;
          console.log("response:: " + JSON.stringify($scope.data));

          numberOfBuilding = response.data.length;
          console.log("numberOfBuilding:"+numberOfBuilding);
          for(var i=0;i<numberOfBuilding;i++){
           console.log(i);
            $scope.$watch(function() {
              return $scope.map.bounds;
            }, function(nv, ov) {
              // Only need to regenerate once
              if (!ov.southwest && nv.southwest) {
                console.log("ov.southwest: "+JSON.stringify(ov.southwest));
                console.log("nv.southwest: "+JSON.stringify(nv.southwest));
                console.log("$scope.map.bounds: "+JSON.stringify($scope.map.bounds));
                var markers = [];
                for (var i = 0; i < 4; i++) {
                  markers.push(createRandomMarker(i, $scope.map.bounds))
                }
                $scope.randomMarkers = markers;
              }
            }, true);
          }
          
				}).error(function(err) {
			console.log("Error while updating client billing information");
		});

}

 $scope.map = {
      center: {
        latitude:  37.335847,
        longitude: -121.886403,
      },
      zoom: 16,
      bounds: {}
    };

$scope.options = {
      scrollwheel: false
    };

// $scope.markerlist = [
//       {
//         latitude:  37.335847,
//         longitude: -121.886403,
//         idKey : "1"
//       }, 
//       {
//         latitude:  37.337847,
//         longitude: -121.887403,
//         idKey :"2"
//       },
//       {
//         latitude:  37.333847,
//         longitude: -121.846403,
//         idKey : "3"
//       },
//       {
//         latitude:  37.335347,
//         longitude: -121.876403,
//         idKey : "4"
//       },
//       {
//         latitude:  37.335547,
//         longitude: -121.884403,
//         idKey : "5"
//       }


// ];


var createRandomMarker = function(i, bounds, idKey) {
              // var lat_min = $scope.map.center.latitude,
              //   lat_range = $scope.map.center.latitude - .0002000,
              //   lng_min = $scope.map.center.longitude,
              //   lng_range = $scope.map.center.longitude + .0002000;
                var lat_min = bounds.southwest.latitude,
                lat_range = bounds.northeast.latitude - .0002000,
                lng_min = bounds.southwest.longitude,
                lng_range = bounds.northeast.longitude + .0002000;
                
                console.log("lat_min: "+lat_min );
                console.log("lat_range: "+lat_range );
                console.log("lng_min: "+lng_min );
                console.log("lng_range: "+lng_range );

              if (idKey == null) {
                idKey = "id";
              }

              var latitude = lat_min + (Math.random()/1000 + .0003000);
              var longitude = lng_min + (Math.random()/1000 - .0003000);

      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: 'm' + i
      };
      ret[idKey] = i;
      return ret;
    };

    




// $scope.marker = {
//       id: 0,
//       coords: {
//         latitude: 37.335847,
//         longitude: -121.886403
//       },
//       options: { draggable: true },
//       events: {
//         dragend: function (marker, eventName, args) {
//           $log.log('marker dragend');
//           var lat = marker.getPosition().lat();
//           var lon = marker.getPosition().lng();
//           $log.log(lat);
//           $log.log(lon);


//           $scope.marker.options = {
//             draggable: true,
//             labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
//             labelAnchor: "100 0",
//             labelClass: "marker-labels"
//           };
//         }
//       }

		//getMap();

		
	

	// function getMap(){
		
	// 	$location.path('/client/map');
		
	
});
