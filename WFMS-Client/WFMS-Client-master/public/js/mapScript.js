
function initialize() {
  var myLatlng = new google.maps.LatLng(37.335847, -121.886403);
  var myLatlng1 = new google.maps.LatLng(37.335643, -121.886848);
  var myLatlng2 = new google.maps.LatLng(37.335928, -121.886572);
  var myLatlng3 = new google.maps.LatLng(37.335762, -121.886888);
  var mapOptions = {
    zoom: 20,
    center: myLatlng
  }
 /* var mapOptions1 = {
    zoom: 20,
    center: myLatlng1
  }*/
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//var map1 = new google.maps.Map(document.getElementById('map-canvas'), mapOptions1);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: '1'
  });
  var marker1 = new google.maps.Marker({
      position: myLatlng1,
      map: map,
      title: '2'
  });
  var marker1 = new google.maps.Marker({
      position: myLatlng2,
      map: map,
      title: '3'
  });
  var marker1 = new google.maps.Marker({
      position: myLatlng3,
      map: map,
      title: '4'
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

  