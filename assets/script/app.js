'use strict';


function setCookie(name, value, seconds = 20) {
  const d = new Date();
  d.setTime(d.getTime() + seconds * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ${expires}; path=/`;
}