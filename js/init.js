function initialize(map) {
    navigator.geolocation.getCurrentPosition(function (position) {

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        let mapLatLng = new google.maps.LatLng(lat, lng);

        state.setInitLocation(mapLatLng);

        map.setCenter(mapLatLng);
        map.setZoom(16);

        addMarker(mapLatLng, map);
    });

    // click on map makes marker
    // google.maps.event.addListener(map, 'click', function (event) {
    //     addMarker(event.latLng, map, 'נקודה הוספה' ,image_mission);
    // });

}



function addMarker(location, map, label, icon) {
    // let marker = new MarkerWithLabel({
    //     position: location,
    //     map: map,
    //     icon: icon,
    //     labelContent: label,
    //     labelClass: "my-custom-class-for-label", // the CSS class for the label
    //     zIndex: 10000
    //     //,icon: "img/marker/tuseiqui.png"
    // }); 
    if (typeof location.lat === 'function') {
        mapLatLng = location;
    } else {
        mapLatLng = new google.maps.LatLng(Number(location.lat), Number(location.lng));
    }

    let marker = new google.maps.Marker({
        position: mapLatLng,
        animation: google.maps.Animation.DROP,
        map: map,
        icon: icon,
        label: label,
        labelClass: "my-custom-class-for-label", // your desired CSS class
        labelInBackground: false
    });


    google.maps.event.addListener(marker, 'click', function (e) {
        let NewMarkerIcon = openModal(null, marker);

    });

    // if (typeof location == 'object'){
    //     printCordinates(location.lat, location.lng, label, map, 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/003-insignia.png');
    // } else {
    //     printCordinates(location.lat(), location.lng(), label, map);
    // }
}

function showMyLocation(map, label) {
    // add to mission gps
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let mapLatLng = new google.maps.LatLng(lat, lng);

        map.setCenter(mapLatLng);
        map.setZoom(16);
        // addMarker(mapLatLng, map);
    });

}

function addSavedLocations(pos, map) {
    let image_pokemon = 'https://vignette.wikia.nocookie.net/pokemongo/images/8/87/Pok%C3%A9_Ball.png/revision/latest/scale-to-width-down/32';
    for (let i = 0; i < pos.length; i++) {
        setTimeout(function () {
            addMarker(pos[i], map, pos[i].label, pos[i].icon || image_pokemon);
        }, i * 100);
    }
}

function init() {

    let $findMeBtn = $('.find-me');
    let map = new google.maps.Map(document.getElementById('map-canvas'), {
        styles: retro
    });

    // image_mission = 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/003-insignia.png';

    google.maps.event.addDomListener(window, 'load', initialize(map));

    $findMeBtn.click(function (e) {
        e.preventDefault();
        // let inputLabel = $('#labelName').val();
        showMyLocation(map, null);
    });

    getLocations = getDB();
    addSavedLocations(getLocations, map);
}

let state = (function () {
    let selection = 0;
    let stateA, stateB, stateIcon, initLocation, newLocation;
    return {
        count: function () {
            return selection++;
        },
        setA: function (a) {
            stateA = a;
        },
        setB: function (b) {
            stateB = b;
        },
        setIcon: function (icon) {
            stateIcon = icon;
        },
        getIcon: function () {
            return stateIcon;
        },
        setInitLocation(location){
            initLocation = location
        },
        setNewLocation(New_location){
            newLocation = New_location;
        },
        getInitLocation(){
            return initLocation;
        },
        getNewLocation(){
            return newLocation;
        },
        getA: function () {
            return stateA;
        },
        getB: function () {
            return stateB;
        },
        a: function (id) {
            return id.includes("a") ? id : "";
        },
        b: function (id) {
            return id.includes("b") ? id : "";
        },

    };
})();

window.onload = function () {
    init();
    // let modal = document.querySelector('.new-modal');
    // let closeModalbtn = modal.querySelector('.close');
    // closeModalbtn.onclick = function () {
    //     modal.style.display = "none";
    // }

}