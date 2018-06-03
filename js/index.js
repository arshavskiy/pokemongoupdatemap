let MyPlace;
var $findMeBtn = $('.find-me');

$findMeBtn.on('click', function (e) {
  e.preventDefault();
  addMarkerToMap();
});



function initialize() {

// Check if browser supports the Geolocation API
if (!navigator.geolocation) {

  $findMeBtn.addClass('disabled');
  $('.no-geolocation-support').addClass('visible');

  // Check if the page is accessed over HTTPS
} else {


  navigator.geolocation.getCurrentPosition(function (position) {

    // Get the location coordinates
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    
    var mapLatLng = new google.maps.LatLng(lat, lng);

    var mapOptions = {
      zoom: 15,
      mapTypeControl: false,
      center: mapLatLng,
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    infoWindow = new google.maps.InfoWindow;
    infoWindow.setPosition(mapLatLng);
    infoWindow.setContent('Is says you are here!');
    infoWindow.open(map);
    map.setCenter(mapLatLng);
    map.setZoom(15);
  });

};
  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });

  // Add a marker at the center of the map.
  addMarker(bangalore, map);
}

// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });
}

google.maps.event.addDomListener(window, 'load', initialize);


function addMarkerToMap() {

  var mapOptions = {
    zoom: 15,
    mapTypeControl: false,
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  navigator.geolocation.getCurrentPosition(function (position) {

    // Get the location coordinates
    myPosition = {
      // lat:position.coords.latitude,
      // lng:position.coords.longitude,
      lat: function () {
        return (Math.random() / 100) + 32.03;
      },
      lng: function () {
        return (Math.random() / 100) + 34.74;
      }
    }

    // for (step = 0; step < 5; step++) {
    // var mapMarker = new google.maps.Marker({
    //   position: myPosition,
    //   map: map,
    //   title: 'New Marker Added',
    // });

    let latS = myPosition.lat();
    let lngS = myPosition.lng();
    var mapLatLng = new google.maps.LatLng(latS, lngS);
    console.log('mapLatLng', latS + ':' + lngS);
    map.setCenter(mapLatLng);


    var marker = new google.maps.Marker({
      position: mapLatLng,
      animation: google.maps.Animation.DROP,
      map: map,
    });
  });
}



$('#exampleModalCenter').on('shown.bs.modal', function () {
  $('#myInput').trigger('userLogin');
});

$('#loginBtn').on('click', function () {
  $('#modalLogin').css('display', 'none');
});