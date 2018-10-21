var express = require('express');
var app = express();
var request = require('sync-request');
var transPortInfoModule = require('./transportLib/transportInfoModule.js');

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
  var jsonTotalArray = new Object();
  var midInfo = new Array(37.2839068, 126.9722112);// 알고리즘을 통해 얻어낼 좌표, 현제는 샘플좌표

  jsonTotalArray = usersToMidModule.getInfo(midInfo[0], midInfo[1]);
  res.send(jsonTotalArray);
})



app.listen(3443, function() {
  console.log('Connected, 3443port!!');
});
