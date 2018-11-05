var express = require('express');
var app = express();
var request = require('sync-request');
var transPortInfoModule = require('./transportLib/transportInfoModule.js');
var usersToMidModule = require('./transportLib/usersToMidModule.js');
var bodyParser = require('body-parser');
var firebase = require('firebase');
var deasync = require('deasync');
var errorHandlingModule = require('./transportLib/errorHandlingModule.js');
var firebaseEmailAuth; //파이어베이스 email 인증 모듈 전역변수
var firebaseDatabase; //파이어베이스 db 모듈 전역변수

firebase.initializeApp({ // 파이어베이스 기본설정
  apiKey: "AIzaSyCFOiU8gSADDkD6erWu17kviX-fUNquQWA",
  authDomain: "daamoyeo.firebaseapp.com",
  databaseURL: "https://daamoyeo.firebaseio.com",
  projectId: "daamoyeo",
  storageBucket: "daamoyeo.appspot.com",
  messagingSenderId: "3230588147"
});
firebaseDatabase = firebase.database();


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


/* 유저들좌표에서 중앙지점까지의 교통정보
   안드로이드에서 유저들좌표를 전송받음(req)
*/
app.post('/usersToMid', function(req, res) {
  var jsonTotalArray = new Object();
  var midInfo = new Array(37.2839068, 126.9722112); // 알고리즘을 통해 얻어낼 좌표, 현제는 샘플좌표
  jsonTotalArray = usersToMidModule.getInfo(req, midInfo[0], midInfo[1]); // 안드로이드에서 넘겨준 users 정보와 함께 모듈 실행
  res.send(jsonTotalArray);
})

/* 파이어베이스 테스터
 */
app.get('/firebase', function(req, res) {
  var testObject = new Object();
  testObject = getLandmarkData('강남구');
  res.send(testObject);
});

/* 랜드마크 정보 입력, 수정
 */
function insertLandmarkData(sector, name, address, latitude, longitude) {
  firebase.database().ref('landmark/' + sector).set({ // 삽입 or 변경 set
    name: name,
    address: address,
    latitude: latitude,
    longitude: longitude
  });
}

/* 구에 해당하는 정보 검색
 */
function getLandmarkData(sector) { // sectror = 구
  var data = new Object();
  firebase.database().ref('landmark/' + sector).on('value',function(snapshot){
    data = snapshot.val();
  });
  while(!errorHandlingModule.isObjectData(data)) {deasync.sleep(50);}
  return data;
}

function insertUserData(userID, userPwd, userName, userAdrress) { // 계정 관리
  firebase.database().ref('users/' + userID).set({
    userName: userName
  });
}

app.listen(3443, function() {
  console.log('Connected, 3443port!!');
});
