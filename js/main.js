function buildNav(loc) {
    for (i = 0; i < loc.length; i++) {
        $('<h3 class="' + loc[i][0] + '">').html(loc[i][0]).appendTo('#container');
    }
};

function initMap() {
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: {
            lat: 32.053017,
            lng: 34.755967
        },
        zoomControl: true,
        scaleControl: true,
        styles: dark

    });

    infoWindow = new google.maps.InfoWindow;

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(map);

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Is says you are here!');
            infoWindow.open(map);
            map.setCenter(pos);
            map.setZoom(20);

            calculateAndDisplayRoute(pos);
        });
    } else {
        console.log('error')
    }

    function calculateAndDisplayRoute(pos) {
        directionsService.route({
            origin: new google.maps.LatLng(pos.lat, pos.lng),
            // destination: 'Bat Yam, Israel',
            destination: {
                lat: barLocations[2][1],
                lng: barLocations[2][2]
            },
            travelMode: 'WALKING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    // search routes
    var onChangeHandler = function () {

        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Here!');
            infoWindow.open(map);

            map.setCenter(pos);
            calculateAndDisplayRoute(pos);
        });
    }

    document.getElementById('selectNavigationCor').addEventListener('change', onChangeHandler);

    function calculateAndDisplayRoute(pos) {
        directionsService.route({
            origin: new google.maps.LatLng(pos.lat, pos.lng),
            destination: document.getElementById('selectNavigationCor').value,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                console.log('Directions request failed due to ' + status);
            }
        });
    }

    //markers
    var markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            animation: google.maps.Animation.DROP,
            // label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer'
    });

    //Position by menu slection
    var menus = document.querySelectorAll('h3');
    for (var i = 0; i < menus.length; i++) {

        menus[i].addEventListener('click', function (e) {

            for (var i = barLocations.length - 1; i >= 0; i--) {
                if (e.target.className == barLocations[i][0]) {
                    map.setCenter({
                        lat: barLocations[i][1],
                        lng: barLocations[i][2]
                    });
                    map.setZoom(19);
                }
            }
        });
    }

    function AddMarker(pos) {
        var marker = new google.maps.Marker({
            position: pos,
            map: map
        });
    }


}

buildNav(barLocations);


var $findMeBtn = $('.find-me');

