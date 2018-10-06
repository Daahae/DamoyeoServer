
var request = require('request');
var cheerio = require('cheerio');
var StringBuffer = require("stringbuffer");
var trafficModule = require('./trafficModule.js'); // 모듈단위로 쪼개기
var totalJsonObject = new Object();
var trafficJsonArray = new Array();


module.exports.getInfo = function(startLatitude, startLongitude, endLatitude, endLongitude, res) {

  //126.9064235, 37.556707 홍대
  //126.9722112, 37.2839068 일월초
  //127.073139, 37.5502596 세종대
  //126.9932609, 37.2828944 숙지고
  var start = new Array(startLatitude, startLongitude);
  var end = new Array(endLatitude, endLongitude);
  var url = "https://api.odsay.com/v1/api/searchPubTransPath?SX=" + start[0] + "&SY=" + start[1] + "&EX=" + end[0] + "&EY=" + end[1] + "&apiKey=e98Y7jByby2Fay1uQ%2fvdQA%2bbpMeoIubG7lRqEONiG8A";

  function getResult(callback) {
    request(url, function(err, result, jsonData) {
      if (err) {
        console.log(err);
      }

      var obj = JSON.parse(jsonData);
      var path = new Array();
      var subPathArr = new Array();
      var lane = new Array();
      var totalTime = 0;
      var timeBySubway = 0;
      var timeByBus = 0;
      var timeByWalk = 0;

      obj = obj.result;
      path = obj.path;


      subPathArr = path[0].subPath; // 최단시간의 정보
      for (var i = 0; i < subPathArr.length; i++) {
        var trafficJsonObject = new Object();
        var startStation = null;
        var endStation = null;
        var transportNumber = null;
        var trafficType = subPathArr[i].trafficType;
        var sectionTime = subPathArr[i].sectionTime;

        if (!trafficModule.walkType(trafficType)) { // 지하철이나 버스 이용 시
          startStation = subPathArr[i].startName;
          endStation = subPathArr[i].endName;

          if (trafficModule.trainType(trafficType)) { // 지하철 이용 시 호선 리턴
            laneArr = subPathArr[i].lane;
            transportNumber = laneArr[0].name;
            timeBySubway += sectionTime;

          } else { // 버스 이용 시 버스번호 리턴
            laneArr = subPathArr[i].lane;
            transportNumber = laneArr[0].busNo;
            timeByBus += sectionTime;
          }

        } else { //도보 시
          timeByWalk += sectionTime;
        }



        trafficJsonObject.trafficType = trafficType;
        trafficJsonObject.sectionTime = sectionTime;
        trafficJsonObject.transportNumber = transportNumber;
        trafficJsonObject.startStation = startStation;
        trafficJsonObject.endStation = endStation;
        trafficJsonArray.push(trafficJsonObject);

        totalTime += sectionTime;
      }

      totalJsonObject.subPathArr = trafficJsonArray;
      totalJsonObject.timeBySubway = timeBySubway;
      totalJsonObject.timeByBus = timeByBus;
      totalJsonObject.timeByWalk = timeByWalk;
      totalJsonObject.totalTime = totalTime;


      callback(totalJsonObject);//콜백을 통한 비동기 메서드 처리
    })
  }

  getResult(function(asyncData) {
    res.send(asyncData);
  })
}
