function getMyData() {
    function reqListener () {
        console.log(this.responseText);
      }
      request.addEventListener("load", reqListener);
      request.open("GET", "/html");
      request.send();
}

function reqListener () {
    console.log(this.statusText);
   
}

function fire() {
    let url_to_scrap = document.querySelector('input[name=scrap]');
    let urlFromUser = url_to_scrap.value;

  
    iframe.style.display = 'block';

    iframe.data = '//' + urlFromUser;
    var someUrl = "/post"; //URL here
    var dataObj = {'data' : urlFromUser };

    request.addEventListener("load", reqListener);
    request.addEventListener("progress", reqListener);
    request.addEventListener("error", reqListener);
    request.addEventListener("abort", reqListener);

    request.open('POST', someUrl);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send( JSON.stringify(dataObj) );
 

    actionBtnWasClicked = true;
}

function gotoRenderedFile(params) {
    if (actionBtnWasClicked) {
        // document.getElementById('my_iframe_rendered').src = '/edit';
        document.getElementById('my_object_rendered').style.display = 'block';
        document.getElementById('my_object_rendered').data = '/edit';
        request.open("GET", "/edit");
        // request.addEventListener("load", ()=>{
        //     if( this.responseText){
        //         document.getElementById('my_object_rendered').style.display = 'block';
        //         document.getElementById('my_object_rendered').data ='html/demo.html';
                
        //     }
        // });
        request.send();
    }
}

function getPng() {
    if (actionBtnWasClicked) {
        document.getElementById('my_iframe').src = '/png';
        request.open("GET", "/png");
        request.addEventListener("load", reqListener);
        request.send();
    }
}

function getPdf() {
    if (actionBtnWasClicked) {
    document.getElementById('my_iframe').src = '/pdf';
    request.open("GET", "/pdf");
    request.addEventListener("load", reqListener);
    request.send();
    }
}


init = () => {
    iframe = document.getElementById('my_object_rendered');
    let actionBtn = document.querySelector('#enter');
    let downloadPng = document.querySelector('#download_png');
    let downloadPdf = document.querySelector('#download_pdf');
    let actionGoToPainted = document.querySelector('#go_to_html');

    let actionColor = document.querySelector('object');

    actionBtn.addEventListener('click', fire);
    downloadPng.addEventListener('click', getPng);
    downloadPdf.addEventListener('click', getPdf);
    actionGoToPainted.addEventListener('click', gotoRenderedFile);
};

var request = new XMLHttpRequest();
var actionBtnWasClicked = false;

window.addEventListener('load', init, false);
