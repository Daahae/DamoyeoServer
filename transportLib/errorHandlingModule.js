/* 에러처리
*/
module.exports.isData = function(obj) { // 데이터가 존재하는지 판단
  if (obj == undefined || obj.length == 0) {
    console.log("No Data");
    return false;
  } else
    return true;
}

module.exports.isRequestData = function(obj) { //http request 시 데이터가 존재하는지 판단
  if (obj.error != undefined) { // 에러가 존재한다면
    console.log("Request Fail");
    return false;
  } else
    return true;
}
