function menuEventsSetter(marker) {

    $('.new-modal').one("click", function (e) {
        if (e.target.id == 'close') {
            $(this).hide();
            $('.icon-first_menu').empty();
        } else {
            let check_modal_icon_clicked = $('.new-modal')[0].id;
            if (check_modal_icon_clicked == 'third_menu_modal' || check_modal_icon_clicked == 'second_menu_modal') {
                if (e.target && e.target.src) {

                    icon = e.target.src;

                
                    state.setIcon(icon);
                    setMarkerIcon(icon, marker);

                    objectForSave = e.target;
                    // saveDB(objectForSave, marker);

                }
            }
            openModal(e.target.id, marker);

        }
    });
}

function setMarkerIcon(icon, marker) {
   
    let new_marker_icon = state.getIcon();
   
    if (new_marker_icon) {
        marker.setIcon(new_marker_icon + '/revision/latest/scale-to-width-down/64');
        updateDBicons(marker, new_marker_icon + '/revision/latest/scale-to-width-down/64');
        saveDB();
    }

    closeModal();
}

function closeModal(params) {
    if($('.new-modal').length > 0){
        $('.new-modal').hide();
    }
}

function missionFormater(item) {
    for (i in db.main_menu) {
        if (db.main_menu[i].id === item && db.main_menu[i].mission) {
            return db.main_menu[i].id;
        }
    }
    return false;
}

function openModal(id, marker) {

    let menuItems = db.main_menu;
    let subMenuItems = db.sub_menu;

    let bgColorClass1 = "modal-body-color1";
    let bgColorClass2 = "modal-body-color2";
    let bgColorClass3 = "modal-body-color3";

    let isModalOpen = $('.new-modal');

    if (id) {
        if (id.includes("a")) {
            state.setA(id);
            buildMenu("second_menu_modal", bgColorClass2, subMenuItems);
            menuEventsSetter(marker);
        } else if (id.includes("b")) {
            if (id === 'b1') {
                if (missionFormater(state.getA()))
                    buildMenu("third_menu_modal", bgColorClass3, menuSearcher());
                menuEventsSetter(marker);
            } else if (isModalOpen.id) {
                console.log(id);
            }
        }
    } else {
        buildMenu("first_menu_modal", bgColorClass1, menuItems);
        menuEventsSetter(marker);
    }

}

function menuSearcher() {
    earn = state.getA();
    for (i in db.main_menu) {
        if (db.main_menu[i].id === earn) {
            return db.main_menu[i].mission;
        }
    }
}

function buildMenu(id, bgColorClass, menuItems) {
    let modalExsist = $(".holder").length;
    let haveMissions = false;

    $('.icon-first_menu').removeClass('icon_last_menu');
    $(".new-modal .modal-body").removeClass("modal-body-color1");
    $(".new-modal .modal-body").removeClass("modal-body-color2");
    $(".new-modal .modal-body").removeClass("modal-body-color3");


    if (menuItems) {
        haveMissions = menuItems[0].hasOwnProperty('options') ? true : false;
    }

    let fragment = document.createDocumentFragment();

    if (haveMissions) {

        console.log('mission', menuItems);
        if (modalExsist > 0) {
            $(".holder").empty();
            $(".holder").remove();
        }

        $("<div>", {
            class: "holder"
        }).appendTo(".icon-first_menu");
        $('.icon-first_menu').addClass('icon_last_menu');

        menuItems.forEach(function (v) {

            let div_holder = document.querySelector(".holder");
            let cln = div_holder.cloneNode(true);
            let p = document.createElement("p");
            p.innerText = v.name;

            v.options.forEach(function (icon) {

                let img = document.createElement("img");
                img.src = icon;
                img.classList.add('icon_gold');
                cln.appendChild(img);
            });

            $("<div>", {
                class: "holder"
            }).appendTo(".icon-first_menu");

            cln.appendChild(p);
            fragment.append(cln);
        });

    } else {

        if (menuItems) {
            menuItems.forEach(function (v) {
                if ($(".holder").length > 0) {
                    $(".holder").empty();
                    $(".holder").remove();
                }

                let img = document.createElement("img");
                img.id = v.id;
                img.src = v.icon;
                let p = document.createElement("p");
                p.innerText = v.name;

                $("<div>", {
                    class: "holder"
                }).appendTo(".icon-first_menu");

                let div_holder = document.querySelector(".holder");
                let cln = div_holder.cloneNode(true);
                cln.appendChild(img);
                cln.appendChild(p);
                fragment.append(cln);
            });
        }
    }

    document.querySelector(".icon-first_menu").prepend(fragment);

    $(".new-modal").attr("id", id);
    $(".new-modal .modal-body").addClass(bgColorClass);
    $(".new-modal").show();
}