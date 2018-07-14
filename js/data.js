

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


function cleanEmptyMarkers(arr=getLocations, deleteMemeber='') {

    console.log('deletFromArray.arr', arr);
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].icon == deleteMemeber) {
            console.log(arr[i]);
            arr.splice(i, 1);
        }
    }
    console.log('deletFromArray.arr', arr);
}


function saveDB() {
    cleanEmptyMarkers();
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