'use strict';


function setCookie(name, value, seconds = 20) {
  const d = new Date();
  d.setTime(d.getTime() + seconds * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ${expires}; path=/`;
}

function getCookie(name) {
  const cookieStr = document.cookie;
  const nameEQ = encodeURIComponent(name) + "=";
  const parts = cookieStr.split("; ").map(c => c.trim());
  for (const p of parts) {
    if (p.indexOf(nameEQ) === 0) {
      return decodeURIComponent(p.substring(nameEQ.length));
    }
  }
  return "";
}
function anyCookieExists() {
  return document.cookie && document.cookie.length > 0;
}