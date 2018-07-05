getData = (function () {
    return $.getJSON("js/db_locations.json")
        .done(function (json) {
           
            getLocations = json;
            map = state.getGoogleMap();
            addSavedLocations(getLocations, map);
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
})();


function init(map) {
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let mapLatLng = new google.maps.LatLng(lat, lng);

        state.setInitLocation(mapLatLng);

        map.setCenter(mapLatLng);
        map.setZoom(17);

        addMarker(mapLatLng, map);
    });

    //add pokestop on click
    let startDate, endDate;
    google.maps.event.addListener(map, 'mousedown', function (event) {
        startDate = Math.floor(Date.now() / 1000);
    });
    google.maps.event.addListener(map, 'mouseup', function (event) {
        endDate = Math.floor(Date.now() / 1000);
        validateClick(event);
    });
 
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

initMap();

window.onload = function(){

    $('.lds-ripple').hide();
    $('body').css('background','#fff');
}
