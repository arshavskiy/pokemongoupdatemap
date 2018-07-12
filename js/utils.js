function saveNewMission(gmlinkToParse, event) {
    $("#exampleModalCenter").hide();
    let gmLatLng = parseGoolgeLink(gmlinkToParse);
    let inputLabel = "new_mission" + Math.floor(Date.now() / 1000);

    app.setLabelMarker(inputLabel);

    //if no googlelink inputed
    // if (!gmLatLng) {

    //     $('.lds-ripple').show();

    //     console.log('event', event);

    //     navigator.geolocation.getCurrentPosition(function (position) {
    //         let lat = position.coords.latitude;
    //         let lng = position.coords.longitude;
    //         gmLatLng = [lat, lng];

    //         getLocations.push({
    //             icon: "",
    //             label: inputLabel,
    //             lat: gmLatLng ? gmLatLng[0] : event.latLng.lat,
    //             lng: gmLatLng ? gmLatLng[1] : event.latLng.lng,
    //             startDate: app.getStartDate()
    //         });

    //         app.getGoogleMap().setView(gmLatLng, 22);

    //         openModalMissionSelector(
    //             // gmLatLng ? gmLatLng : event.latLng,
    //             // map,
    //             // inputLabel,
    //             // app.getPokestop_icon()
    //         );

    //         //TODO: pan map
    //     });

    // } else {

    getLocations.push({
        icon: "",
        label: inputLabel,
        lat: gmLatLng ? gmLatLng[0] : event.latlng.lat,
        lng: gmLatLng ? gmLatLng[1] : event.latlng.lng,
        startDate: app.getStartDate()
    });

    if (gmLatLng) {
        app.setNewLocation(gmLatLng);
    }
    console.log('1 afte rparse gmLatLng', gmLatLng);
    console.log('2 afte rparse gmLatLng', gmLatLng);
    console.log('3 app.getNewLocation', app.getNewLocation());

    // openModalMissionSelector();
    openModal(null);
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
        } else if (linkToCode.length == 1) {
            linkToCode = linkToCode[0].split("=");
            return gmLatLng = linkToCode[linkToCode.length - 1].split(",");
        }
    }
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
    document.getElementById("okBtn").addEventListener("click", function () {
        gm_link = $("input[name='gm_link']").val();
        token = $("#password").val();
        if (token == app.getToken()) {
            // setHeaderGps();
            saveNewMission(gm_link, event);
        }
    });

    document.getElementById("cancelBtn").addEventListener("click", function () {
        $("#exampleModalCenter").hide();
    });

    $("input[name='gm_link']").keypress(function (e) {
        gm_link = $("input[name='gm_link']").val();
        token = $("#password").val();

        if (e.which == 13) {
            if (token == app.getToken()) {
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

function openModalMissionSelector() {
    // if (typeof location.lat === "function") {
    //     mapLatLng = location;
    // } else {
    //     mapLatLng = new google.maps.LatLng(
    //         Number(location[0] ? location[0] : location.lat),
    //         Number(location[1] ? location[1] : location.lng)
    //     );
    // }

    // let marker = new MarkerWithLabel({
    //     position: mapLatLng,
    //     map: map,
    //     icon: icon,
    //     labelContent: label,
    //     labelClass: "my-custom-class-for-label", // the CSS class for the label
    //     zIndex: 10000,
    //     //,icon: "img/marker/tuseiqui.png"
    // });

    // addMarker(mapLatLng, mymap);
    openModal(null);
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
        // let mapLatLng = new google.maps.LatLng(lat, lng);

        // map.setCenter(mapLatLng);
        // map.setZoom(16);
        // addMarker(mapLatLng, map);
    });
}

function addSavedLocations(pos) {
    let mymap = app.getGoogleMap();

    let LeafIcon = L.Icon.extend({
        options: {
            shadowUrl: pos[0].icon,
            iconSize: [120, 120],
            shadowSize: [30, 34],
            iconAnchor: [22, 34],
            shadowAnchor: [4, 32],
            popupAnchor: [-3, -36]
        }
    });

    app.setLeafMarker(LeafIcon);

    for (let i = 0; i < pos.length; i++) {

        let new_icon = 'icon' + i;
        new_icon = new LeafIcon({
            iconUrl: pos[i].icon
        });
        let newMarker;

        setTimeout(function () {
            // L.marker([pos[i].lat,pos[i].lng]).addTo(mymap);
            newMarker = new L.Marker([pos[i].lat, pos[i].lng], {
                icon: new_icon,
                title: pos[i].label
            });
            mymap.addLayer(newMarker);
            newMarker.on('click', (e) => {
                console.log('e', e);
                let marker_label = e.sourceTarget.options.title;
                app.setNewLocation(e.latlng);
                app.setLabelMarker(marker_label);
                app.setMarker(newMarker);
                open_login_edit_modal(null);
            });

            // mymap.removeLayer(newMarker);

            // L.marker([pos[i].lat, pos[i].lng], {
            //     icon: new_icon,
            //     title: pos[i].label
            // }).addTo(mymap).on('click', (e) => {
            //     console.log('e', e);
            //     let marker_label = e.sourceTarget.options.title;
            //     app.setNewLocation(e.latlng);
            //     app.setLabelMarker(marker_label);
            //     app.setMarker(e);
            //     open_login_edit_modal(null);
            // });

        }, i * 100);
    }
}

function sizeMap(linkIcon) {

    let big_size_icon = 56;
    let medium_size_icon = 100;
    let small_size_icon = 120;
    if (linkIcon.includes('Rare_Candy')) return small_size_icon;
    if (linkIcon.includes('Fast_TM')) return small_size_icon;
    if (linkIcon.includes('Stardust')) return small_size_icon;
    if (linkIcon.includes('Berries')) return small_size_icon;
    if (linkIcon.includes('Pok%C3%A9_Balls')) return small_size_icon;
    if (linkIcon.includes('Revives')) return small_size_icon;
    if (linkIcon.includes('Potions')) return small_size_icon;
    if (linkIcon.includes('Chansey')) return small_size_icon;
    if (linkIcon.includes('Lickitung')) return small_size_icon;
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