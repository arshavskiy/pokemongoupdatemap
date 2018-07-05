function validateClick(event, startDate, endDate){
    if (endDate - startDate >= 2){
        let inputLabel = 'נקודה הוספה'+ Math.floor(Date.now() / 1000);
        getLocations.push({
            icon:  "",
            label: inputLabel,
            lat:   event.latLng.lat(),
            lng:   event.latLng.lng(),
            startDate: app.getStartDate(),
        });
        saveDB();
        addMarker(event.latLng, map, inputLabel, app.getPokestop_icon());
    }
}


function addMarker(location, map, label, icon) {
    if (typeof location.lat === 'function') {
        mapLatLng = location;
    } else {
        mapLatLng = new google.maps.LatLng(Number(location.lat), Number(location.lng));
    }

    let marker = new MarkerWithLabel({
        position: mapLatLng,
        map: map,
        icon: icon,
        labelContent: label,
        labelClass: "my-custom-class-for-label", // the CSS class for the label
        zIndex: 10000
        //,icon: "img/marker/tuseiqui.png"
    }); 

    //defulat marker
    // let marker = new google.maps.Marker({
    //     position: mapLatLng,
    //     animation: google.maps.Animation.DROP,
    //     map: map,
    //     icon: icon,
    //     label: label,
    //     labelClass: "my-custom-class-for-label", // your desired CSS class
    //     labelInBackground: false
    // });


    google.maps.event.addListener(marker, 'click', function (e) {
        openModal(null, marker);

    });

    // if (typeof location == 'object'){
    //     printCordinates(location.lat, location.lng, label, map, 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/003-insignia.png');
    // } else {
    //     printCordinates(location.lat(), location.lng(), label, map);
    // }
}

function showMyLocation(map, label) {
    // add to mission gps
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let mapLatLng = new google.maps.LatLng(lat, lng);

        map.setCenter(mapLatLng);
        map.setZoom(16);
        // addMarker(mapLatLng, map);
    });

}

function addSavedLocations(pos, map) {
    for (let i = 0; i < pos.length; i++) {
        setTimeout(function () {
            addMarker(pos[i], map, pos[i].label, pos[i].icon || app.getPokestop_icon());
        }, i * 50);
    }
}

function printCordinates(latS, lngS, label, map, iconForlist) {
    let print_cordinates;
    let iconGPSList = "";

    if (label) {
        if (label == "אתה פה") {
            iconGPSList =
                "https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/002-bracelet.png";
        } else if (label == "נקודה הוספה") {
            iconGPSList = image_mission;
        }

        $("<li/>")
            .html(
                `<label class="label_icon"><div class="icon_span"><img src="${
          iconGPSList ? iconGPSList : image_pokemon
        }" class="padding"><b>${label}</b></div></<label>`
            )
            .appendTo("ul.cordinatedList");

        let li = $("ul.cordinatedList li");
        li = li[li.length - 1];
        li.addEventListener("click", function (e) {
            map.setCenter({
                lat: (function () {
                    if (typeof latS == "function") {
                        return latS();
                    } else return latS;
                })(),
                lng: (function () {
                    if (typeof lngS == "function") {
                        return lngS();
                    } else return lngS;
                })()
            });
            map.setZoom(16);
        });
    }

    if (typeof latS == "number") {
        print_cordinates =
            "(" + latS.toFixed(7) + "°" + " : " + lngS.toFixed(7) + "°)";
    } else {
        print_cordinates =
            "(" + latS().toFixed(7) + "°" + " : " + lngS().toFixed(7) + "°)";
    }

    console.log("print_cordinates", print_cordinates);
}

//  Add Random cordinates
function randomCord(pos) {
    let mapLatLng;
    if (!pos) {
        myPosition = {
            lat: function () {
                return Math.random() / 100 + 32.085;
            },
            lng: function () {
                return Math.random() / 100 + 34.771;
            }
        };
        mapLatLng = new google.maps.LatLng(myPosition.lat(), myPosition.lng());
    } else {
        mapLatLng = new google.maps.LatLng(pos.lat, pos.lng);
    }

    map.setCenter(mapLatLng);
    map.setZoom(15);
    let marker = new google.maps.Marker({
        position: mapLatLng,
        animation: google.maps.Animation.DROP,
        map: map,
        icon: image_mission
    });
}