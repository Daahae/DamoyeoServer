var express = require('express');
var app = express();
var request = require('sync-request');
var transPortInfoModule = require('./lib/transportInfoModule.js'); // 모듈단위로 쪼개기
var delay = require('delay');
var bodyParser = require('body-parser');
var Promise = require('promise');


app.get('/', function(req, res) {
  var jsonData = new Object();

  transPortInfoModule.getInfo(126.9722112, 37.2839068, 127.073139, 37.5502596);

  setTimeout(function(){
    jsonData = transPortInfoModule.getInfo();
    res.send(jsonData);
  },1000)

})



app.listen(3443, function() {
  console.log('Connected, 3443port!!');
});
