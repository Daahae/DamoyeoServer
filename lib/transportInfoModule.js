var transportJsonParse = require('./transportJsonParse.js');
var request = require('sync-request');

module.exports.getInfo = function(startLatitude, startLongitude, endLatitude, endLongitude) {

  //126.9064235, 37.556707 홍대
  //126.9722112, 37.2839068 일월초
  //127.073139, 37.5502596 세종대
  //126.9932609, 37.2828944 숙지고

  var start = new Array(startLatitude, startLongitude);
  var end = new Array(endLatitude, endLongitude);
  var url = "https://api.odsay.com/v1/api/searchPubTransPath?SX=" + start[0] + "&SY=" + start[1] + "&EX=" + end[0] + "&EY=" + end[1] + "&apiKey=e98Y7jByby2Fay1uQ%2fvdQA%2bbpMeoIubG7lRqEONiG8A";
  var res = request('GET', url);
  var obj = JSON.parse(res.getBody('utf8'));

  var jsonData = transportJsonParse.getJsonData(obj);


  return jsonData;

}
