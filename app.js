const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
request = require('request');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const puppeteer = require('puppeteer');

parameters = [];

app.use(cors({
    allowedHeaders: 'Content-Type, Cache-Control'
}));
app.options('*', cors()); // enable pre-flight app.use(bodyParser.json({ verify: rawBodyHandler }));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/DB'));
// app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/pdf'));
app.use(express.static(__dirname + '/png'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/pdf', function(req, res){
    var file = __dirname + '/pdf/' + screenShotName + '_demo.pdf';
    res.download(file);
  });

app.get('/png', function(req, res){
    var file = __dirname + '/png/demo.png';
    res.download(file);
  });

app.get('/csv', function(req, res){
    let promise2 = new Promise(function(resolve, reject) {
        resolve(imgUrlList);
        console.log('resolve(imgUrlList)');
      });
      
      promise2.then(function(value) {
        res.send(value);
      });
});


app.get('/demo', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/demo.html'));
});

app.get('/', function(req, res, next){
    return res.render('index', { title: 'Automation' });
});

app.get('/edit', function (req, res, next) {
    // res.send(html);
    // let answer = await html
    // answer.then(()=>{
    //     res.send(html);
    // })

    let promise1 = new Promise(function(resolve, reject) {
        resolve(html);
        console.log('resolve(html)');
      });
      
      promise1.then(function(value) {
        res.send(value);
      });
   
});

app.get('/download/:file(*)', function (req, res) {
    var file = req.params.file;
    var fileLocation = path.join('./DB', file);
    res.download(fileLocation), file,
        function (err) {
            if (err) {
                res.status(400).end('error downloading');
            } else {
                res.status(200).end('downloaded');
            }
        }
});


function saveToLogFile(logToSave) {
    startDate = Date.now();
    fs.appendFileSync('DB/log.csv', logToSave + 'at: '+ startDate +'\r\n', function (err) {
        if (err) {
           throw err;
        } else {
            console.log('log ' + ' saved');
            download( 'DB/log.csv' , 'log.csv' , function(){
                console.log('done sending back');
            });
        }
      });
    fs.appendFileSync('DB/log_' + startDate + '.csv', logToSave + 'at: '+ startDate +'\r\n', function (err) {
        if (err) {
           throw err;
        } else {
            console.log('log ' + startDate + ' saved');
            download( 'DB/log_' + startDate + '.csv' , 'log_' + startDate + '.csv' , function(){
                console.log('done sending back');
            });
        }
      });
  }


app.post('/params', (req, res)=>{
    let urlFromClient = req.body.data;
    parameters = req.body.parameters.split(',');

    console.log('parameters1', parameters);

    const go2 = async () => {
        try {

            alert(parameters);

            parameters.forEach((elm)=>{
                let find = document.querySelectorAll(`[class$="${elm}"]`);
                find = Array.from(find);

                console.log('find', find);

                alert(find);

                div = Array.from(document.querySelectorAll('span'));
                div.forEach((d)=>{
                    if (d.textContent && d.textContent.contains(`"${elm}`)){
                        d.style.background = 'gold';
                    };
                });

                if (find.length === 0){

                };
            });

        } catch(e){
            console.log(e);
        };
    }
    (async function main() {
        await go2();
    })();
});



app.post('/post', function (req, res) {
   
    let urlFromClient = req.body.data;

    parameters = req.body.parameters.split(',');

    console.log('parameters1', parameters);

    const go = async () => {
        try {
            const browser = await puppeteer.launch({
                headless: false
            });
            const page = await browser.newPage();
            
            try {
                await page.goto('https://' + urlFromClient, {
                    waitUntil: 'networkidle2'
                });    
            } catch (error) {
                console.log(error);
            }
           
            await page.setViewport({ width: 800, height: 600 });
            await page.waitForSelector('img');

            imgUrlList = await page.evaluate(() => {
                let repos = {};
                let data = {};

                repos.h1 = document.querySelectorAll('h1');
                repos.h2 = document.querySelectorAll('h2');
                repos.a = document.querySelectorAll('a');

                repos.img = document.querySelectorAll('img');
                
                img = Array.from(repos.img);
                h1 = Array.from(repos.h1);
                h2 = Array.from(repos.h2);
                a = Array.from(repos.a);

                img.forEach((i)=>{
                    i.style.border = '1px solid red';
                    i.style.borderRadius = '10px';
                });
                h1.forEach((i) => {
                    i.style.borderLeft = '5px solid blue';
                });
                h2.forEach((i) => {
                    i.style.borderLeft = '5px solid green';
                });
                a.forEach((i) => {
                    i.style.background = '5px solid gold';
                });


                let src = img;
                let alt = img;
                src = src.map(i => i.src+'\n');
                alt = alt.map(i => i.alt+'\n');

                return {src, alt}
                
            });

            htmlUrl = '//' + urlFromClient;

            html = await page.content();  
            console.log('got(html)');
            res.send(html);

            fs.writeFile("./html/demo.html", html, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 
                
            saveToLogFile(imgUrlList);
          
            // saveToLogFile(html);
          
            let urlToFilename = urlFromClient;
            // screenShotName = urlToFilename.replace(/./g, '_');

            screenShotName = urlToFilename.replace(/\//g, '_');

            await page.screenshot({ path: './png/demo.png', fullPage: true });
            // await page.screenshot({ path: './png/' + screenShotName +  startDate + '.png', fullPage: true });

            await page.emulateMedia('screen');
            
            try {
                let makeMYPDF = await page.pdf({
                    path: './pdf/'+ screenShotName + '_demo.pdf', 
                    format: 'A4',
                    margin: {
                      top: '1in',
                      bottom: '1in',
                      left: '1in',
                      right: '1in'
                    }
                  });
            } catch (error) {
                console.log(error);
            }

            // let closeBroser = await browser.close();

        } catch (e) {
            console.log(e);
        }
    };

    (async function main() {
        await go();
    })();

});



let download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


let port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', function (err) {
    console.log('server runninng at ' + port);
});

var router = express.Router();
app.use('/api', router);