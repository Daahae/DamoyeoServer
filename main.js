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

/* 중간지점 전역변수선언 (명동) 알고리즘을 통해 얻어낼 좌표, 현제는 샘플좌표, 전역변수 선언
 알고리즘으로 얻어낼 시 지역변수로 바꿈
*/
var midInfo = new Array(37.5637399, 126.9838655);
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.text({
  type: 'text/plain'
}));
app.use(express.static('TOMSA'));

/* 테스트용 홈
 */
app.get('/', function(req, res) {
  var exec = require('child_process').execFile;

  var tmp = '{\"userArr\":[{\"latitude\":37.550277,\"longitude\":127.073053},\
  {\"latitude\":37.545036,\"longitude\":127.054245},\
  {\"latitude\":37.535413,\"longitude\":127.062388},\
  {\"latitude\":37.531359,\"longitude\":127.083799}]}';
  var resultObject;
  try {
    resultObject = exec('./TOMSA', [tmp], {encoding: "utf8"});
    resultObject = JSON.parse(resultObject);
  } catch (err) {
      err.stdout;
      err.stderr;
      err.pid;
      err.signal;
      err.status;
      // etc
  }

  console.log("A" +resultObject);
  res.send(resultObject);
})


/* 안드로이드에서 유저들좌표를 전송받음(req)
   유저들좌표에서 중앙지점까지의 교통정보, 랜드마크 정보 전송
*/
app.post('/usersToMid', function(req, res) {
  var usersToMidArray = usersToMidModule.getInfo(req, midInfo[0], midInfo[1]); // 안드로이드에서 넘겨준 users 정보와 함께 모듈 실행
  res.send(usersToMidArray);
})

/* 중간지점 알고리즘 사용 후,
   사용자의 카테고리 선택 정보를 받음
   해당하는 장소정보 안드로이드로 전송 (Google place API)
*/
app.post('/midCategory', function(req, res) {
  var midCategoryObject = nearBySearchModule.getInfo(req, midInfo[0], midInfo[1]);
  console.log(midCategoryObject);
  res.send(midCategoryObject);
})

/* 카테고리의 장소에 대해 더 자세한 정보를 알고자 할 때
   전화번호, 장소에 대한 간단한 설명 반환
 */
app.post('/midDetailCategory', function(req, res) {
  var midDetailCategoryObject =  nearBySearchDetailModule.getDetailInfo(req, midInfo[0], midInfo[1]);
  res.send(midDetailCategoryObject);
})


app.listen(3443, function() {
  console.log('Connected, 3443port!!');
});
