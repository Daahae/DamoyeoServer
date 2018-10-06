var express = require('express');
var app = express();
var StringBuffer = require("stringbuffer");
var trafficModule = require('./lib/transportInfoModule.js'); // 모듈단위로 쪼개기

app.get('/', function(req, res) {
  var jsonData = new Object();
  trafficModule.getInfo(126.9722112, 37.2839068,127.073139, 37.5502596, res);
})



app.listen(3443, function() {
  console.log('Connected, 3443port!!');
});
