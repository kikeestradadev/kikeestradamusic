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
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var DESKTOP_MQ = '(width >= 960px)';
var mediaGallery = function mediaGallery() {
  document.querySelectorAll('[data-media-gallery]').forEach(function (root) {
    if (root.dataset.mediaGalleryReady === 'true') {
      return;
    }
    var slider = root.querySelector('.media-gallery__slider');
    var grid = root.querySelector('.media-gallery__grid');
    var items = _toConsumableArray(root.querySelectorAll('.media-gallery__item'));
    var pills = _toConsumableArray(root.querySelectorAll('[data-media-filter]'));
    var empty = root.querySelector('[data-media-empty]');
    var dialog = root.querySelector('.media-gallery__dialog');
    var dialogImage = root.querySelector('[data-media-dialog-image]');
    var dialogVideo = root.querySelector('[data-media-dialog-video]');
    var dialogIframe = root.querySelector('[data-media-dialog-iframe]');
    var dialogCaption = root.querySelector('[data-media-dialog-caption]');
    var closeButton = root.querySelector('[data-media-close]');
    var prevButton = root.querySelector('[data-media-prev]');
    var nextButton = root.querySelector('[data-media-next]');
    var prevNav = root.querySelector('.media-gallery__nav--prev');
    var nextNav = root.querySelector('.media-gallery__nav--next');
    var counter = root.querySelector('[data-media-counter]');
    var desktopQuery = window.matchMedia(DESKTOP_MQ);
    if (!slider || !grid || !dialog || !items.length) {
      return;
    }
    var activeFilter = 'video';
    var activeIndex = 0;
    var visibleItems = items;
    var swiperInstance = null;
    var isDesktop = function isDesktop() {
      return desktopQuery.matches;
    };
    var updateCounter = function updateCounter() {
      var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (!counter) {
        return;
      }
      if (!total || isDesktop()) {
        counter.hidden = true;
        counter.textContent = '';
        return;
      }
      counter.hidden = false;
      counter.textContent = "".concat(current, " / ").concat(total);
    };
    var getVisibleItems = function getVisibleItems() {
      return items.filter(function (item) {
        if (item.hasAttribute('hidden')) {
          return false;
        }
        return item.dataset.mediaKind === activeFilter;
      });
    };
    var stopVideo = function stopVideo() {
      if (dialogIframe) {
        dialogIframe.removeAttribute('src');
        dialogIframe.setAttribute('title', '');
      }
    };
    var closeDialog = function closeDialog() {
      stopVideo();
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
      document.body.style.overflow = '';
    };
    var renderDialog = function renderDialog(item) {
      if (!item || !dialogImage || !dialogVideo || !dialogCaption) {
        return;
      }
      var kind = item.dataset.mediaKind;
      var label = item.dataset.mediaLabel || '';
      dialogCaption.textContent = label;
      if (kind === 'video') {
        dialogImage.hidden = true;
        dialogImage.removeAttribute('src');
        dialogVideo.hidden = false;
        if (dialogIframe) {
          dialogIframe.src = "".concat(item.dataset.mediaEmbed, "?autoplay=1");
          dialogIframe.title = label;
        }
        return;
      }
      stopVideo();
      dialogVideo.hidden = true;
      dialogImage.hidden = false;
      dialogImage.src = item.dataset.mediaSrc || '';
      dialogImage.alt = item.dataset.mediaAlt || label;
    };
    var openAt = function openAt(index) {
      if (!isDesktop()) {
        return;
      }
      visibleItems = getVisibleItems();
      if (!visibleItems.length) {
        return;
      }
      activeIndex = (index + visibleItems.length) % visibleItems.length;
      renderDialog(visibleItems[activeIndex]);
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      document.body.style.overflow = 'hidden';
      closeButton === null || closeButton === void 0 || closeButton.focus();
    };
    var showRelative = function showRelative(offset) {
      visibleItems = getVisibleItems();
      if (!visibleItems.length) {
        return;
      }
      activeIndex = (activeIndex + offset + visibleItems.length) % visibleItems.length;
      renderDialog(visibleItems[activeIndex]);
    };
    var updateNavTop = function updateNavTop() {
      var activeSlide = slider.querySelector('.swiper-slide-active') || getVisibleItems()[0] || null;
      var figure = activeSlide === null || activeSlide === void 0 ? void 0 : activeSlide.querySelector('.media-gallery__figure');
      if (!figure) {
        slider.style.removeProperty('--media-gallery-nav-top');
        return;
      }
      var sliderRect = slider.getBoundingClientRect();
      var figureRect = figure.getBoundingClientRect();
      var top = figureRect.top - sliderRect.top + figureRect.height / 2;
      slider.style.setProperty('--media-gallery-nav-top', "".concat(top, "px"));
    };
    var destroySlider = function destroySlider() {
      if (!swiperInstance) {
        return;
      }
      swiperInstance.destroy(true, true);
      swiperInstance = null;
      root.classList.remove('media-gallery--slider');
      slider.style.removeProperty('--media-gallery-nav-top');
    };
    var initSlider = function initSlider() {
      destroySlider();
      var slides = getVisibleItems();
      if (!slides.length || typeof window.Swiper !== 'function') {
        updateCounter(0, 0);
        return;
      }
      root.classList.add('media-gallery--slider');
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
        speed: 450,
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
        },
        on: {
          init: function init(swiper) {
            updateCounter(swiper.realIndex + 1, slides.length);
            requestAnimationFrame(updateNavTop);
          },
          slideChange: function slideChange(swiper) {
            updateCounter(swiper.realIndex + 1, slides.length);
          },
          slideChangeTransitionEnd: function slideChangeTransitionEnd() {
            updateNavTop();
          },
          resize: function resize() {
            updateNavTop();
          }
        }
      });
    };
    var applyFilter = function applyFilter(filterId) {
      activeFilter = filterId;
      pills.forEach(function (pill) {
        var isActive = pill.dataset.mediaFilter === filterId;
        pill.classList.toggle('media-gallery__pill--active', isActive);
        pill.setAttribute('aria-selected', String(isActive));
      });
      items.forEach(function (item) {
        var match = item.dataset.mediaKind === filterId;
        item.toggleAttribute('hidden', !match);
        item.classList.toggle('swiper-slide', match);
      });
      visibleItems = getVisibleItems();
      if (empty) {
        empty.hidden = visibleItems.length > 0;
      }
      if (dialog.open) {
        closeDialog();
      }
      if (isDesktop()) {
        destroySlider();
        updateCounter(0, 0);
      } else {
        initSlider();
      }
    };
    var syncMode = function syncMode() {
      if (isDesktop()) {
        closeDialog();
        destroySlider();
        updateCounter(0, 0);
        root.classList.add('media-gallery--desktop');
        root.classList.remove('media-gallery--slider');
        return;
      }
      closeDialog();
      root.classList.remove('media-gallery--desktop');
      initSlider();
    };
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        applyFilter(pill.dataset.mediaFilter || 'all');
      });
    });
    items.forEach(function (item) {
      var trigger = item.querySelector('[data-media-open]');
      trigger === null || trigger === void 0 || trigger.addEventListener('click', function (event) {
        if (!isDesktop()) {
          event.preventDefault();
          return;
        }
        visibleItems = getVisibleItems();
        var index = visibleItems.indexOf(item);
        if (index >= 0) {
          openAt(index);
        }
      });
    });
    closeButton === null || closeButton === void 0 || closeButton.addEventListener('click', function () {
      closeDialog();
    });
    prevButton === null || prevButton === void 0 || prevButton.addEventListener('click', function () {
      if (!isDesktop()) {
        return;
      }
      showRelative(-1);
    });
    nextButton === null || nextButton === void 0 || nextButton.addEventListener('click', function () {
      if (!isDesktop()) {
        return;
      }
      showRelative(1);
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
      stopVideo();
      document.body.style.overflow = '';
    });
    window.addEventListener('keydown', function (event) {
      if (!dialog.open || !isDesktop()) {
        return;
      }
      if (event.key === 'ArrowLeft') {
        showRelative(-1);
      }
      if (event.key === 'ArrowRight') {
        showRelative(1);
      }
    });
    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', syncMode);
    } else if (typeof desktopQuery.addListener === 'function') {
      desktopQuery.addListener(syncMode);
    }
    applyFilter('video');
    syncMode();
    root.dataset.mediaGalleryReady = 'true';
  });
};
/* harmony default export */ __webpack_exports__["default"] = (mediaGallery);

/***/ }),
/* 5 */
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
/* harmony import */ var _modules_mediaGallery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _modules_floatingButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);





var initComponents = function initComponents() {
  (0,_modules_coreModule__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_internalModule__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_mainMenu__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_mediaGallery__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_floatingButton__WEBPACK_IMPORTED_MODULE_4__["default"])();
};
document.addEventListener('DOMContentLoaded', initComponents);
}();
/******/ })()
;
//# sourceMappingURL=index.js.map