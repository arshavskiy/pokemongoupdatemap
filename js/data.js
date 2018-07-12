// function getDB() {
//     return getData.responseJSON;
// }

function updateDBicons(new_marker_icon) {
    for (let i in getLocations) {
        if (getLocations[i].label === app.getLabelMarker()) {
            getLocations[i].icon = new_marker_icon;
        }
    }
}

function saveDB() {
    $.ajax({
        type: "POST",
        url: '/mission',
        data: {
            getLocations: getLocations
        },
        dataType: 'json',
        done: function (status) {
            console.log(status);
        },
        fail: function (error) {
            console.log('error:', error);
        }
    });
}

function deleteMissionDB(id) {
    $.ajax({
        type: "DELETE",
        url: '/mission/delete/' + id,
        dataType: 'json',
        done: function (status) {
            console.log(status);
        },
        fail: function (error) {
            console.log('error:', error);
        }
    });
}