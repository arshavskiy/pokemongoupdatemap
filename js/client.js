function iframeURLChange(iframe, callback) {
    var lastDispatched = null;

    var dispatchChange = function () {
        var newHref = iframe.contentWindow.location.href;

        if (newHref !== lastDispatched) {
            callback(newHref);
            lastDispatched = newHref;
        }
    };

    var unloadHandler = function () {
        // Timeout needed because the URL changes immediately after
        // the `unload` event is dispatched.
        setTimeout(dispatchChange, 0);
    };

    function attachUnload() {
        // Remove the unloadHandler in case it was already attached.
        // Otherwise, there will be two handlers, which is unnecessary.
        iframe.contentWindow.removeEventListener("unload", unloadHandler);
        iframe.contentWindow.addEventListener("unload", unloadHandler);
    }

    iframe.addEventListener("load", function () {
        attachUnload();

        // Just in case the change wasn't dispatched during the unload event...
        dispatchChange();
    });

    attachUnload();
}

// Usage:



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
   
    iframe2.addEventListener("load", function () {
        let data = iframe2.contentWindow.location.href;
        console.log('contentWindow:', iframe2.contentWindow);
        console.log('data', data);
    });

    // iframeURLChange( iframe2, function (newURL) {
    //     console.log("URL changed:", newURL);
    // });

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
            document.querySelector('#img img').src = '/png'  ;
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
        document.querySelector('#img img').src = '';
        document.querySelector('#img img').src = '/png'  ;
       
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
        tbl.style.border = '1px solid gold';
    
    let src = data.foundFromClient;
    let alt = data.parameters;

    let tl = src.length;

    for(var i = 0; i < tl; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 2; j++){
            if(j == 0 ){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(alt[i-1]));
                td.style.border = 'none';
            } else {
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(src[i-1]));
                td.style.border = 'none';
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
        tbl.style.border = '1px solid pink';
    
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
                td.style.border = 'none';
            } else {
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(alt[i-1]));
                td.style.border = 'none';
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


function params() {
    // url=https://en.wikipedia.org/wiki/Podesta_Group
    // find=title
    let params = {};
    let temp;
    let split;
    let urlParsed;
    let url = window.location.href.split('?');
    if (url.length > 1){
        urlParsed = url[1].split('&');
        urlParsed.forEach((p,i)=>{
             temp = p.split('=');
             split = temp[1].split(',');
             params[temp[0]] = split.length > 1 ? split : temp[1]; 
        })
        let input_url = document.getElementById('url');
        let input_find = document.getElementById('find');
        input_url.value = params.url;
        if (split.length > 1){
            input_find.value = split;
            fire();
        } else {
            input_find.value = params.find;
            fire();
        }
    }
   
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

    params();

    actionBtn.addEventListener('click', fire);
    // dataBtn.addEventListener('click', fireData);
    downloadPng.addEventListener('click', getPng);
    downloadPdf.addEventListener('click', getPdf);
    // actionGoToPainted.addEventListener('click', getPng);
    dataTable.addEventListener('click', makeTable);
};

var request = new XMLHttpRequest();
var actionBtnWasClicked = false;


window.addEventListener('load', init, false);
