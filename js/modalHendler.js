function menuEventsSetter(marker) {
    let catchTheMenu = $(".new-modal");

    $(".new-modal")[0].onclick = (e) => {
        // $(".new-modal").off('click').on('click', (e)=>{
        // document.getElementsByClassName("new-modal")[0].addEventListener("click", function (e) {
        // $('.new-modal').on("click", function (e) {
        if (e.target.id == 'close') {
            $(".new-modal").hide();
            $('.icon-first_menu').empty();
        } else {

            let check_modal = $('.new-modal')[0].id;
            if (check_modal == 'third_menu_modal' || check_modal == 'second_menu_modal') {
                if (e.target && e.target.src) {
                    icon = e.target.src;
                    if (e.target.id == 'b1') {
                        openModal(e.target.id, marker);
                    } else {
                        app.setIcon(icon);

                        setMarkerIcon(icon, marker);

                        app.setCount();
                        console.log('count', app.getCount());

                        return;
                    }
                    // saveDB(objectForSave, marker);
                }
            } else if (check_modal == 'first_menu_modal') openModal(e.target.id, marker);
            // else if (app.getA() && app.getIcon()) return;
        }
    };
    // setTimeout(() => {
    //     //wait for js
    // }, 100);
}

function setMarkerIcon(icon, marker) {
    let new_marker_icon = app.getIcon();

    if (new_marker_icon) {

        let new_icon_to_save = app.setIcon(new_marker_icon + '/revision/latest/scale-to-width-down/' + sizeMap(new_marker_icon));

        marker.setIcon(new_icon_to_save);

        addMapEventListenersOnNewMarkers(marker);

        updateDBicons(marker, new_icon_to_save);
        saveDB();
    }

    closeModal();
}

