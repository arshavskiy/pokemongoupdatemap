// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.

function initialize(map) {
    navigator.geolocation.getCurrentPosition(function (position) {

        // Get the location coordinates
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var mapLatLng = new google.maps.LatLng(lat, lng);

        map.setCenter(mapLatLng);
        map.setZoom(14);

        // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function (event) {
            addMarker(event.latLng, map);
        });

        //

        // Add a marker at the center of the map.
        addMarker(mapLatLng, map);
    });
}

// Adds a marker to the map.
function addMarker(location, map, label) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
        position: location,
        // label: labels[labelIndex++ % labels.length],
        map: map
    });

    if (typeof location == 'object'){
        printCordinates(location.lat, location.lng);
    } else {
        printCordinates(location.lat(), location.lng());
    }
}


function addMarkerToMap(map, pos) {

    let mapLatLng;
    
    if (!pos){

        myPosition = {
            lat: function () {
                return (Math.random() / 100) + 32.085;
            },
            lng: function () {
                return (Math.random() / 100) + 34.771;
            }
        }

        mapLatLng = new google.maps.LatLng(myPosition.lat(), myPosition.lng());
    } else {
        mapLatLng = new google.maps.LatLng(pos.lat, pos.lng);
    }

    
    map.setCenter(mapLatLng);
    map.setZoom(15);
    var marker = new google.maps.Marker({
        position: mapLatLng,
        animation: google.maps.Animation.DROP,
        map: map,
    });

    printCordinates(mapLatLng.lat(), mapLatLng.lng());
}

function printCordinates(latS, lngS) {
    if (typeof latS == 'number'){
        $('<li/>')
        .text(latS.toFixed(6) + '°' + ' : ' + lngS.toFixed(6) + '°')
        .appendTo('ul.cordinatedList');
    } else {
        $('<li/>')
        .text(latS().toFixed(6) + '°' + ' : ' + lngS().toFixed(6) + '°')
        .appendTo('ul.cordinatedList');
    }
   
}

function addSavedLocations(pos, map) {
   
        for (let i = 0; i < pos.length; i++) {
          setTimeout(function() {
            addMarker(pos[i], map);
          }, i * 100);
        }
    
}

function init() {
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;
    var map = new google.maps.Map(document.getElementById('map-canvas'));


    let MyPlace;
    var $findMeBtn = $('.find-me');

    google.maps.event.addDomListener(window, 'load', initialize(map));

    $findMeBtn.on('click', function (e) {
        e.preventDefault();
        addMarkerToMap(map);
    });

    addSavedLocations(locations, map);
}

init();