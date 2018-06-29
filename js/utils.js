function openModal(id) {

    let modalExsist = $('.holder').length;
    let fragment = document.createDocumentFragment();
    let menuItems = db.main_menu;

    $('.new-modal').css('display', 'block');
    $('.new-modal .modal-body').addClass('modal-body-color1');

    if (id) {
        console.log('id', id);

        function buildMenu(id, bgColor, data) {


        }





    }
    if (modalExsist === 1) {




        menuItems.forEach(function (v) {
            let img = document.createElement('img');
            img.id = v.id;
            img.src = v.icon;
            let p = document.createElement('p');
            p.innerText = v.name;

            let div_holder = document.querySelector('.holder');
            let cln = div_holder.cloneNode(true);
            cln.appendChild(img);
            cln.appendChild(p);
            fragment.append(cln);
        });

        document.querySelector('.icon-first_menu').prepend(fragment);
        $('.new-modal').css('display', 'block');
        $('.new-modal .modal-body').addClass('modal-body-color1');

    }

    $('.new-modal').click(function (e) {
        if (e.target.id == 'close') {
            $(this).css('display', 'none');
        } else if (e.target.localName == 'img') {
            openModal(e.target.id);
        } else if (e.target.localName != 'div.holder') {
            $(this).css('display', 'none');
        }
    });


}

function printCordinates(latS, lngS, label, map, iconForlist) {
    let print_cordinates;
    let iconGPSList = '';

    if (label) {
        if (label == 'אתה פה') {
            iconGPSList = 'https://raw.githubusercontent.com/arshavskiy/google_maps_api_page/testing/icons/002-bracelet.png';
        } else if (label == 'נקודה הוספה') {
            iconGPSList = image_mission;
        }

        $('<li/>')
            .html(`<label class="label_icon"><div class="icon_span"><img src="${iconGPSList ? iconGPSList : image_pokemon}" class="padding"><b>${label}</b></div></<label>`)
            .appendTo('ul.cordinatedList');

        let li = $('ul.cordinatedList li');
        li = li[li.length - 1]
        li.addEventListener('click', function (e) {

            map.setCenter({
                lat: (function () {
                    if (typeof latS == 'function') {
                        return latS();
                    } else return latS;
                })(),
                lng: (function () {
                    if (typeof lngS == 'function') {
                        return lngS();
                    } else return lngS;
                })(),
            });
            map.setZoom(16);
        });
    }

    if (typeof latS == 'number') {
        print_cordinates = '(' + latS.toFixed(7) + '°' + ' : ' + lngS.toFixed(7) + '°)';
    } else {
        print_cordinates = '(' + latS().toFixed(7) + '°' + ' : ' + lngS().toFixed(7) + '°)';
    }

    console.log('print_cordinates', print_cordinates);
}

//  Add Random cordinates
function randomCord(pos) {
    let mapLatLng;
    if (!pos) {
        myPosition = {
            lat: function () {
                return (Math.random() / 100) + 32.085;
            },
            lng: function () {
                return (Math.random() / 100) + 34.771;
            }
        }
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
        icon: image_mission,
    });
}