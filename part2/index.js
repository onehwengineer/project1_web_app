initMap = function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 37.3382, lng: -121.8863}
  });

  map.addListener('click', function(e) {
    var marker = new google.maps.Marker({
      position: e.latLng,
      map: map
    });
    map.panTo(e.latLng);

    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    console.log( "lat : ", lat );
    console.log( "lng : ", lng );
  });
}