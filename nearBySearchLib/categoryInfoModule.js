/* 파싱결과를 분류하여 최종적으로 반환
 */

var search = require('./NearbySearch.js');
//var getInfo = require('./GetRemainInfo.js');


/*
int DEPARTMENT_STORE = 11;
int SHOPPING_MALL = 12;
int STADIUM = 21;
int ZOO = 22;
int MUSEUM = 23;
int MOVIE_THEATER = 24;
int AQUARIUM = 25;
int CAFE = 30;
int BAR = 40;
int RESTAURANT = 50;
*/

module.exports.getInfo = function(req, midLat, midLng) { // 미완
  var reqObject = new Object();
  var resObject = new Object();
  reqObject = JSON.parse(req.body.userRequest); // b 소문자로
  resObject = main(midLat, midLng, 500, reqObject.type);
  return resObject;
}

async function main(lat, lng, radius, type) {
  return await search.nearbySearch(lat, lng, radius, type);
}


/*
async function main(name) {
    console.log(await getInfo.getRemainInfo(name));
}

main("조선옥");
*/
//console.log(getInfo.getRemainInfo("괜찮아우리사이"));
