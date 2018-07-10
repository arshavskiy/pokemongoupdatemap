const nodemailer = require('nodemailer');
const fs = require('fs');

function saveToDB(data) {
  let stringifed = JSON.stringify(data);
  fs.writeFile('DB/db_locations.json', stringifed, 'utf8', function (err) {
    if (err) throw err;
    console.log('complete');

  });
  fs.writeFile('DB/temp.json', stringifed, 'utf8', function (err) {
    if (err) throw err;
    console.log('complete temp');

  });
}

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
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  deletFromArray: deletFromArray,
  saveToDB: saveToDB,
  emailMe: emailMe,
};