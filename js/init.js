function init(map) {
    navigator.geolocation.getCurrentPosition(function (position) {

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        let mapLatLng = new google.maps.LatLng(lat, lng);

        state.setInitLocation(mapLatLng);

        map.setCenter(mapLatLng);
        map.setZoom(16);

        addMarker(mapLatLng, map);
    });

    //add pokestop on click
    let startDate, endDate;
    google.maps.event.addListener(map, 'mousedown', function (event) {
        startDate = Math.floor(Date.now() / 1000);
        console.log('startDate', startDate);
    });
    google.maps.event.addListener(map, 'mouseup', function (event) {
        endDate = Math.floor(Date.now() / 1000);
        console.log('endDate' , endDate);
        validateClick(event);
    });
    function validateClick(event){
        if (endDate - startDate >= 2){
            let inputLabel = 'נקודה הוספה'+ Math.floor(Date.now() / 1000);
            getLocations.push({
                icon:  "",
                label: inputLabel,
                lat:   event.latLng.lat(),
                lng:   event.latLng.lng()
            });
            saveDB();
            addMarker(event.latLng, map, inputLabel, state.getPokestop_icon());
        }
    }


}

function addMarker(location, map, label, icon) {


    if (typeof location.lat === 'function') {
        mapLatLng = location;
    } else {
        mapLatLng = new google.maps.LatLng(Number(location.lat), Number(location.lng));
    }

    let marker = new MarkerWithLabel({
        position: mapLatLng,
        map: map,
        icon: icon,
        labelContent: label,
        labelClass: "my-custom-class-for-label", // the CSS class for the label
        zIndex: 10000
        //,icon: "img/marker/tuseiqui.png"
    }); 

    // let marker = new google.maps.Marker({
    //     position: mapLatLng,
    //     animation: google.maps.Animation.DROP,
    //     map: map,
    //     icon: icon,
    //     label: label,
    //     labelClass: "my-custom-class-for-label", // your desired CSS class
    //     labelInBackground: false
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
    for (let i = 0; i < pos.length; i++) {
        setTimeout(function () {
            addMarker(pos[i], map, pos[i].label, pos[i].icon || state.getPokestop_icon());
        }, i * 50);
    }
}

function initMap() {

    let map = new google.maps.Map(document.getElementById('map-canvas'), {
        styles: retro
    });
    state.setGoogleMap(map);
    google.maps.event.addDomListener(window, 'load', init(map));

  

    $('.find-me').click(function (e) {
        e.preventDefault();
        // let inputLabel = $('#labelName').val();
        showMyLocation(map, null);
    });

  
}

let state = (function () {
    let selection = 0;
    let stateA, stateB, stateIcon, initLocation, newLocation, image_pokestop, gooleMap; 
    return {
        setGoogleMap:(gm)=> {
            console.log(2);
            gooleMap = gm;
        },
        getGoogleMap:()=> { 
            console.log(3);
            return gooleMap
        },
        getPokestop_icon: () => image_pokestop = 'https://vignette.wikia.nocookie.net/pokemongo/images/8/87/Pok%C3%A9_Ball.png/revision/latest/scale-to-width-down/32',
        setPokestop_icon: (icon) => image_pokestop = icon,
        setA: (a) => stateA = a,
        getA: () => stateA,
        setB: (b) => stateB = b,
        getB: () => stateB,
        setIcon: (icon) => stateIcon = icon,
        getIcon: ()=> stateIcon,
        setInitLocation: (location)=> initLocation = location,
        setNewLocation: (New_location)=> newLocation = New_location,
        getInitLocation: () => initLocation,
        getNewLocation: () => newLocation,
        count: () => selection++,
        a: (id) => id.includes("a") ? id : "",
        b: (id) => id.includes("b") ? id : "",
    };
})();


$(() => {
    console.log(5);
});

window.onload = function(){
    console.log(6);
    $('.lds-ripple').hide();
    $('body').css('background','#fff');
}
