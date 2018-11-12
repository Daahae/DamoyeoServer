


module.exports.getStringPos = function(lat, lng) {
var clientID = "jwlrRrud1mg1tJBxdoSh";
var secret = "AwskMzduBL";
var jsonArray = new Array();

midInfo[0] = 37.5501842;
midInfo[1] = 127.0705684;
var url = 'https://openapi.naver.com/v1/map/reversegeocode?query=' + midInfo[1]+','+midInfo[0];
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
