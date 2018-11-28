init = () => {

    function fire() {
        let url_to_scrap = document.querySelector('input[name=scrap]');
        let data = url_to_scrap.value;

        var someUrl = "/post"; //URL here
        var dataObj = {'data' : data };
        var request = new XMLHttpRequest();
        request.open('POST', someUrl);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send( JSON.stringify(dataObj) );
        request.addEventListener('load', function(e) {
            console.log(request.statusText);
        });
    }


    let actionBtn = document.querySelector('#enter');

    actionBtn.addEventListener('click', fire);


}

window.addEventListener('load', init, false);