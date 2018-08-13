var express = require('express')
var router = express.Router()
var path = require('path')
var request = require('request')
var formidable = require('formidable');
var fs = require('fs');
var csv = require("fast-csv");
var moment = require('moment');
require('dotenv').load();
router.use(express.static(path.join(__dirname, 'public')));

var registerUser = (email) => {
  var url = `https://sandbox.tinypass.com/api/v3/publisher/user/register?aid=${process.env.PIANO_AID}&api_token=${process.env.PIANO_API_TOKEN}&email=${email}`
  request.post(url, function (error, response, body) {
    if (error) throw error
    var data = JSON.parse(response.body)
    console.log(data)
  })
}

var grantAccess = (emailList, rid, duration = null) => {
  var url = `https://sandbox.tinypass.com/api/v3/publisher/user/access/grant?aid=${process.env.PIANO_AID}&api_token=${process.env.PIANO_API_TOKEN}&emails=${emailList}&rid=${rid}`
  if (duration) {
    var d = moment().add(parseInt(duration), 'day')
    var expire_date = d.unix()
    url = `https://sandbox.tinypass.com/api/v3/publisher/user/access/grant?aid=${process.env.PIANO_AID}&api_token=${process.env.PIANO_API_TOKEN}&emails=${emailList}&rid=${rid}&expire_date=${expire_date}`
    console.log(url)
    console.log(expire_date)
  }
  request(url, function (error, response, body) {
    if (error) throw error
    var data = JSON.parse(response.body)
    console.log(data)
  })
}

router.get('/', function (req, res) {
  var url = `https://sandbox.tinypass.com/api/v3/publisher/resource/list?aid=${process.env.PIANO_AID}&api_token=${process.env.PIANO_API_TOKEN}`
  request(url, function (error, response, body) {
    if (error) res.render('index')
    var data = JSON.parse(response.body)
    var resourceData = data.resources
    res.render('index', { resources: resourceData })
  });
})


router.post('/createUsers', function (req, res) {
  var FILE = req.body.uploadedFile
  var fullFile = path.join(__dirname, '../uploads/' + FILE)
  csv
    .fromPath(fullFile)
    .on("data", function (data) {
      if (data[1] != 'email')
        registerUser(data[1])
    })
    .on("end", function () {
      console.log("done");
    })

})

router.post('/grantAccess', function (req, res) {
  var file = req.body.uploadedFile
  var rid = req.body.rid
  var days = req.body.duration
  var fullFile = path.join(__dirname, '../uploads/' + file)
  csv
    .fromPath(fullFile)
    .on("data", function (data) {
      if (data[1] != 'email')
        grantAccess(data[1], rid, days)
    })
    .on("end", function () {
      console.log("done");
    })

})

router.post('/upload', function (req, res) {
  var response = ''
  var form = new formidable.IncomingForm();
  form.multiples = false;
  form.uploadDir = path.join(__dirname, '../uploads');
  form.on('file', function (field, file) {
    file_path = path.join(form.uploadDir, file.name)
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    response += file.name
  });

  form.on('error', function (err) {
    console.log('An error has occured: \n' + err);
  });

  form.on('end', function () {
    res.send(response);
  });

  form.parse(req);

});

module.exports = router



