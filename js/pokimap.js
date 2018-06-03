
// Check if browser supports the Geolocation API
if (!navigator.geolocation) {

    $findMeBtn.addClass('disabled');
    $('.no-geolocation-support').addClass('visible');

    // Let's use the Geolocation API


} else {
   
        navigator.geolocation.getCurrentPosition(function (position) {

           
            // Get the location coordinates
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            
            // $('.latitude').text(lat.toFixed(6) + '°');
            // $('.longitude').text(lng.toFixed(6) + '°');
            // $('.coordinates').addClass('visible');

            // Create a map and place a marker at the current location
            // https://developers.google.com/maps/documentation/javascript/reference

            var mapLatLng = new google.maps.LatLng(lat, lng);

            var mapOptions = {
                zoom: 15,
                mapTypeControl: false,
                center: mapLatLng,
            };

            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            var mapMarker = new google.maps.Marker({
                position: mapLatLng,
                map: map,
                title: 'Your browser/device places you here',
            });

            // Re-center the map on user location when window/viewport resizes
            $(window).resize(function () {
                google.maps.event.trigger(map, 'resize');
                map.panTo(mapLatLng);
            });
            
            let infoFromIpinfo = $.getJSON('https://ipinfo.io', function (data) {
                    if (data) {
                        return data.ip;
                    }
                }).fail(function () {
                    console.log('no ipinfo');
            });
                     

            console.log('ip', JSON.stringify(infoFromIpinfo));

            let userSteps = [];
            let date = Number;
            let userByIp = Number;

                

            // let itemsArray = localStorage.getItem('79180244241') ? JSON.parse(localStorage.getItem('79180244241')) : [];
            // localStorage.setItem('79180244241', JSON.stringify(itemsArray));
            $findMeBtn = $('.find-me');
            $findMeBtn.on('click', function (e) {
                e.preventDefault();
                
                let myPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    userIp:infoFromIpinfo.responseJSON.ip, 
                }; 
                date = moment().format('L');
                date +=  '_' +  moment().format('L');
                userByIp = infoFromIpinfo.responseJSON.ip;
                userByIp = userByIp.replace(/\./gi,'');
                userByIp += '_';
                userByIp += date;

                // if (userSteps.length>0 && userSteps[length-1] != userByIp){
                //     userSteps.push(userByIp);
                //     userSteps[userByIp] = myPosition;
                // } else {
                //     (userSteps[userByIp] = myPosition);
                // }
                // userByIp = Number(userByIp);

                // itemsArray.push(myPosition);
                localStorage.setItem(userByIp, JSON.stringify(myPosition));
               
                // var data = localStorage.getItem(myPosition.userIp);
                // data = JSON.parse(data)
                // console.log('data', data);
                
            });

        });

};