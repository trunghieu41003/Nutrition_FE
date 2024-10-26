
export const jwtToken = localStorage.getItem("token");//lấy token từ local storage

export const url = "http://localhost:8080/"; //url của server backend

export function getAjax(endPoint, data = {}, jwtToken = "") {

  let headers = {
    'Accept': 'application/json, text/plain, /',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  if (jwtToken != null) {
    headers['Authorization'] = 'Bearer ' + jwtToken;
  }
  // ajax cho phép gọi đường dẫn ngầm và lấy giá trị của đường dẫn đó
  return $.ajax({
    method: "get",
    url: url + endPoint,

    data: data,
    headers: headers
  })
}
export function postAjax(endPoint, data = {}, jwtToken = "") {
  let headers = {
    'Accept': 'application/json, text/plain, /',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  if (jwtToken != null) {
    headers['Authorization'] = 'Bearer ' + jwtToken;
  }

  return $.ajax({
    method: "POST",
    url: url + endPoint,
    data: data,
    headers: headers
  });
}