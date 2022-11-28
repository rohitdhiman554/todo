export function setCookie(token) {
  document.cookie = "token=" + token;
}

export function getCookie(cookie) {
  if (cookie != undefined) {
    const name = "token=";
    let decodedCookie = "";
    if (typeof window !== "undefined")
      decodedCookie = decodeURIComponent(cookie);
    const cookieArr = cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
      let ch = cookieArr[i];
      let s = ch.substring(1, name.length + 1);
      if (name === s) return ch.substring(name.length + 1);
    }
  }

  return "";
}
