// call the packages we need
const express = require('express'); // call express
const app = express(); // define our app using express
const bodyParser = require('body-parser');
const fs = require('fs');
var path = require('path');


//Store all HTML files in view folder.
app.use(express.static(__dirname + '/js'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/map style'));
app.use(express.static(__dirname + '/icons'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/'));

app.get('/',function(req,res){
  res.sendFile('index.html');
  //It will find and locate index.html from View or Scripts
});

app.get('/about',function(req,res){
  res.sendFile('/about.html');
});

app.get('/sitemap',function(req,res){
  res.sendFile('/sitemap.html');
});

let port = process.env.PORT || 3000;


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


// START THE SERVER
http.listen(port, '0.0.0.0', function(err) {
    console.log('server runninng at ' + http.url );
});

// ROUTES FOR OUR API
var router = express.Router();

router.get('/', function (req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

router.route('/:item,:icon')
  .get(function (req, res) {

    let q = req.body.name;
    console.log('data read..' +  JSON.stringify(req.body.name) );
    console.log('data read..' +  JSON.stringify(req.params.item) );
    console.log('data read..' +  JSON.stringify(req.params.icon) );

    getMeFunc(req.params.q, req.params.count, function (err, tweets) {
      res.status('200').send(tweets);
    });
  });

app.use('/api', router);