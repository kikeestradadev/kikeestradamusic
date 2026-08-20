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
      const links = root.querySelectorAll(".main-menu__link, .lang-toggle__option");
      const openLabel = (toggle == null ? void 0 : toggle.dataset.labelOpen) || "Open menu";
      const closeLabel = (toggle == null ? void 0 : toggle.dataset.labelClose) || "Close menu";
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

  // src/js/modules/featuredVideos.js
  var DESKTOP_MQ = "(width >= 960px)";
  var featuredVideos = () => {
    document.querySelectorAll(".featured-videos").forEach((root) => {
      if (root.dataset.featuredVideosReady === "true") {
        return;
      }
      const slider = root.querySelector(".featured-videos__slider");
      const prevNav = root.querySelector(".featured-videos__nav--prev");
      const nextNav = root.querySelector(".featured-videos__nav--next");
      const pagination = root.querySelector(".featured-videos__pagination");
      const slides = root.querySelectorAll(".featured-videos__item");
      const embeds = root.querySelectorAll(".featured-videos__embed");
      const desktopQuery = window.matchMedia(DESKTOP_MQ);
      if (!slider || !slides.length) {
        return;
      }
      let swiperInstance = null;
      const isDesktop = () => desktopQuery.matches;
      const playEmbed = (embed) => {
        const url = embed.dataset.videoEmbed;
        const title = embed.dataset.videoTitle || "";
        if (!url) {
          return;
        }
        const separator = url.includes("?") ? "&" : "?";
        const iframe = document.createElement("iframe");
        iframe.className = "featured-videos__iframe";
        iframe.src = `${url}${separator}autoplay=1`;
        iframe.title = title;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        embed.replaceChildren(iframe);
      };
      embeds.forEach((embed) => {
        const playButton = embed.querySelector(".featured-videos__play");
        playButton == null ? void 0 : playButton.addEventListener("click", () => {
          playEmbed(embed);
        });
      });
      const destroySlider = () => {
        if (!swiperInstance) {
          return;
        }
        swiperInstance.destroy(true, true);
        swiperInstance = null;
        root.classList.remove("featured-videos--slider");
      };
      const initSlider = () => {
        if (swiperInstance || typeof window.Swiper !== "function") {
          return;
        }
        root.classList.add("featured-videos--slider");
        swiperInstance = new window.Swiper(slider, {
          slidesPerView: 1.08,
          spaceBetween: 16,
          centeredSlides: true,
          loop: false,
          rewind: false,
          grabCursor: true,
          watchOverflow: true,
          pagination: pagination ? {
            el: pagination,
            clickable: true
          } : void 0,
          navigation: {
            prevEl: prevNav,
            nextEl: nextNav,
            disabledClass: "swiper-button-disabled"
          },
          breakpoints: {
            480: {
              slidesPerView: 1.2,
              spaceBetween: 18
            },
            640: {
              slidesPerView: 1.35,
              spaceBetween: 20
            }
          }
        });
      };
      const syncMode = () => {
        if (isDesktop()) {
          destroySlider();
          return;
        }
        initSlider();
      };
      if (typeof desktopQuery.addEventListener === "function") {
        desktopQuery.addEventListener("change", syncMode);
      } else if (typeof desktopQuery.addListener === "function") {
        desktopQuery.addListener(syncMode);
      }
      syncMode();
      root.dataset.featuredVideosReady = "true";
    });
  };
  var featuredVideos_default = featuredVideos;

  // src/js/modules/gallery.js
  var DESKTOP_MQ2 = "(width >= 960px)";
  var gallery = () => {
    document.querySelectorAll(".gallery").forEach((root) => {
      if (root.dataset.galleryReady === "true") {
        return;
      }
      const slider = root.querySelector(".gallery__slider");
      const dialog = root.querySelector(".gallery__dialog");
      const triggers = [...root.querySelectorAll(".gallery__trigger")];
      const image = root.querySelector("[data-gallery-image]");
      const placeholder = root.querySelector("[data-gallery-placeholder]");
      const caption = root.querySelector("[data-gallery-caption]");
      const figure = root.querySelector("[data-gallery-figure]");
      const closeButton = root.querySelector("[data-gallery-close]");
      const prevButton = root.querySelector("[data-gallery-prev]");
      const nextButton = root.querySelector("[data-gallery-next]");
      const prevNav = root.querySelector(".gallery__nav--prev");
      const nextNav = root.querySelector(".gallery__nav--next");
      const pagination = root.querySelector(".gallery__pagination");
      const desktopQuery = window.matchMedia(DESKTOP_MQ2);
      if (!slider || !dialog || !triggers.length || !image || !placeholder || !caption) {
        return;
      }
      let activeIndex = 0;
      let swiperInstance = null;
      const isDesktop = () => desktopQuery.matches;
      const getItem = (index) => {
        const trigger = triggers[index];
        if (!trigger) {
          return null;
        }
        return {
          src: trigger.dataset.gallerySrc || "",
          alt: trigger.dataset.galleryAlt || "",
          label: trigger.dataset.galleryLabel || "",
          tone: trigger.dataset.galleryTone || "mid"
        };
      };
      const renderItem = (index) => {
        const item = getItem(index);
        if (!item) {
          return;
        }
        activeIndex = index;
        caption.textContent = item.label;
        placeholder.className = "gallery__dialog-placeholder";
        placeholder.classList.add(`gallery__dialog-placeholder--${item.tone}`);
        placeholder.textContent = item.label;
        if (item.src) {
          image.hidden = false;
          image.src = item.src;
          image.alt = item.alt || item.label;
          placeholder.hidden = true;
        } else {
          image.hidden = true;
          image.removeAttribute("src");
          image.alt = "";
          placeholder.hidden = false;
        }
        if (figure) {
          figure.dataset.tone = item.tone;
        }
      };
      const closeDialog = () => {
        if (typeof dialog.close === "function") {
          dialog.close();
        } else {
          dialog.removeAttribute("open");
        }
        document.body.style.overflow = "";
      };
      const openAt = (index) => {
        if (!isDesktop()) {
          return;
        }
        renderItem(index);
        if (typeof dialog.showModal === "function") {
          dialog.showModal();
        } else {
          dialog.setAttribute("open", "");
        }
        document.body.style.overflow = "hidden";
        closeButton == null ? void 0 : closeButton.focus();
      };
      const showRelative = (offset) => {
        const nextIndex = (activeIndex + offset + triggers.length) % triggers.length;
        renderItem(nextIndex);
      };
      const destroySlider = () => {
        if (!swiperInstance) {
          return;
        }
        swiperInstance.destroy(true, true);
        swiperInstance = null;
        root.classList.remove("gallery--slider");
      };
      const initSlider = () => {
        if (swiperInstance || typeof window.Swiper !== "function") {
          return;
        }
        root.classList.add("gallery--slider");
        swiperInstance = new window.Swiper(slider, {
          slidesPerView: 1.15,
          spaceBetween: 16,
          centeredSlides: true,
          loop: false,
          rewind: false,
          grabCursor: true,
          watchOverflow: true,
          pagination: pagination ? {
            el: pagination,
            clickable: true
          } : void 0,
          navigation: {
            prevEl: prevNav,
            nextEl: nextNav,
            disabledClass: "swiper-button-disabled"
          },
          breakpoints: {
            480: {
              slidesPerView: 1.35,
              spaceBetween: 18
            },
            640: {
              slidesPerView: 1.6,
              spaceBetween: 20
            }
          }
        });
      };
      const syncMode = () => {
        if (isDesktop()) {
          destroySlider();
          triggers.forEach((trigger) => {
            trigger.setAttribute("aria-haspopup", "dialog");
          });
          return;
        }
        closeDialog();
        triggers.forEach((trigger) => {
          trigger.removeAttribute("aria-haspopup");
        });
        initSlider();
      };
      triggers.forEach((trigger, index) => {
        trigger.addEventListener("click", (event) => {
          if (!isDesktop()) {
            event.preventDefault();
            return;
          }
          openAt(index);
        });
      });
      closeButton == null ? void 0 : closeButton.addEventListener("click", () => {
        closeDialog();
      });
      prevButton == null ? void 0 : prevButton.addEventListener("click", () => {
        if (!isDesktop()) {
          return;
        }
        showRelative(-1);
      });
      nextButton == null ? void 0 : nextButton.addEventListener("click", () => {
        if (!isDesktop()) {
          return;
        }
        showRelative(1);
      });
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
          closeDialog();
        }
      });
      dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        closeDialog();
      });
      dialog.addEventListener("close", () => {
        document.body.style.overflow = "";
      });
      window.addEventListener("keydown", (event) => {
        if (!dialog.open || !isDesktop()) {
          return;
        }
        if (event.key === "ArrowLeft") {
          showRelative(-1);
        }
        if (event.key === "ArrowRight") {
          showRelative(1);
        }
      });
      if (typeof desktopQuery.addEventListener === "function") {
        desktopQuery.addEventListener("change", syncMode);
      } else if (typeof desktopQuery.addListener === "function") {
        desktopQuery.addListener(syncMode);
      }
      syncMode();
      root.dataset.galleryReady = "true";
    });
  };
  var gallery_default = gallery;

  // src/js/modules/floatingButton.js
  var floatingButton = () => {
    document.querySelectorAll(".floating-button").forEach((root) => {
      const toggle = root.querySelector(".floating-button__toggle");
      const tooltip = root.querySelector(".floating-button__tooltip");
      if (!toggle || !tooltip) {
        return;
      }
      const openLabel = toggle.dataset.floatingOpen || "Open contact";
      const closeLabel = toggle.dataset.floatingClose || "Close contact";
      const setOpen = (isOpen) => {
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? closeLabel : openLabel);
        tooltip.hidden = !isOpen;
      };
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        setOpen(!isOpen);
      });
      document.addEventListener("click", (event) => {
        if (!root.contains(event.target)) {
          setOpen(false);
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      });
    });
  };
  var floatingButton_default = floatingButton;

  // src/js/index.js
  var initComponents = () => {
    coreModule_default();
    internalModule_default();
    mainMenu_default();
    featuredVideos_default();
    gallery_default();
    floatingButton_default();
  };
  document.addEventListener("DOMContentLoaded", initComponents);
})();
//# sourceMappingURL=index.js.map
