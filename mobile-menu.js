(function () {
  var menu = document.querySelector(".mobile-menu");
  if (!menu) return;

  var closeBtn = menu.querySelector(".mobile-menu__close");
  var backdrop = menu.querySelector(".mobile-menu__backdrop");
  var links = menu.querySelectorAll(".mobile-menu__links a");

  function openMenu() {
    menu.hidden = false;
    menu.setAttribute("aria-hidden", "false");
    requestAnimationFrame(function () {
      menu.classList.add("is-open");
    });
    document.body.classList.add("mobile-menu-open");
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("mobile-menu-open");
    setTimeout(function () {
      if (!menu.classList.contains("is-open")) {
        menu.hidden = true;
      }
    }, 220);
  }

  function bindToggle(el) {
    if (!el) return;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openMenu();
    });
  }

  bindToggle(document.querySelector(".header-tools__menu"));

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (href && href.indexOf("#catalog-") === 0) {
        e.preventDefault();
        var id = href.slice(1);
        var el = document.getElementById(id);
        closeMenu();
        setTimeout(function () {
          if (typeof window.ismaCatalogReveal === "function" && el) {
            window.ismaCatalogReveal(el);
          } else if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          if (window.history && window.history.pushState) {
            window.history.pushState(null, "", href);
          }
        }, 0);
        return;
      }
      closeMenu();
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 880) {
      closeMenu();
    }
  });
})();
