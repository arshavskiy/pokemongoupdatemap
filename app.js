// call the packages we need
const express = require('express'); // call express
const app = express(); // define our app using express
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const _ = require('lodash');

const utils = require('./server/func');
let env = utils.env;

// var mongoPassword = 'udacha3100186681984';
			
// var server = http.createServer(function(req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });

//   var config = JSON.parse(process.env.APP_CONFIG);
//   var MongoClient = require('mongodb').MongoClient;

//   MongoClient.connect(
//     "mongodb://" + config.mongo.user + ":" + encodeURIComponent(mongoPassword) + "@" + 
//     config.mongo.hostString, 
//     function(err, db) {
//       if(!err) {
//         res.end("We are connected to MongoDB");
//       } else {
//         res.end("Error while connecting to MongoDB");
//       }
//     }
//   );
// });
// server.listen(process.env.PORT);


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


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/edit', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/edit.html'));
});
app.get('/db', function (req, res) {
    res.sendFile(path.join(__dirname + '/DB/db_locations.json'));
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
    utils.saveToLogFile(logToSave, res);
});


app.delete('/mission/delete/:label', (req, res) => {

    utils.saveToLogFile('DB/db_locations.json', res);

    let missionToDelete = req.params.label;
    let filePath = 'DB/db_locations.json';
    let rawdata = fs.readFileSync(filePath);
    let tempdb = JSON.parse(rawdata);

    try {
        utils.deletFromArray(tempdb, missionToDelete, res);
    } catch (e) {
        console.log(e);
        if (e) {
            res.status(400).end('err deleting mission');
        }
    }
    
    // utils.saveToDB(tempdb);
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

router.get('/delete/:token', function (req, res) {
    let filePath = 'DB/db_locations.json';
    if (req.params.token === 'luna') {
        fs.truncate(filePath, 0, function () {
            console.log('db_locations.json deleted');
        });
        res.status(200).end('delete');
    } else {
        res.status(503).end('503');
    }
});


app.use('/api', router);