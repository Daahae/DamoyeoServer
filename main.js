var express = require('express');
var app = express();
var errorHandlingModule = require('./transportLib/errorHandlingModule.js');
var transPortInfoModule = require('./transportLib/transportInfoModule.js');
var usersToMidModule = require('./transportLib/usersToMidModule.js');
var landmarkModule = require('./firebaseLib/landmarkModule.js');
var nearBySearchModule = require('./nearBySearchLib/categoryInfoModule.js');
var bodyParser = require('body-parser');
var request = require('sync-request');
var midInfo = new Array(37.2839068, 126.9722112); // 중간지점 전역변수선언
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.text({
  type: 'text/plain'
}));

/* 테스트용 홈
 */
app.get('/', function(req, res) {
  var jsonData;
  var landmarkObject = new Object();
  var testMidInfo = new Array(37.2839068, 126.9722112);
  jsonData = transPortInfoModule.getInfo(37.2839068, 126.9722112, 37.5502596, 127.073139);
  landmarkObject = landmarkModule.getLandmarkByPosition(testMidInfo[0], testMidInfo[1]);
  jsonData.landmark = landmarkObject;
  res.send(jsonData);
})


/* 안드로이드에서 유저들좌표를 전송받음(req)
   유저들좌표에서 중앙지점까지의 교통정보, 랜드마크 정보 전송
*/
app.post('/usersToMid', function(req, res) {
  var usersToMidArray = new Object();
  midInfo = new Array(37.2839068, 126.9722112); // 알고리즘을 통해 얻어낼 좌표, 현제는 샘플좌표, 전역변수 선언
  usersToMidArray = usersToMidModule.getInfo(req, midInfo[0], midInfo[1]); // 안드로이드에서 넘겨준 users 정보와 함께 모듈 실행
  res.send(usersToMidArray);
})

/* 중간지점 알고리즘 사용 후,
   사용자의 카테고리 선택 정보를 받음
   해당하는 장소정보 안드로이드로 전송 (Google place API)
*/
app.post('/midCategory', function(req, res) {
  var midCategoryObject = new Object();
  midCategoryObject = nearBySearchModule.getInfo(req, midInfo[0], midInfo[1]);
  res.send(midCategoryObject);
})


app.get('/geocode', function (req, res) {
  var clientID = "jwlrRrud1mg1tJBxdoSh";
  var secret = "AwskMzduBL";
  var jsonArray = new Array();

  midInfo[0] = 37.5501842;
  midInfo[1] = 127.0705684;
  var url = 'https://openapi.naver.com/v1/map/reversegeocode?query=' + midInfo[1]+','+midInfo[0];
  var options = {
      headers: {
          'X-Naver-Client-Id': clientID,
          'X-Naver-Client-Secret': secret
      }
  };

  var resObject = request('GET', url, options);
  var jsonObject = JSON.parse(resObject.getBody());
  jsonArray = jsonObject.result.items[0].addrdetail.sigugun;
  var midAddressArr = jsonArray.split(' ');

  res.send(midAddressArr[0]);
 });


app.listen(3443, function() {
  console.log('Connected, 3443port!!');
});
