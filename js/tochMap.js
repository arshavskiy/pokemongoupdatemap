// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var map = new google.maps.Map(document.getElementById('map-canvas'));

function initialize(map) {
    navigator.geolocation.getCurrentPosition(function (position) {

        // Get the location coordinates
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var mapLatLng = new google.maps.LatLng(lat, lng);

        map.setCenter(mapLatLng);
        map.setZoom(15);

        // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function (event) {
            addMarker(event.latLng, map, labels[labelIndex++ % labels.length]);
        });

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
        label: label,
        // label: labels[labelIndex++ % labels.length],
        map: map
    });
}


function addMarkerToMap(map) {
   
    myPosition = {
        lat: function () {
            return (Math.random() / 100) + 32.085;
        },
        lng: function () {
            return (Math.random() / 100) + 34.771;
        }
    }
    
    let latS = myPosition.lat();
    let lngS = myPosition.lng();
    var mapLatLng = new google.maps.LatLng(latS, lngS);
    map.setCenter(mapLatLng);
    map.setZoom(15);
    var marker = new google.maps.Marker({
        position: mapLatLng,
        animation: google.maps.Animation.DROP,
        map: map,
    });

    var li = $('<li/>')
        .text(latS.toFixed(6) + '°' + ' : ' + lngS.toFixed(6) + '°')
        .appendTo('ul.cordinatedList');
        
    // $('ul.cordinatedList').text(latS + ':' + lngS);
}

google.maps.event.addDomListener(window, 'load', initialize(map));

let MyPlace;
var $findMeBtn = $('.find-me');

$findMeBtn.on('click', function (e) {
    e.preventDefault();
    addMarkerToMap(map);
});