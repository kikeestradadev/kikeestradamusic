/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var coreModule = function coreModule() {
  document.querySelectorAll('.core-module').forEach(function (root) {
    // Toda consulta y listener queda acotado a root.
    root.dataset.coreModuleReady = 'true';
  });
};
/* harmony default export */ __webpack_exports__["default"] = (coreModule);

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var internalModule = function internalModule() {
  document.querySelectorAll('.internal-module').forEach(function (root) {
    // Toda consulta y listener queda acotado a root.
    root.dataset.internalModuleReady = 'true';
  });
};
/* harmony default export */ __webpack_exports__["default"] = (internalModule);

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var mainMenu = function mainMenu() {
  document.querySelectorAll('.main-menu').forEach(function (root) {
    if (root.dataset.mainMenuReady === 'true') {
      return;
    }
    var toggle = root.querySelector('.main-menu__toggle');
    var links = root.querySelectorAll('.main-menu__link, .lang-toggle__option');
    var openLabel = (toggle === null || toggle === void 0 ? void 0 : toggle.dataset.labelOpen) || 'Open menu';
    var closeLabel = (toggle === null || toggle === void 0 ? void 0 : toggle.dataset.labelClose) || 'Close menu';
    var setOpen = function setOpen(isOpen) {
      root.classList.toggle('main-menu--open', isOpen);
      if (toggle) {
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? closeLabel : openLabel);
      }
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };
    if (toggle) {
      toggle.addEventListener('click', function () {
        setOpen(!root.classList.contains('main-menu--open'));
      });
    }
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });
    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    });
    root.dataset.mainMenuReady = 'true';
  });
};
/* harmony default export */ __webpack_exports__["default"] = (mainMenu);

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var featuredVideos = function featuredVideos() {
  document.querySelectorAll('.featured-videos').forEach(function (root) {
    if (root.dataset.featuredVideosReady === 'true') {
      return;
    }
    var embeds = root.querySelectorAll('.featured-videos__embed');
    if (!embeds.length) {
      return;
    }
    var playEmbed = function playEmbed(embed) {
      var url = embed.dataset.videoEmbed;
      var title = embed.dataset.videoTitle || '';
      if (!url) {
        return;
      }
      var separator = url.includes('?') ? '&' : '?';
      var iframe = document.createElement('iframe');
      iframe.className = 'featured-videos__iframe';
      iframe.src = "".concat(url).concat(separator, "autoplay=1");
      iframe.title = title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      embed.replaceChildren(iframe);
    };
    embeds.forEach(function (embed) {
      var playButton = embed.querySelector('.featured-videos__play');
      playButton === null || playButton === void 0 || playButton.addEventListener('click', function () {
        playEmbed(embed);
      });
    });
    root.dataset.featuredVideosReady = 'true';
  });
};
/* harmony default export */ __webpack_exports__["default"] = (featuredVideos);

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var thumbsGallery = function thumbsGallery() {
  document.querySelectorAll('.thumbs-gallery').forEach(function (root) {
    if (root.dataset.thumbsGalleryReady === 'true') {
      return;
    }
    var main = root.querySelector('.thumbs-gallery__main');
    var thumbs = root.querySelector('.thumbs-gallery__thumbs');
    var prevNav = root.querySelector('.thumbs-gallery__nav--prev');
    var nextNav = root.querySelector('.thumbs-gallery__nav--next');
    if (typeof window.Swiper !== 'function' || !main || !thumbs) {
      return;
    }
    try {
      var thumbsSwiper = new window.Swiper(thumbs, {
        spaceBetween: 8,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        watchOverflow: true,
        navigation: {
          prevEl: prevNav,
          nextEl: nextNav,
          disabledClass: 'is-disabled'
        }
      });
      new window.Swiper(main, {
        spaceBetween: 0,
        grabCursor: true,
        thumbs: {
          swiper: thumbsSwiper
        }
      });
      root.dataset.thumbsGalleryReady = 'true';
    } catch (error) {
      console.error('Thumbs gallery failed to init', error);
    }
  });
};
/* harmony default export */ __webpack_exports__["default"] = (thumbsGallery);

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var DESKTOP_MQ = '(width >= 960px)';
var produce = function produce() {
  document.querySelectorAll('.produce').forEach(function (root) {
    var _filterButtons$;
    if (root.dataset.produceReady === 'true') {
      return;
    }
    var dialog = root.querySelector('.produce__dialog');
    var frame = root.querySelector('[data-produce-frame]');
    var caption = root.querySelector('[data-produce-caption]');
    var externalLink = root.querySelector('[data-produce-external]');
    var closeButton = root.querySelector('[data-produce-close]');
    var triggers = _toConsumableArray(root.querySelectorAll('.produce__play'));
    var slider = root.querySelector('.produce__slider');
    var prevNav = root.querySelector('.produce__nav--prev');
    var nextNav = root.querySelector('.produce__nav--next');
    var pagination = root.querySelector('.produce__pagination');
    var items = _toConsumableArray(root.querySelectorAll('.produce__item'));
    var filterButtons = _toConsumableArray(root.querySelectorAll('[data-produce-filter]'));
    var filtersSlider = root.querySelector('.produce__filters');
    var filtersPrevNav = root.querySelector('.produce__filters-nav--prev');
    var filtersNextNav = root.querySelector('.produce__filters-nav--next');
    var desktopQuery = window.matchMedia(DESKTOP_MQ);
    if (!dialog || !frame || !slider || !triggers.length) {
      root.dataset.produceReady = 'true';
      return;
    }
    var lastTrigger = null;
    var swiperInstance = null;
    var filtersSwiper = null;
    var activeFilter = ((_filterButtons$ = filterButtons[0]) === null || _filterButtons$ === void 0 ? void 0 : _filterButtons$.dataset.produceFilter) || 'productions';
    var isDesktop = function isDesktop() {
      return desktopQuery.matches;
    };
    var clearFrame = function clearFrame() {
      frame.replaceChildren();
    };
    var initFiltersSlider = function initFiltersSlider() {
      if (typeof window.Swiper !== 'function' || !filtersSlider || filtersSwiper || !filterButtons.length) {
        return;
      }
      filtersSwiper = new window.Swiper(filtersSlider, {
        slidesPerView: 'auto',
        spaceBetween: 10,
        watchOverflow: true,
        freeMode: true,
        navigation: {
          prevEl: filtersPrevNav,
          nextEl: filtersNextNav,
          disabledClass: 'swiper-button-disabled'
        }
      });
    };
    var closeDialog = function closeDialog() {
      clearFrame();
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
      document.body.style.overflow = '';
      if (lastTrigger && typeof lastTrigger.focus === 'function') {
        lastTrigger.focus();
      }
    };
    var openDialog = function openDialog(trigger) {
      var embedUrl = trigger.dataset.produceEmbed;
      var title = trigger.dataset.produceTitle || '';
      var captionText = trigger.dataset.produceCaption || title;
      var watchUrl = trigger.dataset.produceWatch || '';
      if (!embedUrl) {
        if (watchUrl) {
          window.open(watchUrl, '_blank', 'noopener,noreferrer');
        }
        return;
      }
      if (typeof dialog.showModal !== 'function') {
        if (watchUrl) {
          window.open(watchUrl, '_blank', 'noopener,noreferrer');
        }
        return;
      }
      lastTrigger = trigger;
      clearFrame();
      var separator = embedUrl.includes('?') ? '&' : '?';
      var iframe = document.createElement('iframe');
      iframe.className = 'produce__iframe';
      iframe.src = "".concat(embedUrl).concat(separator, "autoplay=1");
      iframe.title = title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.append(iframe);
      if (caption) {
        caption.textContent = captionText;
      }
      if (externalLink) {
        externalLink.href = watchUrl || embedUrl;
      }
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      closeButton === null || closeButton === void 0 || closeButton.focus();
    };
    var destroySlider = function destroySlider() {
      if (!swiperInstance) {
        return;
      }
      swiperInstance.destroy(true, true);
      swiperInstance = null;
      root.classList.remove('produce--slider');
    };
    var getVisibleItems = function getVisibleItems() {
      return items.filter(function (item) {
        return !item.classList.contains('is-filtered-out');
      });
    };
    var initSlider = function initSlider() {
      if (typeof window.Swiper !== 'function') {
        return;
      }
      destroySlider();
      if (!getVisibleItems().length) {
        return;
      }
      root.classList.add('produce--slider');
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
        } : undefined,
        navigation: {
          prevEl: prevNav,
          nextEl: nextNav,
          disabledClass: 'swiper-button-disabled'
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
    var applyFilter = function applyFilter(filterKey) {
      activeFilter = filterKey;
      var visibleCount = 0;
      items.forEach(function (item) {
        var category = item.dataset.produceCategory || 'productions';
        var isVisible = category === filterKey;
        item.classList.toggle('is-filtered-out', !isVisible);
        if (isVisible) {
          visibleCount += 1;
        }
      });
      filterButtons.forEach(function (button) {
        var isActive = button.dataset.produceFilter === filterKey;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
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
    var syncMode = function syncMode() {
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
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        applyFilter(button.dataset.produceFilter || 'productions');
      });
    });
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.produce__item');
        if (item !== null && item !== void 0 && item.classList.contains('is-filtered-out')) {
          return;
        }
        openDialog(trigger);
      });
    });
    closeButton === null || closeButton === void 0 || closeButton.addEventListener('click', function () {
      closeDialog();
    });
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) {
        closeDialog();
      }
    });
    dialog.addEventListener('cancel', function (event) {
      event.preventDefault();
      closeDialog();
    });
    dialog.addEventListener('close', function () {
      clearFrame();
      document.body.style.overflow = '';
    });
    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', syncMode);
    } else if (typeof desktopQuery.addListener === 'function') {
      desktopQuery.addListener(syncMode);
    }
    applyFilter(activeFilter);
    initFiltersSlider();
    root.dataset.produceReady = 'true';
  });
};
/* harmony default export */ __webpack_exports__["default"] = (produce);

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var reviews = function reviews() {
  document.querySelectorAll('.reviews').forEach(function (root) {
    var _filterButtons$find, _filterButtons$;
    if (root.dataset.reviewsReady === 'true') {
      return;
    }
    var slider = root.querySelector('.reviews__slider');
    var prevNav = root.querySelector('.reviews__nav--prev');
    var nextNav = root.querySelector('.reviews__nav--next');
    var pagination = root.querySelector('.reviews__pagination');
    var items = _toConsumableArray(root.querySelectorAll('.reviews__item'));
    var filterButtons = _toConsumableArray(root.querySelectorAll('[data-reviews-filter]'));
    var filtersSlider = root.querySelector('.reviews__filters');
    var filtersPrevNav = root.querySelector('.reviews__filters-nav--prev');
    var filtersNextNav = root.querySelector('.reviews__filters-nav--next');
    var embeds = _toConsumableArray(root.querySelectorAll('.reviews__embed'));
    if (!slider || !items.length || typeof window.Swiper !== 'function') {
      return;
    }
    var swiperInstance = null;
    var filtersSwiper = null;
    var activeFilter = ((_filterButtons$find = filterButtons.find(function (button) {
      return button.classList.contains('is-active');
    })) === null || _filterButtons$find === void 0 ? void 0 : _filterButtons$find.dataset.reviewsFilter) || ((_filterButtons$ = filterButtons[0]) === null || _filterButtons$ === void 0 ? void 0 : _filterButtons$.dataset.reviewsFilter) || 'all';
    var initFiltersSlider = function initFiltersSlider() {
      if (!filtersSlider || filtersSwiper || !filterButtons.length) {
        return;
      }
      filtersSwiper = new window.Swiper(filtersSlider, {
        slidesPerView: 'auto',
        spaceBetween: 10,
        watchOverflow: true,
        freeMode: true,
        navigation: {
          prevEl: filtersPrevNav,
          nextEl: filtersNextNav,
          disabledClass: 'swiper-button-disabled'
        }
      });
    };
    var restoreEmbed = function restoreEmbed(embed) {
      if (!embed || embed.querySelector('.reviews__play')) {
        return;
      }
      var title = embed.dataset.videoTitle || '';
      var thumb = embed.dataset.videoThumb || '';
      var playLabel = embed.dataset.playLabel || 'Play';
      if (!thumb) {
        embed.replaceChildren();
        return;
      }
      var button = document.createElement('button');
      button.className = 'reviews__play';
      button.type = 'button';
      button.setAttribute('aria-label', "".concat(playLabel, ": ").concat(title));
      var image = document.createElement('img');
      image.className = 'reviews__thumb';
      image.src = thumb;
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      var icon = document.createElement('span');
      icon.className = 'reviews__play-icon';
      icon.setAttribute('aria-hidden', 'true');
      button.append(image, icon);
      embed.replaceChildren(button);
      button.addEventListener('click', function () {
        playEmbed(embed);
      });
    };
    var stopAllEmbeds = function stopAllEmbeds() {
      embeds.forEach(function (embed) {
        restoreEmbed(embed);
      });
    };
    var playEmbed = function playEmbed(embed) {
      var url = embed.dataset.videoEmbed;
      var title = embed.dataset.videoTitle || '';
      if (!url) {
        return;
      }
      stopAllEmbeds();
      var separator = url.includes('?') ? '&' : '?';
      var iframe = document.createElement('iframe');
      iframe.className = 'reviews__iframe';
      iframe.src = "".concat(url).concat(separator, "autoplay=1");
      iframe.title = title;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      embed.replaceChildren(iframe);
    };
    var destroySlider = function destroySlider() {
      if (!swiperInstance) {
        return;
      }
      swiperInstance.destroy(true, true);
      swiperInstance = null;
      root.classList.remove('reviews--slider');
    };
    var getVisibleItems = function getVisibleItems() {
      return items.filter(function (item) {
        return !item.classList.contains('is-filtered-out');
      });
    };
    var initSlider = function initSlider() {
      destroySlider();
      if (!getVisibleItems().length) {
        return;
      }
      root.classList.add('reviews--slider');
      swiperInstance = new window.Swiper(slider, {
        slidesPerView: 'auto',
        spaceBetween: 18,
        loop: false,
        rewind: false,
        grabCursor: true,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        pagination: pagination ? {
          el: pagination,
          clickable: true
        } : undefined,
        navigation: {
          prevEl: prevNav,
          nextEl: nextNav,
          disabledClass: 'swiper-button-disabled'
        }
      });
    };
    var applyFilter = function applyFilter(filterKey) {
      activeFilter = filterKey;
      var visibleCount = 0;
      stopAllEmbeds();
      items.forEach(function (item) {
        var categories = (item.dataset.reviewsCategories || '').trim().split(/\s+/).filter(Boolean);
        var isVisible = filterKey === 'all' || categories.includes(filterKey);
        item.classList.toggle('is-filtered-out', !isVisible);
        if (isVisible) {
          visibleCount += 1;
        }
      });
      filterButtons.forEach(function (button) {
        var isActive = button.dataset.reviewsFilter === filterKey;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      if (pagination) {
        pagination.hidden = visibleCount === 0;
      }
      if (prevNav) {
        prevNav.hidden = visibleCount === 0;
      }
      if (nextNav) {
        nextNav.hidden = visibleCount === 0;
      }
      initSlider();
    };
    embeds.forEach(function (embed) {
      var thumb = embed.querySelector('.reviews__thumb');
      var playButton = embed.querySelector('.reviews__play');
      if (thumb !== null && thumb !== void 0 && thumb.src) {
        embed.dataset.videoThumb = thumb.src;
      }
      if (playButton) {
        var _playButton$getAttrib;
        embed.dataset.playLabel = ((_playButton$getAttrib = playButton.getAttribute('aria-label')) === null || _playButton$getAttrib === void 0 ? void 0 : _playButton$getAttrib.split(':')[0]) || 'Play';
      }
      playButton === null || playButton === void 0 || playButton.addEventListener('click', function () {
        playEmbed(embed);
      });
    });
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var filterKey = button.dataset.reviewsFilter;
        if (!filterKey || filterKey === activeFilter) {
          return;
        }
        applyFilter(filterKey);
      });
    });
    initFiltersSlider();
    applyFilter(activeFilter);
    root.dataset.reviewsReady = 'true';
  });
};
/* harmony default export */ __webpack_exports__["default"] = (reviews);

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var floatingButton = function floatingButton() {
  document.querySelectorAll('.floating-button').forEach(function (root) {
    var toggle = root.querySelector('.floating-button__toggle');
    var tooltip = root.querySelector('.floating-button__tooltip');
    if (!toggle || !tooltip) {
      return;
    }
    var openLabel = toggle.dataset.floatingOpen || 'Open contact';
    var closeLabel = toggle.dataset.floatingClose || 'Close contact';
    var setOpen = function setOpen(isOpen) {
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? closeLabel : openLabel);
      tooltip.hidden = !isOpen;
    };
    toggle.addEventListener('click', function (event) {
      event.stopPropagation();
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });
    document.addEventListener('click', function (event) {
      if (!root.contains(event.target)) {
        setOpen(false);
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    });
  });
};
/* harmony default export */ __webpack_exports__["default"] = (floatingButton);

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var reveal = function reveal() {
  var roots = document.querySelectorAll('.reveal');
  if (!roots.length) {
    return;
  }
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var showAll = function showAll() {
    roots.forEach(function (root) {
      root.classList.add('is-visible');
    });
  };
  if (reduceMotion.matches || typeof window.IntersectionObserver !== 'function') {
    showAll();
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  });
  roots.forEach(function (root) {
    observer.observe(root);
  });
  var onMotionPreferenceChange = function onMotionPreferenceChange(event) {
    if (event.matches) {
      observer.disconnect();
      showAll();
    }
  };
  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', onMotionPreferenceChange);
  } else if (typeof reduceMotion.addListener === 'function') {
    reduceMotion.addListener(onMotionPreferenceChange);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (reveal);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_coreModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_internalModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _modules_mainMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _modules_featuredVideos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _modules_thumbsGallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _modules_produce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _modules_reviews__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);
/* harmony import */ var _modules_floatingButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8);
/* harmony import */ var _modules_reveal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9);









var initComponents = function initComponents() {
  (0,_modules_coreModule__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_internalModule__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_mainMenu__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_featuredVideos__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_thumbsGallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_produce__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_reviews__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_floatingButton__WEBPACK_IMPORTED_MODULE_7__["default"])();
  (0,_modules_reveal__WEBPACK_IMPORTED_MODULE_8__["default"])();
};
document.addEventListener('DOMContentLoaded', initComponents);
}();
/******/ })()
;
//# sourceMappingURL=index.js.map