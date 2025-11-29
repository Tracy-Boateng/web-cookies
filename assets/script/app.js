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

const cookieModal = document.getElementById("cookieModal");
const settingsModal = document.getElementById("settingsModal");
const acceptAllBtn = document.getElementById("acceptAllBtn");
const settingsBtn = document.getElementById("settingsBtn");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const settingsForm = document.getElementById("settingsForm");

function showModal(el) { el.setAttribute("aria-hidden", "false"); }
function hideModal(el) { el.setAttribute("aria-hidden", "true"); }

function logCookies() {
  console.log("document.cookie:", document.cookie);
  console.log("browser:", getCookie("browser"), "os:", getCookie("os"), "screen:", getCookie("screen"), "visited:", getCookie("visited"));
}


document.addEventListener("DOMContentLoaded", () => {
  if (!navigator.cookieEnabled) {
    console.warn("Cookies are disabled in this browser.");
    return;
  }
  if (!anyCookieExists()) {
    setTimeout(() => showModal(cookieModal), 1000);
  } else {
    console.log("Cookies exist; dialogs won't show.");
    logCookies();
  }
});

acceptAllBtn.addEventListener("click", () => {
  setCookie("browser", getBrowserName(), 20);
  setCookie("os", getOSName(), 20);
  setCookie("screen", `${screen.width}x${screen.height}`, 20);
  setCookie("visited", "true", 20);
  hideModal(cookieModal);
  logCookies();
});


settingsBtn.addEventListener("click", () => {
  hideModal(cookieModal);
  showModal(settingsModal);
});


saveSettingsBtn.addEventListener("click", () => {
  const wantBrowser = settingsForm.querySelector('input[name="browser"]').checked;
  const wantOS = settingsForm.querySelector('input[name="os"]').checked;
  const wantScreen = settingsForm.querySelector('input[name="screen"]').checked;

  let anySet = false;
  if (wantBrowser) {
    setCookie("browser", getBrowserName(), 20);
    anySet = true;
  }
  if (wantOS) {
    setCookie("os", getOSName(), 20);
    anySet = true;
  }
  if (wantScreen) {
    setCookie("screen", `${screen.width}x${screen.height}`, 20);
    anySet = true;
  }
  if (!anySet) {
    setCookie("visited", "true", 20);
  } else {
    setCookie("visited", "true", 20);
  }

  hideModal(settingsModal);
  logCookies();
});
