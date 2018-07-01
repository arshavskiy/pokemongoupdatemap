
getData = (function () {
    return $.getJSON("js/db_locations.json")
        .done(function (json) {
            return json.location;
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
})();

function getDB() {
    return getData.responseJSON.location;
}


function saveDB(item, marker) {
    $.ajax({
        type: "POST",
        url: 'server/server.php',
        data: item,
        success: function (data) {
            console.log('success', data);
        },
        dataType: function (data) {
            console.log('dataType', data);
        }
    });
}