var express = require('express');
var app = express();
var request = require('sync-request');
var transPortInfoModule = require('./transportLib/transportInfoModule.js');
var usersToMidModule = require('./transportLib/usersToMidModule.js');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text({type: 'text/plain'}));

app.get('/', function(req, res) {
  var jsonData;
  jsonData = transPortInfoModule.getInfo(37.2839068, 126.9722112, 37.5502596, 127.073139);
  res.send(jsonData);
})


app.get('/algo', function(req, res) {
})

/* 유저들좌표에서 중앙지점까지의 교통정보
   안드로이드에서 유저들좌표를 전송받음(req)
*/
app.post('/usersToMid', function(req, res) {
  var jsonTotalArray = new Object();
  var midInfo = new Array(37.2839068, 126.9722112); // 알고리즘을 통해 얻어낼 좌표, 현제는 샘플좌표

  jsonTotalArray = usersToMidModule.getInfo(req, midInfo[0], midInfo[1]); // 안드로이드에서 넘겨준 users 정보와 함께 모듈 실행
  res.send(jsonTotalArray);
})



app.listen(3443, function() {
  console.log('Connected, 3443port!!');
});
