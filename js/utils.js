function saveNewMission(gmlinkToParse, event) {
    let gmLatLng;
    $("#exampleModalCenter").hide();
    gmLatLng = parseGoolgeLink(gmlinkToParse);
    let inputLabel = "new_mission" + Math.floor(Date.now() / 1000);

    if (!gmLatLng) {

        $('.lds-ripple').show();
        let btnAddMissionByGPS = app.getGpsAddMisson();

        if (btnAddMissionByGPS) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                gmLatLng = [lat, lng];

                getLocations.push({
                    icon: "",
                    label: inputLabel,
                    lat: gmLatLng[0],
                    lng: gmLatLng[1],
                    startDate: app.getStartDate(),
                    user: app.getTokenUsed(),
                });
                console.log('gmLatLng', gmLatLng);

                openModalMissionSelector(
                    gmLatLng,
                    map,
                    inputLabel,
                    app.getPokestop_icon()
                );

                // let mapLatLng = new google.maps.LatLng(lat, lng);
                // map.setCenter(mapLatLng);
                // map.setZoom(16);
            });
        } else {
            let lat = event.latLng.lat();
            let lng = event.latLng.lng();

            getLocations.push({
                icon: "",
                label: inputLabel,
                lat: lat,
                lng: lng,
                startDate: app.getStartDate(),
                user: app.getTokenUsed(),
            });

            console.log('gmLatLng', gmLatLng);

            openModalMissionSelector(
                event.latLng,
                map,
                inputLabel,
                app.getPokestop_icon()
            );
        }
        // let mapLatLng = new google.maps.LatLng(lat, lng);
        // map.setCenter(mapLatLng);
        // map.setZoom(16);
    } else {
        getLocations.push({
            icon: "",
            label: inputLabel,
            lat: gmLatLng[0],
            lng: gmLatLng[1],
            startDate: app.getStartDate(),
            user: app.getTokenUsed(),
        });

        openModalMissionSelector(
            gmLatLng,
            map,
            inputLabel,
            app.getPokestop_icon()
        )

    }
}

function panToMyLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let mapLatLng = new google.maps.LatLng(lat, lng);
        map.setCenter(mapLatLng);
        map.setZoom(18);
    });
}

function parseGoolgeLink(gmlinkToParse) {
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#,?&//=]*)/gi;
    var regex = new RegExp(expression);
    let google_link_valid = gmlinkToParse.match(regex);

    if (google_link_valid) {
        let linkToCode = gmlinkToParse.split(/@(.*)?/i);
        if (linkToCode.length > 1) {
            linkToCode = linkToCode[1].split("?");
            return gmLatLng = linkToCode[0].split(",");
            console.log("latLng", gmLatLng[0], gmLatLng[1]);
        } else if (linkToCode.length == 1) {
            linkToCode = linkToCode[0].split("=");
            return gmLatLng = linkToCode[linkToCode.length - 1].split(",");
            console.log("latLng", gmLatLng[0], gmLatLng[1]);
        }
    } else return;
}

function showMissionModal() {
    $("#exampleModalCenter").css({
        opacity: "1",
        display: "block"
    });
    $(".new-modal2").css({
        opacity: "1",
        display: "block"
    });

    $("#password").focus();
}

function missionModalHandles(event) {
    let gm_link = $("input[name='gm_link']");
    let gm_link_vallue = gm_link.val();
    let input = $("#password");


    $("#okBtn").off('click').on('click', function(){
    // document.getElementById("okBtn").addEventListener("click", function () {
        let token = input.val();
        let index =  app.getToken(token);
        if (index>=0) {
            // setHeaderGps();
            app.setTokenUsed(token);
            saveNewMission(gm_link_vallue, event);

        } else {
            input.toggleClass('wrong');
        }
    });
    $("#cancelBtn").off('click').on('click', function(){
    // document.getElementById("cancelBtn").addEventListener("click", function () {
        $("#exampleModalCenter").hide();
    });

    gm_link.keypress(function (e) {

        if (e.which == 13) {
            let index =  app.getToken(token);
            if (index>=0) {
                // setHeaderGps();
                saveNewMission();
            }
            return false; //<---- Add this line
        }
    });
}

