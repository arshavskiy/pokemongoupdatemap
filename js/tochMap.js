// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.

function initialize(map) {
    navigator.geolocation.getCurrentPosition(function (position) {

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        let mapLatLng = new google.maps.LatLng(lat, lng);

        map.setCenter(mapLatLng);
        map.setZoom(14);

        google.maps.event.addListener(map, 'click', function (event) {
            addMarker(event.latLng, map);
        });

        addMarker(mapLatLng, map);
    });
}

function addMarker(location, map, label) {
    let marker = new google.maps.Marker({
        position: location,
        // label: labels[labelIndex++ % labels.length],
        // label: label,
        map: map,
        icon: image,
    });

    if (typeof location == 'object'){
        printCordinates(location.lat, location.lng, label, map);
    } else {
        printCordinates(location.lat(), location.lng(), label, map);
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
    let marker = new google.maps.Marker({
        position: mapLatLng,
        animation: google.maps.Animation.DROP,
        map: map,
        icon: image,
    });

    printCordinates(mapLatLng.lat(), mapLatLng.lng(), name);
}

function printCordinates(latS, lngS, label, map) {

    if (label){
        $('<li/>')
        .html(`<b>${label}</b>`)
        .appendTo('ul.cordinatedList');

        let li = $('ul.cordinatedList li');
        li = li[li.length-1]
        li.addEventListener('click', function (e) {
            map.setCenter({
                lat: latS,
                lng: lngS
            });
            map.setZoom(19);
        });

    }
    if (typeof latS == 'number'){
        $('<li/>')
        .text(latS.toFixed(7) + '°' + ' : ' + lngS.toFixed(7) + '°')
        .appendTo('ul.cordinatedList');
    } else {
        $('<li/>')
        .text(latS().toFixed(7) + '°' + ' : ' + lngS().toFixed(7) + '°')
        .appendTo('ul.cordinatedList');
    }
   
}

function addSavedLocations(pos, map) {
   
        for (let i = 0; i < pos.length; i++) {
          setTimeout(function() {
            addMarker(pos[i], map, pos[i].label);
          }, i * 100);
        }
    
}

function init() {
    let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let labelIndex = 0;

    let map = new google.maps.Map(document.getElementById('map-canvas'));
    image = 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/sun.png';

    let MyPlace;
    let $findMeBtn = $('.find-me');

    google.maps.event.addDomListener(window, 'load', initialize(map));

    $findMeBtn.on('click', function (e) {
        e.preventDefault();
        addMarkerToMap(map);
    });

    addSavedLocations(locations, map);
}

init();