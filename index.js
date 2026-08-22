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
  var featuredVideos = () => {
    document.querySelectorAll(".featured-videos").forEach((root) => {
      if (root.dataset.featuredVideosReady === "true") {
        return;
      }
      const embeds = root.querySelectorAll(".featured-videos__embed");
      if (!embeds.length) {
        return;
      }
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
      root.dataset.featuredVideosReady = "true";
    });
  };
  var featuredVideos_default = featuredVideos;

  // src/js/modules/thumbsGallery.js
  var thumbsGallery = () => {
    document.querySelectorAll(".thumbs-gallery").forEach((root) => {
      if (root.dataset.thumbsGalleryReady === "true") {
        return;
      }
      const main = root.querySelector(".thumbs-gallery__main");
      const thumbs = root.querySelector(".thumbs-gallery__thumbs");
      const prevNav = root.querySelector(".thumbs-gallery__nav--prev");
      const nextNav = root.querySelector(".thumbs-gallery__nav--next");
      if (typeof window.Swiper !== "function" || !main || !thumbs) {
        return;
      }
      try {
        const thumbsSwiper = new window.Swiper(thumbs, {
          spaceBetween: 8,
          slidesPerView: 4,
          freeMode: true,
          watchSlidesProgress: true,
          watchOverflow: true,
          navigation: {
            prevEl: prevNav,
            nextEl: nextNav,
            disabledClass: "is-disabled"
          }
        });
        new window.Swiper(main, {
          spaceBetween: 0,
          grabCursor: true,
          thumbs: {
            swiper: thumbsSwiper
          }
        });
        root.dataset.thumbsGalleryReady = "true";
      } catch (error) {
        console.error("Thumbs gallery failed to init", error);
      }
    });
  };
  var thumbsGallery_default = thumbsGallery;

  // src/js/modules/produce.js
  var DESKTOP_MQ = "(width >= 960px)";
  var produce = () => {
    document.querySelectorAll(".produce").forEach((root) => {
      var _a;
      if (root.dataset.produceReady === "true") {
        return;
      }
      const dialog = root.querySelector(".produce__dialog");
      const frame = root.querySelector("[data-produce-frame]");
      const caption = root.querySelector("[data-produce-caption]");
      const externalLink = root.querySelector("[data-produce-external]");
      const closeButton = root.querySelector("[data-produce-close]");
      const triggers = [...root.querySelectorAll(".produce__play")];
      const slider = root.querySelector(".produce__slider");
      const prevNav = root.querySelector(".produce__nav--prev");
      const nextNav = root.querySelector(".produce__nav--next");
      const pagination = root.querySelector(".produce__pagination");
      const items = [...root.querySelectorAll(".produce__item")];
      const filterButtons = [...root.querySelectorAll("[data-produce-filter]")];
      const filtersSlider = root.querySelector(".produce__filters");
      const filtersPrevNav = root.querySelector(".produce__filters-nav--prev");
      const filtersNextNav = root.querySelector(".produce__filters-nav--next");
      const desktopQuery = window.matchMedia(DESKTOP_MQ);
      if (!dialog || !frame || !slider || !triggers.length) {
        root.dataset.produceReady = "true";
        return;
      }
      let lastTrigger = null;
      let swiperInstance = null;
      let filtersSwiper = null;
      let activeFilter = ((_a = filterButtons[0]) == null ? void 0 : _a.dataset.produceFilter) || "productions";
      const isDesktop = () => desktopQuery.matches;
      const clearFrame = () => {
        frame.replaceChildren();
      };
      const initFiltersSlider = () => {
        if (typeof window.Swiper !== "function" || !filtersSlider || filtersSwiper || !filterButtons.length) {
          return;
        }
        filtersSwiper = new window.Swiper(filtersSlider, {
          slidesPerView: "auto",
          spaceBetween: 10,
          watchOverflow: true,
          freeMode: true,
          navigation: {
            prevEl: filtersPrevNav,
            nextEl: filtersNextNav,
            disabledClass: "swiper-button-disabled"
          }
        });
      };
      const closeDialog = () => {
        clearFrame();
        if (typeof dialog.close === "function") {
          dialog.close();
        } else {
          dialog.removeAttribute("open");
        }
        document.body.style.overflow = "";
        if (lastTrigger && typeof lastTrigger.focus === "function") {
          lastTrigger.focus();
        }
      };
      const openDialog = (trigger) => {
        const embedUrl = trigger.dataset.produceEmbed;
        const title = trigger.dataset.produceTitle || "";
        const watchUrl = trigger.dataset.produceWatch || "";
        if (!embedUrl) {
          if (watchUrl) {
            window.open(watchUrl, "_blank", "noopener,noreferrer");
          }
          return;
        }
        if (typeof dialog.showModal !== "function") {
          if (watchUrl) {
            window.open(watchUrl, "_blank", "noopener,noreferrer");
          }
          return;
        }
        lastTrigger = trigger;
        clearFrame();
        const separator = embedUrl.includes("?") ? "&" : "?";
        const iframe = document.createElement("iframe");
        iframe.className = "produce__iframe";
        iframe.src = `${embedUrl}${separator}autoplay=1`;
        iframe.title = title;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        frame.append(iframe);
        if (caption) {
          caption.textContent = title;
        }
        if (externalLink) {
          externalLink.href = watchUrl || embedUrl;
        }
        dialog.showModal();
        document.body.style.overflow = "hidden";
        closeButton == null ? void 0 : closeButton.focus();
      };
      const destroySlider = () => {
        if (!swiperInstance) {
          return;
        }
        swiperInstance.destroy(true, true);
        swiperInstance = null;
        root.classList.remove("produce--slider");
      };
      const getVisibleItems = () => items.filter((item) => !item.classList.contains("is-filtered-out"));
      const initSlider = () => {
        if (typeof window.Swiper !== "function") {
          return;
        }
        destroySlider();
        if (!getVisibleItems().length) {
          return;
        }
        root.classList.add("produce--slider");
        swiperInstance = new window.Swiper(slider, {
          slidesPerView: 1.08,
          spaceBetween: 16,
          centeredSlides: true,
          loop: false,
          rewind: false,
          grabCursor: true,
          watchOverflow: true,
          observer: true,
          observeParents: true,
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
      const applyFilter = (filterKey) => {
        activeFilter = filterKey;
        let visibleCount = 0;
        items.forEach((item) => {
          const category = item.dataset.produceCategory || "productions";
          const isVisible = category === filterKey;
          item.classList.toggle("is-filtered-out", !isVisible);
          if (isVisible) {
            visibleCount += 1;
          }
        });
        filterButtons.forEach((button) => {
          const isActive = button.dataset.produceFilter === filterKey;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
        if (pagination) {
          pagination.hidden = visibleCount === 0 || isDesktop();
        }
        if (prevNav) {
          prevNav.hidden = visibleCount === 0 || isDesktop();
        }
        if (nextNav) {
          nextNav.hidden = visibleCount === 0 || isDesktop();
        }
        closeDialog();
        if (!isDesktop() && visibleCount > 0) {
          initSlider();
        } else {
          destroySlider();
        }
      };
      const syncMode = () => {
        if (isDesktop()) {
          destroySlider();
          if (pagination) {
            pagination.hidden = true;
          }
          if (prevNav) {
            prevNav.hidden = true;
          }
          if (nextNav) {
            nextNav.hidden = true;
          }
          return;
        }
        applyFilter(activeFilter);
      };
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          applyFilter(button.dataset.produceFilter || "productions");
        });
      });
      triggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
          const item = trigger.closest(".produce__item");
          if (item == null ? void 0 : item.classList.contains("is-filtered-out")) {
            return;
          }
          openDialog(trigger);
        });
      });
      closeButton == null ? void 0 : closeButton.addEventListener("click", () => {
        closeDialog();
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
        clearFrame();
        document.body.style.overflow = "";
      });
      if (typeof desktopQuery.addEventListener === "function") {
        desktopQuery.addEventListener("change", syncMode);
      } else if (typeof desktopQuery.addListener === "function") {
        desktopQuery.addListener(syncMode);
      }
      applyFilter(activeFilter);
      initFiltersSlider();
      root.dataset.produceReady = "true";
    });
  };
  var produce_default = produce;

  // src/js/modules/reviews.js
  var reviews = () => {
    document.querySelectorAll(".reviews").forEach((root) => {
      if (root.dataset.reviewsReady === "true") {
        return;
      }
      const slider = root.querySelector(".reviews__slider");
      const prevNav = root.querySelector(".reviews__nav--prev");
      const nextNav = root.querySelector(".reviews__nav--next");
      const pagination = root.querySelector(".reviews__pagination");
      const slides = root.querySelectorAll(".reviews__item");
      if (!slider || !slides.length || typeof window.Swiper !== "function") {
        return;
      }
      root.classList.add("reviews--slider");
      new window.Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 20,
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
        }
      });
      root.dataset.reviewsReady = "true";
    });
  };
  var reviews_default = reviews;

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

  // src/js/modules/reveal.js
  var reveal = () => {
    const roots = document.querySelectorAll(".reveal");
    if (!roots.length) {
      return;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const showAll = () => {
      roots.forEach((root) => {
        root.classList.add("is-visible");
      });
    };
    if (reduceMotion.matches || typeof window.IntersectionObserver !== "function") {
      showAll();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12
      }
    );
    roots.forEach((root) => {
      observer.observe(root);
    });
    const onMotionPreferenceChange = (event) => {
      if (event.matches) {
        observer.disconnect();
        showAll();
      }
    };
    if (typeof reduceMotion.addEventListener === "function") {
      reduceMotion.addEventListener("change", onMotionPreferenceChange);
    } else if (typeof reduceMotion.addListener === "function") {
      reduceMotion.addListener(onMotionPreferenceChange);
    }
  };
  var reveal_default = reveal;

  // src/js/index.js
  var initComponents = () => {
    coreModule_default();
    internalModule_default();
    mainMenu_default();
    featuredVideos_default();
    thumbsGallery_default();
    produce_default();
    reviews_default();
    floatingButton_default();
    reveal_default();
  };
  document.addEventListener("DOMContentLoaded", initComponents);
})();
