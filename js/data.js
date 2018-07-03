getData = (function () {
    return $.getJSON("js/db_locations.json")
        .done(function (json) {
            console.log(json);
            return json;
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
})();

function getDB() {
    
    return getData.responseJSON;
}

function updateDBicons(marker, new_marker_icon) {
    for (let i in getLocations) {
        if (getLocations[i].label === marker.label) {
            getLocations[i].icon = new_marker_icon;
            console.log(marker.label);
            console.log(getLocations[i].icon);
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
            console.log('success', data);
        },
    });
}