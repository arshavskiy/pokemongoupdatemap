// call the packages we need
const express = require('express'); // call express
const app = express(); // define our app using express
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function emailMe(data, action) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pokemon.missions@gmail.com',
      pass: 'pokemon.missions84'
    }
  });

  let mailOptions = {
    from: 'pokemon.missions@gmail.com',
    to: 'arshavsky.pasha@gmail.com',
    subject: 'You got new pokestop',
    text: 'That was easy!' + action
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      log(error);
    } else {
      log('Email sent: ' + info.response);
    }
  });
}

function log(log) {
  console.log(log);
}


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
app.get('/edit',function(req,res){
  res.sendFile(path.join(__dirname+'/view/edit.html'));
});

app.post('/mission', function (req, res) {
  let stringifed = JSON.stringify(req.body.getLocations);

  fs.writeFile('DB/db_locations.json', stringifed, 'utf8', function (err) {
    if (err) throw err;
    log('complete');
    emailMe(stringifed);
  });
  res.status(200).end('saved');
});

app.delete('/mission/delete/:label', (req, res) => {
  console.log('token', req.params.label);
  let missionToDelete = req.params.label;

  let filePath = 'DB/db_locations.json';
  let rawdata = fs.readFileSync(filePath);
  let tempdb = JSON.parse(rawdata);

  deletFromArray(tempdb, missionToDelete);
  saveToDB(tempdb);

});

function deletFromArray(arr, deleteMemeber) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i].label == deleteMemeber) {
      console.log(arr[i]);
      arr.splice(i, 1);
      break;
    }
  }
  emailMe(deleteMemeber, 'deleted');
}

function saveToDB(data) {
  let stringifed = JSON.stringify(data);
  fs.writeFile('DB/db_locations.json', stringifed, 'utf8', function (err) {
    if (err) throw err;
    log('complete');

  });
}

app.delete('/:token', (req, res) => {
  console.log('token', req.params.token);

  let filePath = 'DB/db_locations.json';
  if (req.params.token === 'picaro_db') {
    fs.truncate(filePath, 0, function () {
      console.log('data deleted')
    });
    res.status(200).end('data deleted');
  } else res.status(503).end('503');
});


// app.get('/about',function(req,res){
//   res.sendFile('/about.html');
// });

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