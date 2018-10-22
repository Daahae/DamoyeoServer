var transportJsonParseModule = require('./transportJsonParseModule.js');
var requestOdsayAPIModule = require('./requestOdsayAPIModule.js');
var errorHandlingModule = require('./errorHandlingModule.js');

module.exports.getInfo = function(startLatitude, startLongitude, endLatitude, endLongitude) {// 최종 결과물 반환

  var start = new Array(startLatitude, startLongitude);
  var end = new Array(endLatitude, endLongitude);
  var obj = requestOdsayAPIModule.getData(start, end);
  if(!errorHandlingModule.isData(obj)){
    return "Wrong Input";
  }
  var jsonData = transportJsonParseModule.getJsonData(obj);
  JSON.stringify(jsonData);

  return jsonData;
}
