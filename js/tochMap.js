function initialize(map) {
    navigator.geolocation.getCurrentPosition(function (position) {

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        let mapLatLng = new google.maps.LatLng(lat, lng);

        map.setCenter(mapLatLng);
        map.setZoom(14);

        addMarker(mapLatLng, map, 'אתה פה');
    });

    // click on map makes marker
    // google.maps.event.addListener(map, 'click', function (event) {
    //     addMarker(event.latLng, map, 'נקודה הוספה' ,image_mission);
    // });

}



function addMarker(location, map, label, icon) {
    let marker = new MarkerWithLabel({
        position: location,
        map: map,
        icon: icon,
        labelContent: label,
        labelClass: "my-custom-class-for-label", // the CSS class for the label
        zIndex: 10000
        //,icon: "img/marker/tuseiqui.png"
    });

    // let marker = new google.maps.Marker({
    //     position: location,
    //     animation: google.maps.Animation.DROP,
    //     map: map,
    //     icon: icon,
    //     label: label,
    //     labelClass: "my-custom-class-for-label", // your desired CSS class
    //     labelInBackground: true
    // });


    google.maps.event.addListener(marker, 'click', function (e) {
        let NewMarkerIcon = openModal(null, marker);

    });

    // if (typeof location == 'object'){
    //     printCordinates(location.lat, location.lng, label, map, 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/003-insignia.png');
    // } else {
    //     printCordinates(location.lat(), location.lng(), label, map);
    // }
}

function addMarkerToMap(map, label) {
    // add to mission gps
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let mapLatLng = new google.maps.LatLng(lat, lng);

        map.setCenter(mapLatLng);
        map.setZoom(16);
        // addMarker(mapLatLng, map, label, 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/002-bracelet.png');
    });

}

function addSavedLocations(pos, map) {
    for (let i = 0; i < pos.length; i++) {
        setTimeout(function () {
            addMarker(pos[i], map, pos[i].label, image_pokemon);
        }, i * 100);
    }
}

function init() {

    let $findMeBtn = $('.find-me');
    let map = new google.maps.Map(document.getElementById('map-canvas'), {
        styles: retro
    });
    image_pokemon = 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/004-pokeball.png';
    image_mission = 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/003-insignia.png';

    google.maps.event.addDomListener(window, 'load', initialize(map));

    $findMeBtn.on('click', function (e) {
        e.preventDefault();
        let inputLabel = $('#labelName').val();
        addMarkerToMap(map, inputLabel);
    });

    getLocations = getDB();
    addSavedLocations(getLocations, map);
}

let state = (function () {
    let selection = 0;
    let stateA, stateB, stateIcon;
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