function closeModal(params) {
    if ($('.new-modal').length > 0) {
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
    $('.lds-ripple').hide();
    let menuItems = db.main_menu;
    let subMenuItems = db.sub_menu;

    let bgColorClass1 = "modal-body-color1";
    let bgColorClass2 = "modal-body-color2";
    let bgColorClass3 = "modal-body-color3";

    let isModalOpen = $('.new-modal');

    if (id) {
        if (id.includes("a")) {

            app.setA(id);

            console.log('second_menu_modal');

            buildMenu("second_menu_modal", bgColorClass2, subMenuItems || menuSearcher());
            menuEventsSetter(marker);

        } else if (id.includes("b")) {
            if (id === 'b1') {

                if (missionFormater(app.getA()))
                    console.log('third_menu_modal');
                buildMenu("third_menu_modal", bgColorClass3, menuSearcher());
                // menuEventsSetter(marker);

            } else if (isModalOpen.id) {
                console.log(id);
            }
        }
    } else {

        buildMenu("first_menu_modal", bgColorClass1, menuItems);
        console.log('first_menu_modal');
        menuEventsSetter(marker);
    }
}

function menuSearcher() {
    earn = app.getA();
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

    } else if (menuItems) {
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
    $(".new-modal .modal-body").addClass(bgColorClass);
    $(".new-modal").show();
}


function missionModalHandles(event) {
    let gm_link = $("input[name='gm_link']");
    let input = $("#password");
    if (app.getUserFromCoockie()){
        $('#username').val(app.getUserFromCoockie());
    }


    $("#okBtn").off('click').on('click', function () {
        // document.getElementById("okBtn").addEventListener("click", function () {
        let token = input.val();
        let index = app.getToken(token);
        let userName = $('#username').val();
        let gm_link_value = gm_link.val();

        if (index >= 0 && userName) {

            let userNameFromCoockie = getCookie('mapUserName');
            if (!userNameFromCoockie || userNameFromCoockie != userName) {
                setCookie('mapUserName', userName, 9999);
            }
            // setHeaderGps();
            $('#username').removeClass('wrong');
            $("#password").removeClass('wrong');

            app.setTokenUsed(token);
            app.setUserName(userName);

            saveNewMission(gm_link_value, event);

        } else {
            input.toggleClass('wrong');
            $('#username').toggleClass('wrong');
        }
    });
    $("#cancelBtn").off('click').on('click', function () {
        // document.getElementById("cancelBtn").addEventListener("click", function () {
        $("#exampleModalCenter").hide();
    });

    gm_link.keypress(function (e) {

        if (e.which == 13) {
            let index = app.getToken(token);
            if (index >= 0) {
                // setHeaderGps();
                saveNewMission();
            }
            return false; //<---- Add this line
        }
    });
}


function open_login_edit_modal(type, marker) {
    let header = `
        <div class="col text-center">
            <h4 style="color:#fff">
            <span>Edit Mission</span>
            <img src="https://vignette.wikia.nocookie.net/pokemongo/images/8/84/Mp-Icon_Research.png" class="compas" alt="">
            <span>ערוך משימה</span>
        </h4>
        `,
        adminLabel = "",
        bgColor = 'modal-body-color3';
    // adminIcon = `<div style="display: flex; margin-bottom: 20px; font-size:1.2rem">
    //                 <h5>Delete Mission</h5>
    //                 <i id="adminMenu" aria-hidden="true" class="pl-2 pr-2 fa fa-trash" aria-hidden="true"></i>
    //                 <h5>מחק משימה</h5>
    //             </div>
    // `;
    //https://www.google.com/maps/search/?api=1&query=31.785492733328045, 35.214104199213125
    googleMapLink = `<div style="position:relative; top:-26px">
                        <a href="https://www.google.com/maps/search/?api=1&query=${marker.position}" target="_blank">
                        <h6 style="font-size:1.25rem; left: calc(50% - 128px); color:#138496;">Get Directions
                         <img src="https://pokemonil.eu-4.evennode.com/icons/marker.png" height="15px"> נווט למיקום</h6></a></div>`;

    adminIcon = `
                    <i id="adminMenu" aria-hidden="true" class="close_button ml-3 fa fa-trash" aria-hidden="true"></i>
    `;
    //https://www.google.com/maps/search/?api=1&query=31.785492733328045, 35.214104199213125
    // googleMapLink = `<div class="animated infinite bounce">
    //                     <a href="https://www.google.com/maps/search/?api=1&query=${marker.position}" target="_blank">
    //                      <img src="https://pokemonil.eu-4.evennode.com/icons/marker.png" height="40px"></a></div>`;

    if (type == "admin") {
        header = `
        <div class="col text-center">
            <h4 style="color:#fff;font-size: 1.3rem;">
            <span>Delete Mission</span>
            <img src="https://vignette.wikia.nocookie.net/pokemongo/images/8/84/Mp-Icon_Research.png" class="compas" alt="">
            <span>למחוק משימה</span>
        </h4>
        `,
            adminLabel = "_admin";
        adminIcon = "";
        googleMapLink = "";
        bgColor = 'modal-body-color2';
    }

    let first_login_modal = `<div id="login_edit_modal${adminLabel}">
    <div class="new-modalL">
        <div class="modal-content" class="${bgColor}">
            <div class="modal-body">
            <div class="center" style="padding:0">
           
            </div>
                <form>
                    <div class="form-group">
                        <div class="col text-center">
                        ${googleMapLink}
                        <h4 style="color:#fff">${header}</h4>
                        <input style="direction: ltr;" class="mt-2" placeholder="User/משתמש"
                        type="text" id="usernameL${adminLabel}" name="usernameL" minLength="4" required>
                        
                        <input style="direction: ltr;" class="mt-2" placeholder="Password/סיסמה"
                        type="password" id="passwordL${adminLabel}" name="passwordL"
                        minLength="4" required>
                           
                        </div>
                    </div>
                </form>
                <div class="center" style="padding:0">
              
              
                </div>
            </div>
            <div class="center">
                ${adminIcon}
                <i id="cancelBtnL${adminLabel}" class="close_button fa fa-times ml-3" aria-hidden="true"></i>
                <i id="okBtnL${adminLabel}" class="action_button fa fa-check ml-3 aria-hidden="true"></i>
                </form>
            </div>
        </div>
    </div>
</div>`;

    $("<div>")
        .html(first_login_modal)
        .appendTo("#generate");

    $("#login_edit_modal" + adminLabel).show();
    $(".new-modalL").show();
    $("#passwordL" + adminLabel).focus();

    let username = $(`#usernameL${adminLabel}`);
    if (app.getUserFromCoockie()){
        username.val(app.getUserFromCoockie());
    }

    cBtn = document.getElementById("cancelBtnL" + adminLabel);
    oBtn = document.getElementById("okBtnL" + adminLabel);

    $("#cancelBtnL" + adminLabel).off('click').on('click', () => {
        // cBtn.addEventListener("click", function () {
        deleteAndHideElement($("#login_edit_modal" + adminLabel), 400);
    });
    $("#okBtnL" + adminLabel).off('click').on('click', function () {
        // oBtn.addEventListener("click", function () {
        if (adminLabel) {
            let tokenLadminLabel = $("#passwordL" + adminLabel).val();

            if (tokenLadminLabel == app.getSuperToken()) {

                marker.setMap(null);
                deleteMissonDB(marker.labelContent);
                deleteAndHideElement($("#login_edit_modal" + adminLabel), 400);

                // delete icon
                for (var i = getLocations.length - 1; i >= 0; i--) {
                    if (getLocations[i].label == marker.labelContent) {
                        getLocations.splice(i, 1);
                        break;
                    }
                }
            } else {
                $("#passwordL" + adminLabel).toggleClass('wrong');
            }
        } else {
            let tokenL = $("#passwordL" + adminLabel).val();
            let index = app.getToken(tokenL);

            if (index >= 0) {
                app.setTokenUsed(tokenL);
                deleteAndHideElement($("#login_edit_modal" + adminLabel), 400);
                openModal(null, marker);
            } else {
                $("#passwordL" + adminLabel).toggleClass('wrong');
            }
        }
    });

    $("#adminMenu").off('click').on('click', () => {
        // document.getElementById("adminMenu").addEventListener("click", function () {
        deleteAndHideElement($("#login_edit_modal" + adminLabel), 0);
        open_login_edit_modal("admin", marker);
    });
}