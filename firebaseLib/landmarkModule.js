/*파이어베이스 접근을 위한 메서드 모듈
 */
var firebase = require('firebase');
var deasync = require('deasync');
var errorHandlingModule = require('../transportLib/errorHandlingModule.js');

firebase.initializeApp({ // 파이어베이스 기본설정
  apiKey: "AIzaSyCFOiU8gSADDkD6erWu17kviX-fUNquQWA",
  authDomain: "daamoyeo.firebaseapp.com",
  databaseURL: "https://daamoyeo.firebaseio.com",
  projectId: "daamoyeo",
  storageBucket: "daamoyeo.appspot.com",
  messagingSenderId: "3230588147"
});
firebaseDatabase = firebase.database();

/* 랜드마크 삽입
 */
module.exports.insertLandmarkInfo = function(sector, name, address, latitude, longitude) {
  firebase.database().ref('landmark/' + sector).set({ // 삽입 or 변경 set
    name: name,
    address: address,
    latitude: latitude,
    longitude: longitude
  });
}

/* 구에 해당하는 랜드마크 정보 검색
    sectror = 구
 */
module.exports.getLandmarkBySector = function(sector) {
  var data = new Object();
  firebase.database().ref('landmark/' + sector).on('value', function(snapshot) {
    data = snapshot.val();
  });
  while (!errorHandlingModule.isObjectData(data)) {
    deasync.sleep(100);
  }
  return data;
}

/* 유저정보 삽입
 */
module.exports.insertUserInfo = function insertUserData(userID, userPwd, userName, userAdrress) { // 계정 관리
  firebase.database().ref('users/' + userID).set({
    userName: userName
  });
}
