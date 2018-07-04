getData = (function () {
    return $.getJSON("js/db_locations.json")
        .done(function (json) {
            getLocations = json;
            initMap();
            map = state.getGoogleMap();
            addSavedLocations(getLocations, map);
          

        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
})();

// function getDB() {
//     return getData.responseJSON;
// }

function updateDBicons(marker, new_marker_icon) {
    for (let i in getLocations) {
        if (getLocations[i].label === marker.labelContent) {
            getLocations[i].icon = new_marker_icon;
        }
    }
}

function saveDB() {
    $.ajax({
        type: "POST",
        url: '/post',
        data: {getLocations:getLocations},
        dataType: 'json',
        success: function (data) {
           
        },
        
    });
}