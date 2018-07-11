// call the packages we need
const express = require('express'); // call express
const app = express(); // define our app using express
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const utils = require('./server/func');

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
app.use(express.static(__dirname + '/map style'));
app.use(express.static(__dirname + '/icons'));
app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/edit', function (req, res) {
  res.sendFile(path.join(__dirname + '/view/edit.html'));
});

app.post('/mission', function (req, res) {
  let stringifed = JSON.stringify(req.body.getLocations);

  fs.writeFile('DB/db_locations.json', stringifed, 'utf8', function (err) {
    if (err) throw err;
    console.log('complete');
    utils.emailMe(stringifed, 'created');
  });
  res.status(200).end('saved');
});

app.get('/download', function (req, res) {
  res.download(__dirname + '/DB/db_locations.json', 'jsonFile.json');
  utils.emailMe('file', 'downloaded');
});

app.delete('/mission/delete/:label', (req, res) => {
  console.log('token', req.params.label);
  let missionToDelete = req.params.label;

  let filePath = 'DB/db_locations.json';
  let rawdata = fs.readFileSync(filePath);
  let tempdb = JSON.parse(rawdata);

  utils.deletFromArray(tempdb, missionToDelete);
  utils.saveToDB(tempdb);

});

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {}

if ('production' == env) {
  console.log(process.env.NODE_TLS_REJECT_UNAUTHORIZED);
  console.log(process.env.NODE_ENV);
  console.log(process.env.PORT);
}

let port = process.env.PORT || 3000;
// START THE SERVER
app.listen(port, '0.0.0.0', function (err) {
  console.log('server runninng at ' + port);
});

// ROUTES FOR OUR API
var router = express.Router();

router.get('/', function (req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});


router.get('/delete/:token', function (req, res) {
  let filePath = 'DB/db_locations.json';
  if (req.params.token === 'picaro_db') {
    fs.truncate(filePath, 0, function () {
      console.log('done')
    });
    res.json({
      message: 'delete',
      filePath: filePath,
    });
  } else res.status(503).end('503');
});

app.use('/api', router);