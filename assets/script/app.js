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

function getBrowserName() {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/") || ua.includes("Edge/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome/") && !ua.includes("Chromium")) return "Chrome";
  if (ua.includes("CriOS")) return "Chrome (iOS)";
  if (ua.includes("Firefox/")) return "Firefox";
  if (/Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua)) return "Safari";
  return "Unknown";
}
function getOSName() {
  const platform = navigator.platform || "unknown";
  const ua = navigator.userAgent || "";
  if (/Windows/.test(platform) || /Win/.test(ua)) return "Windows";
  if (/Mac/.test(platform) || /Macintosh/.test(ua)) return "macOS";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Linux/.test(platform)) return "Linux";
  return "Unknown";
}