var firebase = require('firebase');
var deasync = require('deasync');
var errorHandlingModule = require('../errorHandlingModule.js');
var midPosToStringModule = require('./midPosToStringModule.js');

/* 파이어베이스를 사용하는 기능들
*/

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

/* 중심좌표를 받아 해당하는 랜드마크 반환

*/
module.exports.getLandmarkByPosition = function(midLat, midLng) {
  var sigugun = midPosToStringModule.getStringPos(midLat, midLng);
  var landmarkData = getLandmarkBySector(sigugun);
  return landmarkData;
}

/* sector에 해당하는 랜드마크 정보 검색
    sector = 시 or 구
 */
function getLandmarkBySector(sector) {
  var data = new Object();
  firebase.database().ref('landmark/' + sector).on('value', function(snapshot) {
    data = snapshot.val();
  });
  while (!errorHandlingModule.isObjectData(data)) { // 비동기 처리
    deasync.sleep(100);
  }
  return data;
}
