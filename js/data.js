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

function updateDBicons(marker, new_marker_icon) {
    for (let i in getLocations) {
        if (getLocations[i].label === marker.labelContent) {
            getLocations[i].icon = new_marker_icon;
            console.log(marker.labelContent);
            console.log(getLocations[i].icon);
        }
    }
}

function saveDB(item, label) {

    var ajaxGET = new XMLHttpRequest();
    ajaxGET.onreadystatechange = function () {
        if (ajaxGET.readyState == 4) {
            // document.getElementById('content').innerHTML = ajaxGET.responseText;
            console.log('ajaxGET.responseText', ajaxGET.responseText);
        }
    };

    function updateText() {
        ajaxGET.open('GET', 'server/server.php');
        ajaxGET.send();
    }

    var ajaxPost = new XMLHttpRequest();
    ajaxPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    ajaxPost.onreadystatechange = function () {
        if (ajaxPost.readyState == 4) {
            document.getElementById('content').innerHTML = ajaxPost.responseText;
        }
    };

    function updateText(item, label ) {
        ajaxPost.open('POST', 'server/server.php');
        ajaxPost.send('item='+item+'&'+'label='+label);
    }

    var dataString = 'data_to_be_pass=' + item + '&' + label;
    $.ajax({
        type: "POST",
        url: 'server/server.php',
        data: dataString,
        cache: false,
        dataType: 'json',
        success: function () {
            console.log('success', data);
        },
        dataType: function () {
            console.log('dataType', data);
        }
    });
}