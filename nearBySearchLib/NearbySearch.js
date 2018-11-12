var getInfo = require('./GetInfoByCategory.js');
var settingCategory = require('./SetCategory.js');
var deasync = require('deasync');

//lat, lng는 알고리즘에서 나온 결과값, radius는 고정값
//type은 userRequest: {type : 30} 과 같은 형식의 json오브젝트에서 따오기.

exports.nearbySearch = function(lat, lng, radius, type) { //위도, 경도, 반경, 타입(cafe, shopping_mall, bar 등등)
    var category = settingCategory.setCategory(type);
    var jsonTest = getInfo.getInfoByCategory(lat, lng, radius, category);
    var jsonObject = JSON.parse(jsonTest);


    while(JSON.stringify(jsonObject.Info) == "[]") {
        console.log(jsonObject);
        deasync.sleep(1500);
        jsonTest = getInfo.getInfoByCategory(lat, lng, radius, category);
        jsonObject = JSON.parse(jsonTest);
    }

    return jsonObject;
}
