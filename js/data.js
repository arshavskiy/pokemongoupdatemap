

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
        error: function(error){
            console.log('error');
        }
    });
}