// function setHeaderGps() {
//     if(app.getGpsAddMisson()){
//         app.setGpsAddMisson(false);
//         if ($('strong.text-show').length) {
//             $('strong.text-show').removeClass().addClass('text-hide');
//         }
//     } 
// }

function validateClick(event, startDate, endDate) {
    if (endDate - startDate >= 2) {
        let gm_link;
        let token;

        showMissionModal();
        missionModalHandles(event);
    }
}

function openModalMissionSelector(location, map, label, icon) {

    console.log('location', location);

    if (typeof location.lat === "function") {
        mapLatLng = location;
    } else {
        mapLatLng = new google.maps.LatLng(
            Number(location[0] ? location[0] : location.lat),
            Number(location[1] ? location[1] : location.lng)
        );
    }

    console.log('mapLatLng', mapLatLng);

    let marker = new MarkerWithLabel({
        position: mapLatLng,
        map: map,
        icon: icon,
        labelContent: label,
        labelClass: "my-custom-class-for-label", // the CSS class for the label
        zIndex: 10000,
        //,icon: "img/marker/tuseiqui.png"
    });
    openModal(null, marker);
}

function addMarker(location, map, label, icon ) {
    if (!icon){
        // icon='https://vignette.wikia.nocookie.net/pokemongo/images/4/49/Trainer.png/revision/latest/scale-to-width-down/70';
        icon='marker.png';
    }
    if (typeof location.lat === "function") {
        mapLatLng = location;
    } else {
        mapLatLng = new google.maps.LatLng(
            Number(location[0] ? location[0] : location.lat),
            Number(location[1] ? location[1] : location.lng)
        );
    }

    let marker = new MarkerWithLabel({
        position: mapLatLng,
        map: map,
        icon: icon,
        draggable: false,
        raiseOnDrag: true,
        labelContent: label,
        labelClass: "my-custom-class-for-label", // the CSS class for the label
        zIndex: 10000,
        animation: google.maps.Animation.DROP
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
    let startDate, endDate;

    google.maps.event.addListener(marker, "mousedown", function (e) {
        startDate = Math.floor(Date.now() / 1000);
        app.setStartDate(startDate);
    });

    google.maps.event.addListener(marker, "mouseup", function (e) {
        endDate = Math.floor(Date.now() / 1000);
        if (endDate - startDate >= 1) {
            if ($('.login_edit_modal').length == 0) {
                open_login_edit_modal(null, marker);
            } else return;
        }
    });

    // if (typeof location == 'object'){
    //     printCordinates(location.lat, location.lng, label, map, 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/003-insignia.png');
    // } else {
    //     printCordinates(location.lat(), location.lng(), label, map);
    // }
}

function deleteAndHideElement(elm, t) {
    $(elm).hide(400);
    setTimeout(() => {
        deleteFromDOM(elm);
    }, t);
}

function deleteFromDOM(item) {
    item.parent().remove();
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
            addMarker(
                pos[i],
                map,
                pos[i].label,
                pos[i].icon || ''
            );
        }, i * 50);
    }
}

function sizeMap(linkIcon) {

    let big_size_icon = 56;
    let medium_size_icon = 100;
    let small_size_icon = 120;
    if (linkIcon.includes('Rare_Candy')) return big_size_icon;
    if (linkIcon.includes('Fast_TM')) return big_size_icon;
    if (linkIcon.includes('Stardust')) return big_size_icon;
    if (linkIcon.includes('Berries')) return big_size_icon;
    if (linkIcon.includes('Pok%C3%A9_Balls')) return big_size_icon;
    if (linkIcon.includes('Revives')) return big_size_icon;
    if (linkIcon.includes('Potions')) return big_size_icon;
    if (linkIcon.includes('Chansey')) return big_size_icon;
    if (linkIcon.includes('Lickitung')) return medium_size_icon;
    if (linkIcon.includes('Onix')) return big_size_icon;
    if (linkIcon.includes('Gastly')) return big_size_icon;
    else return small_size_icon;
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

            li.off('click').on('click', (e)=>{
            // li.addEventListener("click", function (e) {
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