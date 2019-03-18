var transPortInfoModule = require('./transportInfoModule.js');
var landmarkModule = require('../firebaseLib/landmarkModule.js');
var transportJsonParseModule = require('./transportJsonParseModule.js');
var midPosToStringModule = require('../firebaseLib/midPosToStringModule.js');
var errorHandlingModule = require('../errorHandlingModule.js');


/* 입력받은 유저들 좌표 인지로 실행한 알고리즘 모듈 결과값 파싱
   + 경로정보
   + 중간좌표
   + 랜드마크정보
 */
module.exports.getInfo = function(req, midLat, midLng) {
  var jsonData;
  var jsonTotalArray = new Object();
  var landmarkObject = new Object();
  jsonTotalArray.userArr = new Array();
  jsonTotalArray.midInfo = new Object();
  var reqArray = new Array();
  reqArray = JSON.parse(req.body.userArr);
  console.log("asdasd");

  for (var i = 0; i < reqArray.length; i++) {
    var start = new Array(reqArray[i].latitude, reqArray[i].longitude); // 유저 좌표
  //  console.log("start : "+start[0] +" , "+start[1]);
    jsonData = transPortInfoModule.getInfo(start[0], start[1], midLat, midLng);
  //  console.log("??????"+jsonData.userArr);
    jsonTotalArray.userArr.push(jsonData);
  }


  landmarkObject = landmarkModule.getLandmarkByPosition(midLat, midLng); // 중심좌표 근처의 랜드마크
  jsonTotalArray.landmark = landmarkObject;
  jsonTotalArray.midInfo.midLat = midLat;
  jsonTotalArray.midInfo.midLng = midLng;
  jsonTotalArray.midInfo.address = midPosToStringModule.getStringPos(midLat, midLng).result.items[0].address; //string 주소 추가
  return jsonTotalArray;
}

/* 랜드마크의 경로정보를 가져오기 위함
 */
module.exports.getTransportInfo = function(req) {
  var jsonData;
  var jsonTotalArray = new Object();
  var midLat, midLng;
  jsonTotalArray.userArr = new Array();
  var reqArray = new Array();
  reqArray = JSON.parse(req.body.userArr);
  midLat = reqArray.midLat;
  midLng = reqArray.midLng;
  reqArray = reqArray.userArr;

  for (var i = 0; i < reqArray.length; i++) {
    var start = new Array(reqArray[i].latitude, reqArray[i].longitude); // 유저 좌표
    jsonData = transPortInfoModule.getInfo(start[0], start[1], midLat, midLng);
    jsonTotalArray.userArr.push(jsonData);
  }
  return jsonTotalArray;
}
