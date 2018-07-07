function saveNewMission(gmlinkToParse, event) {
    let gmLatLng;
    $('#exampleModalCenter').hide();

    if (gmlinkToParse){
        let linkToCode = gmlinkToParse.split(/@(.*)?/i);
        if (linkToCode.length>1){
            linkToCode = linkToCode[1].split('?');
            gmLatLng = linkToCode[0].split(',');
            console.log('latLng',gmLatLng[0],gmLatLng[1]);
        }
    }

    let inputLabel = 'new_mission'+ Math.floor(Date.now() / 1000);
    getLocations.push({
        icon:  "",
        label: inputLabel,
        lat:   gmLatLng?gmLatLng[0]:event.latLng.lat(),
        lng:   gmLatLng?gmLatLng[1]:event.latLng.lng(),
        startDate: app.getStartDate(),
    });

    // saveDB();
    openModalMissionSelector(gmLatLng?gmLatLng:event.latLng, map, inputLabel, app.getPokestop_icon());
}

function showMissionModal() {
    $('#exampleModalCenter').css({
        'opacity':'1',
        'display':'block',
        
        });
    $('.new-modal2').css({'opacity':'1', 'display':'block'});
    return;
}

function missionModalHandles(event) {
    document.getElementById("okBtn").addEventListener("click", function () {
        gm_link = $("input[name='gm_link']").val();
        token = $('#password').val();
        if (token== app.getToken()){
            saveNewMission(gm_link, event);
        }
    });

    document.getElementById("cancelBtn").addEventListener("click", function () {
        $('#exampleModalCenter').hide();
    });

    $("input[name='gm_link']").keypress(function (e) {
        gm_link = $("input[name='gm_link']").val();
        token = $('#password').val();

        if (e.which == 13) {
            if (token== app.getToken()){
                saveNewMission();
            }
          return false;    //<---- Add this line
        }
      });
}

function validateClick(event, startDate, endDate){
    if (endDate - startDate >= 2){

        let gm_link;
        let token;

        showMissionModal();
        missionModalHandles(event);
    }
}

function openModalMissionSelector(location, map, label, icon) {
    if (typeof location.lat === 'function') {
        mapLatLng = location;
    } else {
        mapLatLng = new google.maps.LatLng(Number(location[0]?location[0]:location.lat), Number(location[1]?location[1]:location.lng));
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
      openModal(null, marker);
}

function addMarker(location, map, label, icon) {
    if (typeof location.lat === 'function') {
        mapLatLng = location;
    } else {
        mapLatLng = new google.maps.LatLng(Number(location[0]?location[0]:location.lat), Number(location[1]?location[1]:location.lng));
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
        // TODO edit modal with pass
        // openModal(null, marker);
        console.log('do edit');
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