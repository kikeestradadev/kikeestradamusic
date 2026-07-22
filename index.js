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
var gallery = function gallery() {
  document.querySelectorAll('.gallery').forEach(function (root) {
    if (root.dataset.galleryReady === 'true') {
      return;
    }
    var slider = root.querySelector('.gallery__slider');
    var dialog = root.querySelector('.gallery__dialog');
    var triggers = _toConsumableArray(root.querySelectorAll('.gallery__trigger'));
    var image = root.querySelector('[data-gallery-image]');
    var placeholder = root.querySelector('[data-gallery-placeholder]');
    var caption = root.querySelector('[data-gallery-caption]');
    var figure = root.querySelector('[data-gallery-figure]');
    var closeButton = root.querySelector('[data-gallery-close]');
    var prevButton = root.querySelector('[data-gallery-prev]');
    var nextButton = root.querySelector('[data-gallery-next]');
    var prevNav = root.querySelector('.gallery__nav--prev');
    var nextNav = root.querySelector('.gallery__nav--next');
    var pagination = root.querySelector('.gallery__pagination');
    var desktopQuery = window.matchMedia(DESKTOP_MQ);
    if (!slider || !dialog || !triggers.length || !image || !placeholder || !caption) {
      return;
    }
    var activeIndex = 0;
    var swiperInstance = null;
    var isDesktop = function isDesktop() {
      return desktopQuery.matches;
    };
    var getItem = function getItem(index) {
      var trigger = triggers[index];
      if (!trigger) {
        return null;
      }
      return {
        src: trigger.dataset.gallerySrc || '',
        alt: trigger.dataset.galleryAlt || '',
        label: trigger.dataset.galleryLabel || '',
        tone: trigger.dataset.galleryTone || 'mid'
      };
    };
    var renderItem = function renderItem(index) {
      var item = getItem(index);
      if (!item) {
        return;
      }
      activeIndex = index;
      caption.textContent = item.label;
      placeholder.className = 'gallery__dialog-placeholder';
      placeholder.classList.add("gallery__dialog-placeholder--".concat(item.tone));
      placeholder.textContent = item.label;
      if (item.src) {
        image.hidden = false;
        image.src = item.src;
        image.alt = item.alt || item.label;
        placeholder.hidden = true;
      } else {
        image.hidden = true;
        image.removeAttribute('src');
        image.alt = '';
        placeholder.hidden = false;
      }
      if (figure) {
        figure.dataset.tone = item.tone;
      }
    };
    var closeDialog = function closeDialog() {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
      document.body.style.overflow = '';
    };
    var openAt = function openAt(index) {
      if (!isDesktop()) {
        return;
      }
      renderItem(index);
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      document.body.style.overflow = 'hidden';
      closeButton === null || closeButton === void 0 || closeButton.focus();
    };
    var showRelative = function showRelative(offset) {
      var nextIndex = (activeIndex + offset + triggers.length) % triggers.length;
      renderItem(nextIndex);
    };
    var destroySlider = function destroySlider() {
      if (!swiperInstance) {
        return;
      }
      swiperInstance.destroy(true, true);
      swiperInstance = null;
      root.classList.remove('gallery--slider');
    };
    var initSlider = function initSlider() {
      if (swiperInstance || typeof window.Swiper !== 'function') {
        return;
      }
      root.classList.add('gallery--slider');
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
        } : undefined,
        navigation: {
          prevEl: prevNav,
          nextEl: nextNav,
          disabledClass: 'swiper-button-disabled'
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
    var syncMode = function syncMode() {
      if (isDesktop()) {
        destroySlider();
        triggers.forEach(function (trigger) {
          trigger.setAttribute('aria-haspopup', 'dialog');
        });
        return;
      }
      closeDialog();
      triggers.forEach(function (trigger) {
        trigger.removeAttribute('aria-haspopup');
      });
      initSlider();
    };
    triggers.forEach(function (trigger, index) {
      trigger.addEventListener('click', function (event) {
        if (!isDesktop()) {
          event.preventDefault();
          return;
        }
        openAt(index);
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
    syncMode();
    root.dataset.galleryReady = 'true';
  });
};
/* harmony default export */ __webpack_exports__["default"] = (gallery);

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var DESKTOP_MQ = '(width >= 960px)';
var youtubePortfolio = function youtubePortfolio() {
  document.querySelectorAll('.youtube-portfolio').forEach(function (root) {
    if (root.dataset.youtubePortfolioReady === 'true') {
      return;
    }
    var slider = root.querySelector('.youtube-portfolio__slider');
    var prevNav = root.querySelector('.youtube-portfolio__nav--prev');
    var nextNav = root.querySelector('.youtube-portfolio__nav--next');
    var pagination = root.querySelector('.youtube-portfolio__pagination');
    var slides = root.querySelectorAll('.youtube-portfolio__item');
    var desktopQuery = window.matchMedia(DESKTOP_MQ);
    if (!slider || !slides.length) {
      return;
    }
    var swiperInstance = null;
    var isDesktop = function isDesktop() {
      return desktopQuery.matches;
    };
    var destroySlider = function destroySlider() {
      if (!swiperInstance) {
        return;
      }
      swiperInstance.destroy(true, true);
      swiperInstance = null;
      root.classList.remove('youtube-portfolio--slider');
    };
    var initSlider = function initSlider() {
      if (swiperInstance || typeof window.Swiper !== 'function') {
        return;
      }
      root.classList.add('youtube-portfolio--slider');
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
    var syncMode = function syncMode() {
      if (isDesktop()) {
        destroySlider();
        return;
      }
      initSlider();
    };
    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', syncMode);
    } else if (typeof desktopQuery.addListener === 'function') {
      desktopQuery.addListener(syncMode);
    }
    syncMode();
    root.dataset.youtubePortfolioReady = 'true';
  });
};
/* harmony default export */ __webpack_exports__["default"] = (youtubePortfolio);

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
/* harmony import */ var _modules_gallery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _modules_youtubePortfolio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);





var initComponents = function initComponents() {
  (0,_modules_coreModule__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_internalModule__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_mainMenu__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_gallery__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_youtubePortfolio__WEBPACK_IMPORTED_MODULE_4__["default"])();
};
document.addEventListener('DOMContentLoaded', initComponents);
}();
/******/ })()
;
//# sourceMappingURL=index.js.map