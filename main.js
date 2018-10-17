var express = require('express');
var app = express();
var request = require('sync-request');
var transPortInfoModule = require('./transportLib/transportInfoModule.js'); // 모듈단위로 쪼개기
var bodyParser = require('body-parser');
//var tocfaAlgorithm = require("./TOCFA/build/Release/TOA.node");

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.text({
  type: 'text/plain'
}));

app.get('/', function(req, res) {
  var jsonData;
  jsonData = transPortInfoModule.getInfo(37.2839068, 126.9722112, 37.5502596, 127.073139);
  res.send(jsonData);
})


app.get('/algo', function(req, res) {
  var jsonData;
  var result;
  var tmpObj = new Object();
  var sampleObj = new Object();
  sampleObj.userArr = new Array();


  //sampleObj = req.body;

  tmpObj = {
    latitude: 37.5502596,
    longitude: 127.073139
  }
  sampleObj.userArr.push(tmpObj);
  tmpObj = {
    latitude: 37.546951,
    longitude: 127.079647
  }
  sampleObj.userArr.push(tmpObj);
  tmpObj = {
    latitude: 37.542562,
    longitude: 127.075385
  }
  sampleObj.userArr.push(tmpObj);
  tmpObj = {
    latitude: 37.543802,
    longitude: 127.069145
  }
  sampleObj.userArr.push(tmpObj);
  sampleObj = JSON.stringify(sampleObj); // 예시

  //result = tocfaAlgorithm.TOCFA(sampleObj,transPortInfoModule.getTotalTime);
  res.send(sampleObj);
})

app.post('/sendTransportInfo', function(req, res) {
  var jsonData;
  var jsonTotalArray = new Object();
  jsonTotalArray.userArr = new Array();
  var reqArray = new Array();
  reqArray = JSON.parse(req.body.userArr);

  console.log(reqArray);

  for (var i = 0; i < reqArray.length; i++) {
    var start = new Array(reqArray[i].latitude, reqArray[i].longitude); // 유저 좌표
    var midInfo = new Array(37.2839068, 126.9722112); // midInfo 좌표
    console.log(start[0]);

    jsonData = transPortInfoModule.getInfo(start[0], start[1], midInfo[0], midInfo[1]);
    jsonTotalArray.userArr.push(jsonData);
  }

  res.send(jsonTotalArray);
})



app.listen(3443, function() {
  console.log('Connected, 3443port!!');
});
