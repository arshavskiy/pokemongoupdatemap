(function (window, google) {

    //map options

    var options = {
            center: {
                lat: 37,
                lng: -122
            },
            zoom: 10
        },
        element = document.getElementById('map-canvas');
    // map
    map = new google.maps.Map(element, options);

}(window, google));