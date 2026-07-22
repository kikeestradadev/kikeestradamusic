(() => {
  // src/js/modules/coreModule.js
  var coreModule = () => {
    document.querySelectorAll(".core-module").forEach((root) => {
      root.dataset.coreModuleReady = "true";
    });
  };
  var coreModule_default = coreModule;

  // src/js/modules/internalModule.js
  var internalModule = () => {
    document.querySelectorAll(".internal-module").forEach((root) => {
      root.dataset.internalModuleReady = "true";
    });
  };
  var internalModule_default = internalModule;

  // src/js/modules/mainMenu.js
  var mainMenu = () => {
    document.querySelectorAll(".main-menu").forEach((root) => {
      if (root.dataset.mainMenuReady === "true") {
        return;
      }
      const toggle = root.querySelector(".main-menu__toggle");
      const links = root.querySelectorAll(".main-menu__link, .main-menu__lang");
      const openLabel = toggle?.dataset.labelOpen || "Open menu";
      const closeLabel = toggle?.dataset.labelClose || "Close menu";
      const setOpen = (isOpen) => {
        root.classList.toggle("main-menu--open", isOpen);
        if (toggle) {
          toggle.setAttribute("aria-expanded", String(isOpen));
          toggle.setAttribute("aria-label", isOpen ? closeLabel : openLabel);
        }
        document.body.style.overflow = isOpen ? "hidden" : "";
      };
      if (toggle) {
        toggle.addEventListener("click", () => {
          setOpen(!root.classList.contains("main-menu--open"));
        });
      }
      links.forEach((link) => {
        link.addEventListener("click", () => {
          setOpen(false);
        });
      });
      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      });
      root.dataset.mainMenuReady = "true";
    });
  };
  var mainMenu_default = mainMenu;

  // src/js/index.js
  var initComponents = () => {
    coreModule_default();
    internalModule_default();
    mainMenu_default();
  };
  document.addEventListener("DOMContentLoaded", initComponents);
})();
//# sourceMappingURL=index.js.map
