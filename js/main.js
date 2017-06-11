var locations = [{
        lat: 32.053017,
        lng: 34.755967
    }, {
        lat: 32.053399,
        lng: 34.753853
    }, {
        lat: 32.052635,
        lng: 34.756171
    }, {
        lat: 32.054350,
        lng: 34.756470
    }, {
        lat: 32.053724,
        lng: 34.755891
    }, {
        lat: 32.054062,
        lng: 34.755628
    }, {
        lat: 32.053986,
        lng: 34.755913
    },
    {
        lat: 32.053875,
        lng: 34.755612
    }
]

var beaches = [
    ['Gambari', 32.053875, 34.755612, 7],
    ['El Jamila', 32.053986, 34.755913, 6],
    ['Anna Loulou Bar', 32.053399, 34.753853, 5],
    ['Shaffa Bar', 32.053017, 34.755967, 4],
    ['Cafe Puaa', 32.052635, 34.756171, 3],
    ['Dr Shakshuka', 32.054350, 34.756470, 2],
    ['Urbano', 32.054062, 34.755628, 1]
];

var map;

function buildNav(beaches) {
    for (i = 0; i < beaches.length; i++) {
        $('<h3 class="' + beaches[i][0] + '">').html(beaches[i][0]).appendTo('#container');
    }
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {
            lat: 32.053017,
            lng: 34.755967
        },
        zoomControl: false,
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
            infoWindow.setContent('youre here');
            infoWindow.open(map);
            map.setCenter(pos);
            map.setZoom(12);

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
                lat: beaches[2][1],
                lng: beaches[2][2]
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
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

    //Position by menu slection
    var menus = document.querySelectorAll('h3');
    for (var i = 0; i < menus.length; i++) {

        menus[i].addEventListener('click', function (e) {
            console.log(e.target.className);

            for (var i = beaches.length - 1; i >= 0; i--) {
                if (e.target.className == beaches[i][0]) {
                    map.setCenter({
                        lat: beaches[i][1],
                        lng: beaches[i][2]
                    });
                    map.setZoom(20);
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



buildNav(beaches);
