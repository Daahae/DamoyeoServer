
var request = require('sync-request');
module.exports.getData = function(start, end) {
  var url = "https://api.odsay.com/v1/api/searchPubTransPath?SX=" + start[1] + "&SY=" + start[0] + "&EX=" + end[1] + "&EY=" + end[0] + "&apiKey=e98Y7jByby2Fay1uQ%2fvdQA%2bbpMeoIubG7lRqEONiG8A";
  var res = request('GET', url);
  var obj = JSON.parse(res.getBody('utf8'));
  if(obj.length == 0){
    return;
  }



  return obj;
}
