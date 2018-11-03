/* 에러처리
 */
module.exports.isData = function(obj) { // 데이터가 존재하는지 판단
  if (obj == undefined || obj.length == 0) {
    console.log("No Data");
    return false;
  } else
    return true;
}

/* http request 시 데이터가 존재하는지 판단, 
  출, 도착지가 700m이내일때도 에러
*/
module.exports.isRequestData = function(obj) {
  if (obj.error != undefined) { // 에러가 존재한다면
    console.log("Request Fail");
    return false;
  } else
    return true;
}
