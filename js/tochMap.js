function initialize(map) {
    navigator.geolocation.getCurrentPosition(function (position) {

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        let mapLatLng = new google.maps.LatLng(lat, lng);

        map.setCenter(mapLatLng);
        map.setZoom(14);

        addMarker(mapLatLng, map, 'אתה פה');
    });

    // click on map makes marker
    // google.maps.event.addListener(map, 'click', function (event) {
    //     addMarker(event.latLng, map, 'נקודה הוספה' ,image_mission);
    // });

}



function addMarker(location, map, label, icon) {
    var marker = new MarkerWithLabel({
        position: location,
        map: map,
        icon: icon,
        labelContent: label,
        labelClass: "my-custom-class-for-label", // the CSS class for the label
        zIndex: 10000
        //,icon: "img/marker/tuseiqui.png"
    });

    // let marker = new google.maps.Marker({
    //     position: location,
    //     animation: google.maps.Animation.DROP,
    //     map: map,
    //     icon: icon,
    //     label: label,
    //     labelClass: "my-custom-class-for-label", // your desired CSS class
    //     labelInBackground: true
    // });


    google.maps.event.addListener(marker, 'click', function (e) {
        // let labelM = this.labelContent;
        // let iconM = this.icon;
        // let subMenu;

        // let menu = $('.icon-first_menu>div');
        // let menuSecond = $('icon-second_menu>div');
        // let backBtn = $('#back-second_menu');
        // let exitBtn = $('#exit-first_menu');
        // let earnExitBtn = $('#back-earn_menu');

        // let firstMenuModal = $('#pokistopModal');

        // exitBtn.click(function (e) {
        //     $('#pokistopModal').modal('hide');
        // });

        // backBtn.click(function (e) {
        //     $('#pokistopModalSubMenu').modal('hide');
        //     firstMenuModal.modal('show');
        // });
        // earnExitBtn.click(function (e) {
        //     $('#pokistopModalSubEarn').modal('hide');
        //     firstMenuModal.modal('show');
        // });

        // $('#pokistopModal').modal('show');


        openModal();

        $('.new-modal').one("click", function (e) {
            if (e.target.id == 'close') {
                $(this).hide();
                $('.icon-first_menu').empty();
            } else if (e.target.localName == 'img') {
                openModal(e.target.id);
            } else if (e.target.localName != 'div.holder') {
                $(this).hide();
                $('.icon-first_menu').empty();
            } else {
                console.log(e);
            }
        });


        // $('#pokistopModal').on('show.bs.modal', function (e) { });
        // menu.each(function (i, e) {
        //     e.addEventListener('click', function (e) {
        //         switch (e.path[0].id) {
        //             case 'a7':
        //                 $('#pokistopModalSubEarn').modal('show');
        //                 firstMenuModal.modal('hide');
        //                 break;

        //             default:
        //                 $('#pokistopModalSubMenu').modal('show');
        //                 firstMenuModal.modal('hide');

        //                 $('#pokistopModalSubMenu').on('show.bs.modal', function (e) {});
        //         }
        //     });
        // });



    });

    // if (typeof location == 'object'){
    //     printCordinates(location.lat, location.lng, label, map, 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/003-insignia.png');
    // } else {
    //     printCordinates(location.lat(), location.lng(), label, map);
    // }
}

function addMarkerToMap(map, label) {
    // add to mission gps
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let mapLatLng = new google.maps.LatLng(lat, lng);

        map.setCenter(mapLatLng);
        map.setZoom(16);
        // addMarker(mapLatLng, map, label, 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/002-bracelet.png');
    });

}

function addSavedLocations(pos, map) {
    for (let i = 0; i < pos.length; i++) {
        setTimeout(function () {
            addMarker(pos[i], map, pos[i].label, image_pokemon);
        }, i * 100);
    }
}

function init() {

    let $findMeBtn = $('.find-me');
    let map = new google.maps.Map(document.getElementById('map-canvas'), {
        styles: retro
    });
    image = 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/sun.png';
    image_pokemon = 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/004-pokeball.png';
    image_mission = 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/003-insignia.png';

    google.maps.event.addDomListener(window, 'load', initialize(map));

    $findMeBtn.on('click', function (e) {
        e.preventDefault();
        let inputLabel = $('#labelName').val();
        addMarkerToMap(map, inputLabel);
    });

    addSavedLocations(locations, map);
}

let state = (function () {
    let selection = 0;
    let stateA, stateB;
    return {
        count: function () {
            return selection++;
        },
        setA: function (a) {
            stateA = a;
        },
        setB: function (b) {
            stateB = b;
        },
        getA: function () {
            return stateA;
        },
        getB: function () {
            return stateB;
        },
        a: function (id) {
            return id.includes("a") ? id : "";
        },
        b: function (id) {
            return id.includes("b") ? id : "";
        },
    };
})();

window.onload = function () {
    init();
    // let modal = document.querySelector('.new-modal');
    // let closeModalbtn = modal.querySelector('.close');
    // closeModalbtn.onclick = function () {
    //     modal.style.display = "none";
    // }

}