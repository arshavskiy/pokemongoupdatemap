function menuEventsSetter(id) {
    $('.new-modal').one("click", function (e) {
        if (e.target.id == 'close') {
            $(this).hide();
            $('.icon-first_menu').empty();
        } else if (e.target.localName == 'img') {

            openModal(e.target.id);
            console.log(e.target);

        } else if (e.target.localName != 'div.holder') {
            $(this).hide();
            $('.icon-first_menu').empty();
        } else {
            console.log(e);
        }
    });
}

function missionFormater(item) {
    for (i in db.main_menu) {
        if (db.main_menu[i].id === item && db.main_menu[i].mission) {
            return db.main_menu[i].id;
        }
    }
}

function openModal(id) {

    let menuItems = db.main_menu;
    let subMenuItems = db.sub_menu;

    let bgColorClass1 = "modal-body-color1";
    let bgColorClass2 = "modal-body-color2";
    let bgColorClass3 = "modal-body-color3";

    if (id) {
        if (id.includes("a")) {
            state.setA(id);
            buildMenu("second_menu_modal", bgColorClass2, subMenuItems);
        } else if (id === 'b1') {
            // missionFormater(state.getA());
            buildMenu("third_menu_modal", bgColorClass3, menuSercher());
        }
    } else {
        buildMenu("first_menu_modal", bgColorClass1, menuItems);

    }

    menuEventsSetter(id);
}

function menuSercher() {
    earn = state.getA();
    for (i in db.main_menu) {
        if (db.main_menu[i].id === earn) {
            return db.main_menu[i].mission;
        }
    }
}

function buildMenu(id, bgColorClass, menuItems) {
    let modalExsist = $(".holder").length;
    let haveMissions = menuItems[0].hasOwnProperty('options');
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
    document.querySelector(".icon-first_menu").prepend(fragment);
    $(".new-modal").attr("id", id);
    $(".new-modal .modal-body").removeClass("modal-body-color1");
    $(".new-modal .modal-body").removeClass("modal-body-color2");
    $(".new-modal .modal-body").removeClass("modal-body-color3");

    $(".new-modal .modal-body").addClass(bgColorClass);
    $(".new-modal").show();
}