function init(map) {


    //add pokestop on click
    let startDate, endDate, newMarker;
    app.getGoogleMap().on('click', function (event) {
        console.log('event', event); // ev is an event object (MouseEvent in this case)
        startDate = Math.floor(Date.now() / 1000);
        // validateClick(event, startDate, endDate);
        app.setNewLocation(event.latlng);

        let newMarker = new L.Marker(event.latlng);
        app.setMarker(newMarker);
        // map.addLayer(marker);


        showMissionModal();
        missionModalHandles(event);
    });

    // google.maps.event.addListener(map, 'mousedown', function (event) {
    //     startDate = Math.floor(Date.now() / 1000);
    //     app.setStartDate(startDate);
    // });
    // google.maps.event.addListener(map, 'mouseup', function (event) {
    //     endDate = Math.floor(Date.now() / 1000);
    //     validateClick(event, startDate, endDate);
    // });

    document.getElementById('add_mission').addEventListener("click", (e) => {
        panToMyLocation();
        // app.setGpsAddMisson(true);
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
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let mapLatLng = [lat, lng];
        // app.setInitLocation(mapLatLng);

        let mymap = L.map('map-canvas').setView([lat, lng], 20);
        // var mymap = L.map('mapid').setView([51.505, -0.09], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXJzaGF2c2t5IiwiYSI6ImNqamhuaXg5eTNuZDczcG8zeW1maDFzd3QifQ.YWq-0dq132VvGuecFNqRCw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(mymap);

        L.marker([lat, lng]).addTo(mymap);

        app.setGoogleMap(mymap);

        // L.circle([lat, lng], {
        //     color: 'red',
        //     fillColor: '#f03',
        //     fillOpacity: 0.1,
        //     radius: 10
        // }).addTo(mymap);

        // map.setCenter(mapLatLng);
        // map.setZoom(17);

        // self locvation marker
        // addMarker(mapLatLng, mymap);
        if (getLocations.length) {
            addSavedLocations(getLocations);
        }
        init();
    });
    // let map = new google.maps.Map(document.getElementById('map-canvas'), {
    //     // styles: retro
    //     gestureHandling: "greedy"
    // });


    // google.maps.event.addDomListener(window, 'load', init(map));

    $('.find-me').click(function (e) {
        e.preventDefault();
        // let inputLabel = $('#labelName').val();
        showMyLocation(map, null);
    });
}

getData = (function () {
    return $.getJSON("DB/db_locations.json")
        .done(function (json) {
            if (typeof json === 'object') {
                app.setGlobalLocation(getLocations = json);
            } else {
                app.setGlobalLocation(getLocations = [{}]);
            }
            // initMap(getLocations);
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        })
        .always(function (json) {

            //json db is cleaned
            app.setGlobalLocation(json.responseText ? json : [{}]);
            initMap(getLocations);


        });
})();


let getLocations = [];
let markers = [];

window.onload = function () {

    $('.lds-ripple').hide();
    // $('body').css('background', 'linear-gradient(315deg, #8fd87d 0, #24ccaa 80%);');
}