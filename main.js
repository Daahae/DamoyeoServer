var express = require('express');
var app = express();
var request = require('sync-request');
var transPortInfoModule = require('./lib/transportInfoModule.js'); // 모듈단위로 쪼개기
var delay = require('delay');
var bodyParser = require('body-parser');
var Promise = require('promise');

var jsonData = new Object();
var timer;

app.get('/', function(req, res) {
  transPortInfoModule.setInfo(126.9722112, 37.2839068, 127.073139, 37.5502596);

  timer = setTimeout(function() { // 비동기함수 처리를 위한 대기
    jsonData = transPortInfoModule.getInfo();
    res.redirect('/test');
  }, 700)
})

app.get('/test', function(req, res) {

  clearTimeout(timer);// setTimeout 이벤트 제거

  JSON.stringify(jsonData);
  res.send(jsonData);
})

app.listen(3443, function() {
  console.log('Connected, 3443port!!');
});
