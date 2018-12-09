const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
request = require('request');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const puppeteer = require('puppeteer');

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
    var file = __dirname + '/png/' + screenShotName +'_demo.png';
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



app.post('/post', function (req, res) {
    console.log(req.body.data);
    console.log('req received');

    const go = async () => {
        try {
            const browser = await puppeteer.launch({
                headless: true
            });
            const page = await browser.newPage();
            
            try {
                await page.goto('https://' + req.body.data, {
                    waitUntil: 'networkidle2'
                });    
            } catch (error) {
                console.log(error);
            }
           
            await page.setViewport({ width: 800, height: 600 });
            console.log(page.url());
           
            await page.waitForSelector('img');

            imgUrlList = await page.evaluate(() => {
                let repos = {};
                let data = {};

                repos.div = document.querySelectorAll('div');
                repos.p = document.querySelectorAll('p');
                repos.h3 = document.querySelectorAll('h3');
                repos.a = document.querySelectorAll('a');

                repos.img = document.querySelectorAll('img');
                
                img = Array.from(repos.img);
                p = Array.from(repos.p);
                h3 = Array.from(repos.h3);
                a = Array.from(repos.a);

                img.forEach((i)=>{
                    i.style.border = '1px solid red';
                    i.style.borderRadius = '10px';
                });

                let src = img;
                let alt = img;
                src = src.map(i => i.src+'\n');
                alt = alt.map(i => i.alt+'\n');

                // div = Array.from(repos.div);
                // div.forEach((d)=>{
                //     d.style.color = '#000';
                //     d.style.background = '#fff';
                // });
            
                p.forEach((i) => {
                    i.style.border = '2px solid gold';
                });
                h3.forEach((i) => {
                    i.style.borderTop = '1px solid black';
                    i.style.borderLeft = '1px solid green';
                });
                a.forEach((i) => {
                    i.style.border = '1px solid gold';
                });

                return {src, alt}
                
            });

           

          
           
            htmlUrl = '//' + req.body.data;

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
          
            let urlToFilename = req.body.data;
            screenShotName = urlToFilename.replace(/./g, '_');
            screenShotName = urlToFilename.replace(/\//g, '__');
            await page.screenshot({ path: './png/' + screenShotName +  startDate + '.png', fullPage: true });
            await page.screenshot({ path: './png/'+ screenShotName + '_demo.png', fullPage: true });

            await page.emulateMedia('screen');
            // await page.pdf({
            //     path: './pdf/' + screenShotName + startDate + '.pdf', 
            //     format: 'A4',
            //     margin: {
            //       top: '1in',
            //       bottom: '1in',
            //       left: '1in',
            //       right: '1in'
            //     }
            //   });
            
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

            let closeBroser = await browser.close();

        } catch(e) {
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