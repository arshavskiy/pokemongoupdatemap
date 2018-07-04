// call the packages we need
const express = require('express'); // call express
const app = express(); // define our app using express
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function emailMe(data){
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
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
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


app.use(cors({ allowedHeaders: 'Content-Type, Cache-Control' }));
app.options('*', cors());  // enable pre-flight

// app.use(bodyParser.json({ verify: rawBodyHandler }));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/map style'));
app.use(express.static(__dirname + '/icons'));
app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/post',function(req,res){
  let stringifed = JSON.stringify(req.body.getLocations);
    fs.writeFile('js/db_locations.json', stringifed, 'utf8', function(err) {
      if (err) throw err;
      log('complete');
      emailMe(stringifed);
      });
    res.status(200).end('saved');
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


router.route('/get')
  .get(function (req, res) {
    let locationFromFile = fs.readFileSync("js/db_locations.json", "utf8");
    // console.log( JSON.parse(locationFromFile));
    res
      .status(200)
      .json(JSON.parse(locationFromFile));
  });
app.use('/api', router);


