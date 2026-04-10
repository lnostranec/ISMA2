(function () {
  var root = document.getElementById("catalogMega");
  var openBtn = document.getElementById("catalogMegaOpen");
  if (!root || !openBtn) return;

  var mq = window.matchMedia("(min-width: 901px)");

  function clearPrimaryActive() {
    var primary = root.querySelector(".catalog-mega__primary");
    if (!primary) return;
    primary.querySelectorAll("li.is-active").forEach(function (li) {
      li.classList.remove("is-active");
    });
  }

  function isOpen() {
    return !root.hasAttribute("hidden");
  }

  function setMegaState(state) {
    if (state === "sidebar" || !state) {
      root.setAttribute("data-mega-state", "sidebar");
    } else {
      root.setAttribute("data-mega-state", state);
    }
  }

  function setOpen(open) {
    if (open) {
      root.removeAttribute("hidden");
      root.setAttribute("aria-hidden", "false");
      openBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("catalog-mega-open");
      setMegaState("plastic-full");
      clearPrimaryActive();
    } else {
      root.setAttribute("hidden", "");
      root.setAttribute("aria-hidden", "true");
      openBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("catalog-mega-open");
      root.removeAttribute("data-mega-state");
      clearPrimaryActive();
    }
  }

  function toggle() {
    setOpen(!isOpen());
  }

  openBtn.addEventListener("click", function (e) {
    if (mq.matches) {
      e.preventDefault();
      toggle();
    }
  });

  var backdrop = root.querySelector(".catalog-mega__backdrop");
  if (backdrop) {
    backdrop.addEventListener("click", function () {
      if (mq.matches) {
        setOpen(false);
      }
    });
    backdrop.addEventListener(
      "wheel",
      function (e) {
        if (!mq.matches) return;
        if (e.cancelable) {
          e.preventDefault();
        }
        window.scrollBy(0, e.deltaY);
      },
      { passive: false }
    );
  }

  var headerLogo = document.querySelector(".site-header .brand .logo");
  if (headerLogo) {
    headerLogo.addEventListener("click", function (e) {
      if (mq.matches && isOpen()) {
        e.preventDefault();
        setOpen(false);
      }
    });
  }

  var catalogLabel = document.querySelector(".nav__link--catalog .nav__catalog-text");
  if (catalogLabel) {
    catalogLabel.addEventListener("click", function () {
      if (mq.matches) {
        setOpen(false);
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
    }
  });

  function onMqChange() {
    if (!mq.matches) {
      setOpen(false);
    }
  }

  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", onMqChange);
  } else if (typeof mq.addListener === "function") {
    mq.addListener(onMqChange);
  }

  document.querySelectorAll(".nav > .nav__link:not(.nav__link--catalog)").forEach(function (link) {
    link.addEventListener("click", function () {
      if (mq.matches) {
        setOpen(false);
      }
    });
  });

  var primary = root.querySelector(".catalog-mega__primary");
  function setPrimaryActive(li) {
    clearPrimaryActive();
    if (li) li.classList.add("is-active");
  }
  if (primary) {
    primary.addEventListener("click", function (e) {
      if (!mq.matches) return;
      var a = e.target.closest("a[data-mega-panel]");
      if (!a) return;
      e.preventDefault();
      var panel = a.getAttribute("data-mega-panel");
      if (panel === "full") {
        clearPrimaryActive();
        setMegaState("plastic-full");
      } else if (panel === "compact") {
        clearPrimaryActive();
        setMegaState("plastic-compact");
      } else if (panel === "empty") {
        setMegaState("empty");
        setPrimaryActive(a.closest("li"));
      }
    });
  }
})();
