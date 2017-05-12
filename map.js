var map;

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {
            lat: 32.053017,
            lng: 34.755967
        },
        zoomControl: false,
        scaleControl: true,

    });

    infoWindow = new google.maps.InfoWindow;
    directionsDisplay.setMap(map);

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('youre here');
            infoWindow.open(map);

            map.setCenter(pos);
            calculateAndDisplayStartRoute(pos);
        });
    } else {
        console.log('error')
    }

    var onChangeHandler = function () {

        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('youre here');
            infoWindow.open(map);

            map.setCenter(pos);
            calculateAndDisplayRoute(pos);
        });
    }

    document.getElementById('end').addEventListener('change', onChangeHandler);

    function calculateAndDisplayRoute(pos) {
        directionsService.route({
            origin: new google.maps.LatLng(pos.lat, pos.lng),
            destination: document.getElementById('end').value,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    function calculateAndDisplayStartRoute(pos) {
        directionsService.route({
            origin: new google.maps.LatLng(pos.lat, pos.lng), //document.getElementById('end').value,
            destination: 'Bat Yam, Israel',
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
}