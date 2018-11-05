var transportJsonParseModule = require('./transportJsonParseModule.js');
var requestOdsayAPIModule = require('./requestOdsayAPIModule.js');
var errorHandlingModule = require('./errorHandlingModule.js');

/*두 좌표사이의 교통정보 반환
 */
module.exports.getInfo = function(startLatitude, startLongitude, endLatitude, endLongitude) {
  var start = new Array(startLatitude, startLongitude);
  var end = new Array(endLatitude, endLongitude);
  var obj = requestOdsayAPIModule.getData(start, end);
  if (!errorHandlingModule.isData(obj))
    return "No Data";

  var jsonData = transportJsonParseModule.getJsonData(obj);
  JSON.stringify(jsonData);

  return jsonData;
}
