function init(map) {
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let mapLatLng = new google.maps.LatLng(lat, lng);

        app.setInitLocation(mapLatLng);

        map.setCenter(mapLatLng);
        map.setZoom(17);

        // self locvation marker
        addMarker(mapLatLng, map);
    });

    //add pokestop on click
    addMapEventListeners();

    // document.getElementById('add_mission').addEventListener("click", (e)=>{
    $("#add_mission").off('click').on('click', (e) => {
        panToMyLocation();
        app.setGpsAddMisson(true);
        // $('strong.text-hide').removeClass().addClass('text-show');

        startDate = Math.floor(Date.now() / 1000);
        app.setStartDate(startDate);
        showMissionModal();
        missionModalHandles(e);
    });


   
    // google.maps.event.addListener(map, 'click', (event)=>{
    //     app.setStartDate(startDate);
    //     validateClick(event, startDate);
    // });

}

function initMap() {

    let map = new google.maps.Map(document.getElementById('map-canvas'), {
        // styles: retro
        gestureHandling: "greedy"
    });
    app.setGoogleMap(map);
    google.maps.event.addDomListener(window, 'load', init(map));

    $('.find-me').click(function (e) {
        e.preventDefault();
        // let inputLabel = $('#labelName').val();
        showMyLocation(map, null);
    });
}

function greeder() {
    let userName = getCookie('mapUserName');
  
    if (userName) {
        app.setUserFromCoockie(userName);
        $.amaran({
            'message': "Wellcome Back " + userName,
            position: "top right",
            theme: 'awesome ok'
        });
    }
}


(function getData(path='DB/db_locations.json') {
    return $.getJSON(path)
        .done(function (json) {
            if (typeof json === 'object') {
                app.setGlobalLocation(getLocations = json);
            } else {
                app.setGlobalLocation(getLocations = [{}]);
            }

            map = app.getGoogleMap();

            addSavedLocations(getLocations, map);
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;

            saveToLog(err);

            // if (app.setCount() > 1) return;
            // getData('DB/temp.json');
            // app.setCount();
        })
        .always(function (json) {

            //json db is cleaned
            app.setGlobalLocation(json.responseText ? json : []);
            map = app.getGoogleMap();
        });
}());



initMap();

let getLocations = [];
let markers = [];

window.onload = function () {

    $('.lds-ripple').hide();
    greeder();

    // $('body').css('background', 'linear-gradient(315deg, #8fd87d 0, #24ccaa 80%);');
}