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
    let parameters = document.querySelector('input[name=parameters]');

    urlFromUser = url_to_scrap.value;
    parametersFromUser = parameters.value;
   
    // open url in iframe

    // iframe.style.display = 'block';
    iframe2.style.display = 'block';
    // iframe.data = '//' + urlFromUser;
    iframe2.src = '//' + urlFromUser;

    var someUrl = "/post"; //URL here
    var dataObj = { 
        'data' : urlFromUser,
        'parameters': parametersFromUser 
    };

    request.addEventListener("load", reqListener);
    request.addEventListener("progress", reqListener);
    request.addEventListener("error", reqListener);
    request.addEventListener("abort", reqListener);

    request.open('POST', someUrl);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send( JSON.stringify(dataObj) );
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            // alert(request.responseText);
            // document.getElementById('my_object_rendered').style.display = 'block';
            // document.getElementById('my_object_rendered').data = '/edit';
            // document.getElementById('my_iframe').src = '';
            document.querySelector('section#img').style.display = 'block';
            // document.querySelector('#img img').src = '/png/' + urlFromUser + '_demo.png'  ;
            document.querySelector('#img img').src = '/png/demo.png'  ;
        }
    }
 

    actionBtnWasClicked = true;
}

function gotoRenderedFile(params) {
    if (actionBtnWasClicked) {
        let dom = document.getElementById('my_iframe');
        dom.style.display = 'block';
        dom.src = '/edit';
        request.open("GET", "/edit");
        request.send();
    }
}

function getPng() {
    if (actionBtnWasClicked) {

        // urlParsed = urlFromUser.replace(/./g, '_');
        // urlParsed = urlParsed.replace(/\//g, '__');

        urlParsed = urlFromUser.replace(/\//g, '_');

        document.getElementById('my_iframe').src = '/png';
        document.querySelector('section#img').style.display = 'block';
        document.querySelector('#img img').src = '/png/demo.png'  ;
       
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

function makeTable() {

    request.open("GET", "/csv");
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            var tableData = JSON.parse(request.responseText);
            console.debug(tableData);
            tableCreate(tableData);
        }
    }
}

function tableCreate(data){
    var body = document.body,
        tbl  = document.createElement('table');
        tbl.style.height = '200px';
    tbl.style.width  = window.innerWidth * .9;
    tbl.style.border = '1px solid black';
    
    src = data.src;
    alt = data.alt;

    let tl = src.length;


    for(var i = 0; i < tl; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 2; j++){
            if(j == 0 ){
                var td = tr.insertCell();
                let img = document.createElement('img');
                img.src = src[i-1];
                img.style.maxHeight = '80px';
                let div = document.createElement('div')
                td.appendChild(  div.appendChild(img) );
                td.style.border = '1px solid blue';
            } else {
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(alt[i-1]));
                td.style.border = '1px solid black';
                // if(i == 1 && j == 1){
                //     td.setAttribute('rowSpan', '2');
                // }
            }
        }
    }
    let table = document.querySelector('#table');
    table.style.display = 'block';
    table.appendChild(tbl);
}

init = () => {
    iframe = document.getElementById('my_object_rendered');
    iframe2 = document.getElementById('my_object_rendered2');
    let actionBtn = document.querySelector('#enter');
    let downloadPng = document.querySelector('#download_png');
    let downloadPdf = document.querySelector('#download_pdf');
    let actionGoToPainted = document.querySelector('#go_to_html');
    let dataTable = document.querySelector('#go_to_rendered_html');

    let actionColor = document.querySelector('object');

    actionBtn.addEventListener('click', fire);
    downloadPng.addEventListener('click', getPng);
    downloadPdf.addEventListener('click', getPdf);
    actionGoToPainted.addEventListener('click', getPng);
    dataTable.addEventListener('click', makeTable);
};

var request = new XMLHttpRequest();
var actionBtnWasClicked = false;


window.addEventListener('load', init, false);
