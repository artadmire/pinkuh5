export function getUrlParam(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
    result = window.location.search.substr(1).match(reg);

  if (result != null) {
    return unescape(result[2]);
  } else {
    return null;
  };
}
