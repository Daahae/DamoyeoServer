var transportJsonParseModule = require('./transportJsonParseModule.js');
var requestOdsayAPIModule = require('./requestOdsayAPIModule.js');

module.exports.getInfo = function(startLatitude, startLongitude, endLatitude, endLongitude) {

  var start = new Array(startLatitude, startLongitude);
  var end = new Array(endLatitude, endLongitude);
  var obj = requestOdsayAPIModule.getData(start, end);
  var jsonData = transportJsonParseModule.getJsonData(obj);
  JSON.stringify(jsonData);

  return jsonData;
}
