

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
        url: '/mission',
        data: {getLocations:getLocations},
        dataType: 'json',
        done: function (status) {
           console.log(status);
        },
        fail: function(error){
            console.log('error:', error);
        }
    });
}

function deleteMissonDB(id) {
    $.ajax({
        type: "DELETE",
        url: '/mission/delete/'+id,
        dataType: 'json',
        done: function (status) {
           console.log(status);
        },
        fail: function(error){
            console.log('error:', error);
        }
    });
}