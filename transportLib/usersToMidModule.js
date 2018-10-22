var transPortInfoModule = require('./transportInfoModule.js');

module.exports.getInfo = function(midInfoLat, midInfoLong) { // 입력받은 유저들 좌표에서 중간지점까지의 교통정보 반환
  var jsonData;
  var jsonTotalArray = new Object();
  jsonTotalArray.userArr = new Array();
  var reqArray = new Array();
  reqArray = JSON.parse(req.body.userArr);
  //reqArray = [{"latitude": 37.5502596,"longitude": 127.073139},{"latitude": 37.5611284,"longitude": 127.03550500000006}];

  for (var i = 0; i < reqArray.length; i++) {
    var start = new Array(reqArray[i].latitude, reqArray[i].longitude); // 유저 좌표
    console.log(start[0]);

    jsonData = transPortInfoModule.getInfo(start[0], start[1], midInfoLat, midInfoLong);
    jsonTotalArray.userArr.push(jsonData);
  }
  console.log(jsonTotalArray);
  return jsonTotalArray;
}
