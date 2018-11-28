const express = require('express'); 
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const _ = require('lodash');

const puppeteer = require('puppeteer');

const utils = require('./server/func');
let env = utils.env;

if ('development' == env) {}

if ('production' == env) {
    console.log(process.env.NODE_TLS_REJECT_UNAUTHORIZED);
    console.log(process.env.NODE_ENV);
    console.log(process.env.PORT);
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(cors({
    allowedHeaders: 'Content-Type, Cache-Control'
}));
app.options('*', cors()); // enable pre-flight

// app.use(bodyParser.json({ verify: rawBodyHandler }));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
  }));

//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/DB'));
app.use(express.static(__dirname + '/icons'));
app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/'));

app.post('/post', function (req, res){  
    console.log(req.body.data);
    console.log('req received');

    (async () => {
        /* Initiate the Puppeteer browser */
        console.log('======', req.body.data);
        
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();

        await page.goto('https://' + req.body.data, { waitUntil: 'networkidle2' });
        console.log(page.url()); 

        let data = await page.evaluate(() => {
          let p = document.querySelector('img#hplogo');
          if (p) {
            p.style.border = '1px solid red';
            return p
          } else return 'empty';
        });

        console.log(data);
        // await browser.close();

    })();
 
 });

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/edit.html'));
});
app.get('/db', function (req, res) {
    try{
        res.sendFile(path.join(__dirname + '/DB/db.json'));
    } catch (e){
        saveToLogFile(e);
    }
});

app.post('/mission', function (req, res) {
    let stringifed = JSON.stringify(req.body.getLocations);

    fs.writeFile('DB/db_locations.json', stringifed, 'utf8', function (err) {
        if (err) {
            res.status(400).end('error saving');
            throw err;
        }
        console.log('db saved');
        res.status(200).end('saved');
        if ('production' == env) {
            utils.emailMe(stringifed, 'created');
        }
    });
});
app.post('/log', function (req, res) {

    let logToSave = JSON.stringify(req.body.params);
    utils.saveToLogFile(logToSave);
});
app.get('/download/:file(*)', function (req, res) {
    var file = req.params.file;
    var fileLocation = path.join('./DB', file);
    utils.saveToLogFile('fileLocation');
    res.download(fileLocation), file,
        function (err) {
            if (err) {
                res.status(400).end('error downloading');
            } else {
                res.status(200).end('downloaded');
                if ('production' == env) {
                    utils.emailMe('file', 'downloaded');
                }
            }
        }
});

let port = process.env.PORT || 3000;
// START THE SERVER
app.listen(port, '0.0.0.0', function (err) {
    console.log('server runninng at ' + port);
});

// ROUTES FOR OUR API
var router = express.Router();

app.use('/api', router);