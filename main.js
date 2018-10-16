var express = require('express');
var app = express();
var request = require('sync-request');
var transPortInfoModule = require('./transportLib/transportInfoModule.js'); // 모듈단위로 쪼개기
var bodyParser = require('body-parser');
//var tocfaAlgorithm = require("./TOCFA/build/Release/TOA.node");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text({ type: 'text/plain' }));

app.get('/', function(req, res) {
  var jsonData;
  jsonData = transPortInfoModule.getInfo(37.2839068, 126.9722112, 37.5502596,127.073139);
  res.send(jsonData);
})


app.get('/algo', function(req, res) {
  var jsonData;
  var result;
  var tmpObj = {};
  var sampleObj  = {};
  sampleObj["userArr"] = [];


  //sampleObj = req.body;

  tmpObj = {
    latitude : 37.5502596,
    longitude : 127.073139
  }
    sampleObj["userArr"].push(tmpObj);
  tmpObj = {
    latitude : 37.546951,
    longitude : 127.079647
  }
    sampleObj["userArr"].push(tmpObj);
  tmpObj ={
    latitude : 37.542562,
    longitude : 127.075385
  }
    sampleObj["userArr"].push(tmpObj);
  tmpObj ={
    latitude : 37.543802,
    longitude : 127.069145
  }

  sampleObj["userArr"].push(tmpObj);
  sampleObj = JSON.stringify(sampleObj);

  //result = tocfaAlgorithm.TOCFA(sampleObj,transPortInfoModule.getTotalTime);
  //res.send(result);
})

app.post('/test',function(req, res) {
  console.log("세영이의 테스트");
  console.log(req.body);
  res.send("세영아 잘하자?");
})



app.listen(3443, function() {
  console.log('Connected, 3443port!!');
});
