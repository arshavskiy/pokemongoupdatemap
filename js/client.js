function getMyData() {
    function reqListener () {
        console.log(this.responseText);
      }
      
      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("GET", "/html");
      oReq.send();
}

function fire() {

    let url_to_scrap = document.querySelector('input[name=scrap]');
    let urlFromUser = url_to_scrap.value;

    let iframe = document.querySelector('#generate object');
    iframe.data = '//' + urlFromUser;

    var someUrl = "/post"; //URL here
    var dataObj = {'data' : urlFromUser };
    var request = new XMLHttpRequest();
    request.open('POST', someUrl);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send( JSON.stringify(dataObj) );
    request.addEventListener('load', function(e) {
        console.log(request.statusText);
    });

}

init = () => {
    let actionBtn = document.querySelector('#enter');
    let actionColor = document.querySelector('object');
    actionBtn.addEventListener('click', fire);


};



window.addEventListener('load', init, false);
