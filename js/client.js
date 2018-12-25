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

function fireData() {
    let parametersFromUser = document.querySelector('input[name=parameters]');
    let url_to_scrap = document.querySelector('input[name=scrap]');

    urlFromUser = url_to_scrap.value;
    log();

    let someUrl = "/params"; //URL here
    let dataObj = { 
        'url' : urlFromUser || '',
        'parameters': parametersFromUser.value
    };

    request.open('POST', someUrl);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send( JSON.stringify(dataObj) );
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            document.querySelector('section#img').style.display = 'block';
            document.querySelector('#img img').src = '/png/demo.png'  ;
        }
    }
    actionBtnWasClicked = true;
}

function log(){
    request.addEventListener("load", reqListener);
    request.addEventListener("progress", reqListener);
    request.addEventListener("error", reqListener);
    request.addEventListener("abort", reqListener);
}

function fire() {
    let url_to_scrap = document.querySelector('input[name=scrap]');
    let parameters = document.querySelector('input[name=parameters]');

    urlFromUser = url_to_scrap.value;
    parametersFromUser = parameters.value;
   
    iframe2.style.display = 'block';

    let temp = urlFromUser.split('https://')
                if (typeof temp == 'object' && temp.length == 2){
                    urlFromUser = temp[1];
                } else {
                    temp = urlFromUser.split('http://')
                    if (typeof temp == 'object' && temp.length == 2){
                        urlFromUser = temp[1];
                    } 
                }

    iframe2.src = '//' + urlFromUser;

    let someUrl = "/post"; //URL here
    let dataObj = { 
        'url' : urlFromUser,
        'parameters': parametersFromUser  || ''
    };

    log();

    request.open('POST', someUrl);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send( JSON.stringify(dataObj) );
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            document.querySelector('section#img').style.display = 'block';
            let oldImg = document.querySelector('#img img').src;
            if (oldImg){
                document.querySelector('#img img').src = '';
            }
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
            makeTableFromClient();
        }
    }
    
}

function makeTableFromClient() {

    request.open("GET", "/client");
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            var client = JSON.parse(request.response);
            console.debug(client);
            tableClientCreate(client);
        }
    }
}

function tableClientCreate(data){
    let body = document.body,
        tbl  = document.createElement('table');
        tbl.style.height = '200px';
        tbl.style.width  = '100%';
        tbl.style.border = '1px solid black';
    
    let src = data.foundFromClient;
    let alt = data.parameters;

    let tl = src.length;

    for(var i = 0; i < tl; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 2; j++){
            if(j == 0 ){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(alt[i-1]));
                td.style.border = '1px solid blue';
            } else {
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(src[i-1]));
                td.style.border = '1px solid black';
                // if(i == 1 && j == 1){
                //     td.setAttribute('rowSpan', '2');
                // }
            }
        }
    }
    let table2 = document.querySelector('#table2');
    table2.style.display = 'block';
    table2.appendChild(tbl);
}


function tableCreate(data){
    let body = document.body,
        tbl  = document.createElement('table');
        tbl.style.height = '200px';
        tbl.style.width  = '100%';
        tbl.style.border = '1px solid black';
    
    let src = data.src;
    let alt = data.alt;

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
    let dataBtn = document.querySelector('#data');
    let downloadPng = document.querySelector('#download_png');
    let downloadPdf = document.querySelector('#download_pdf');
    let actionGoToPainted = document.querySelector('#go_to_html');
    let dataTable = document.querySelector('#go_to_rendered_html');
    
    let actionColor = document.querySelector('object');

    actionBtn.addEventListener('click', fire);
    dataBtn.addEventListener('click', fireData);
    downloadPng.addEventListener('click', getPng);
    downloadPdf.addEventListener('click', getPdf);
    actionGoToPainted.addEventListener('click', getPng);
    dataTable.addEventListener('click', makeTable);
};

var request = new XMLHttpRequest();
var actionBtnWasClicked = false;


window.addEventListener('load', init, false);
