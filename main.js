var express = require('express');
var app = express();
var errorHandlingModule = require('./errorHandlingModule.js');
var transPortInfoModule = require('./transportLib/transportInfoModule.js');
var usersToMidModule = require('./transportLib/usersToMidModule.js');
var landmarkModule = require('./firebaseLib/landmarkModule.js');
var midPosToStringModule = require('./firebaseLib/midPosToStringModule.js');
var nearBySearchModule = require('./nearBySearchLib/NearbySearch.js');
var nearBySearchDetailModule = require('./nearBySearchLib/GetDetailInfo.js');
var bodyParser = require('body-parser');
var request = require('sync-request');

var midInfo = new Array(37.5637399,126.9838655); // 중간지점 전역변수선언 (명동)

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
  var midPos = new Object();
  jsonData = transPortInfoModule.getInfo(37.2839068, 126.9722112, midInfo[0], midInfo[1]);
  landmarkObject = landmarkModule.getLandmarkByPosition(midInfo[0], midInfo[1]);
  jsonData.midInfo = new Object();
  jsonData.landmark = landmarkObject;
  jsonData.midInfo.midLat = midInfo[0];
  jsonData.midInfo.midLng = midInfo[1];
  jsonData.midInfo.address = midPosToStringModule.getStringPos(midInfo[0],midInfo[1]).result.items[0].address;
  //console.log(midPosToStringModule.getStringPos(midInfo[0],midInfo[1]).result.items[0].address);



  res.send(jsonData);
})


/* 안드로이드에서 유저들좌표를 전송받음(req)
   유저들좌표에서 중앙지점까지의 교통정보, 랜드마크 정보 전송
*/
app.post('/usersToMid', function(req, res) {
  var usersToMidArray = new Object();
  // 알고리즘을 통해 얻어낼 좌표, 현제는 샘플좌표, 전역변수 선언
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
  console.log(midCategoryObject);
  res.send(midCategoryObject);
})

/* 카테고리의 장소에 대해 더 자세한 정보를 알고자 할 때
*/
app.post('/midDetailCategory', function(req, res) {
  var midDetailCategoryObject = new Object();
  midDetailCategoryObject = nearBySearchDetailModule.getDetailInfo(req, midInfo[0], midInfo[1]);
  res.send(midDetailCategoryObject);
})



app.listen(3443, function() {
  console.log('Connected, 3443port!!');
});
