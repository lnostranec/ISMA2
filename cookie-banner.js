(function () {
  var cookieBanner = document.getElementById("cookieBanner");
  var cookieBannerAccept = document.getElementById("cookieBannerAccept");
  var COOKIE_CONSENT_KEY = "isma_cookie_consent_v1";

  function showCookieBanner() {
    if (!cookieBanner) return;
    cookieBanner.hidden = false;
    requestAnimationFrame(function () {
      cookieBanner.classList.add("is-visible");
    });
  }

  function hideCookieBanner() {
    if (!cookieBanner) return;
    cookieBanner.classList.remove("is-visible");
    setTimeout(function () {
      if (!cookieBanner.classList.contains("is-visible")) {
        cookieBanner.hidden = true;
      }
    }, 220);
  }

  function getCookieConsentAccepted() {
    try {
      return window.localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
    } catch (e) {
      return false;
    }
  }

  function setCookieConsentAccepted() {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    } catch (e) {}
  }

  function updateCookieBannerVisibility() {
    if (!cookieBanner) return;
    if (getCookieConsentAccepted()) {
      hideCookieBanner();
      return;
    }
    showCookieBanner();
  }

  if (cookieBanner && cookieBannerAccept) {
    cookieBannerAccept.addEventListener("click", function () {
      setCookieConsentAccepted();
      hideCookieBanner();
    });
    updateCookieBannerVisibility();
  }
})();
