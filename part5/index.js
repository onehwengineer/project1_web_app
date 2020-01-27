
const API_GATEWAY_URL = 'https://h0p6s3g8x2.execute-api.us-east-1.amazonaws.com/production';
var REQUEST_O = {};

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

    REQUEST_O = { 
        'lat' : lat, 
        'lng' : lng 
    };

    $.ajax({
        type: "GET",
        url: API_GATEWAY_URL,
        data : REQUEST_O,
        dataType: "json"
    }).done(function (returned_data) {
        console.log( "returned_data : ", returned_data );
        
        for (var each_returned_data of returned_data){

            // Place marker
            var marker_each_restaurant = new google.maps.Marker({
                position: new google.maps.LatLng(
                    each_returned_data.coordinates.latitude, 
                    each_returned_data.coordinates.longitude, 
                ),
                icon: "http://maps.google.com/mapfiles/kml/pal2/" + "icon32.png",
                map: map
            });

            // Place infowindow
            var infowindow_each_restautant = new google.maps.InfoWindow({
                content: each_returned_data.name
            });
            infowindow_each_restautant.open(map, marker_each_restaurant);

        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("AJAX call failed: " + textStatus + ", " + errorThrown);
    });

  });
}