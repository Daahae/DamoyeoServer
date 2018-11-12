var request = require('sync-request');

module.exports.getStringPos = function(lng, lat) {
  var clientID = "jwlrRrud1mg1tJBxdoSh";
  var secret = "AwskMzduBL";
  var jsonArray = new Array();
  var url = 'https://openapi.naver.com/v1/map/reversegeocode?query=' + lat + ',' + lng;
  var options = {
    headers: {
      'X-Naver-Client-Id': clientID,
      'X-Naver-Client-Secret': secret
    }
  };

  var resObject = request('GET', url, options);
  var jsonObject = JSON.parse(resObject.getBody());
  jsonArray = jsonObject.result.items[0].addrdetail.sigugun;
  var midAddressArr = jsonArray.split(' ');
  return midAddressArr[0];
}
