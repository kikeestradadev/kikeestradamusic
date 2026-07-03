/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var initNav = function initNav() {
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');
  var navLinks = document.querySelectorAll('.nav-link');
  var header = document.getElementById('header');
  if (!toggle || !menu) return;
  var closeMenu = function closeMenu() {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    toggle.classList.remove('is-open');
    document.body.classList.remove('overflow-hidden');
  };
  var openMenu = function openMenu() {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
    toggle.classList.add('is-open');
    document.body.classList.add('overflow-hidden');
  };
  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
  window.addEventListener('scroll', function () {
    if (!header) return;
    header.classList.toggle('has-shadow', window.scrollY > 50);
  });
};
/* harmony default export */ __webpack_exports__["default"] = (initNav);

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var initLightbox = function initLightbox() {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var closeBtn = document.getElementById('lightbox-close');
  var prevBtn = document.getElementById('lightbox-prev');
  var nextBtn = document.getElementById('lightbox-next');
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (!lightbox || !lightboxImg || !galleryItems.length) return;
  var images = Array.from(galleryItems).map(function (item) {
    var img = item.querySelector('img');
    return {
      src: img.src,
      alt: img.alt
    };
  });
  var currentIndex = 0;
  var showImage = function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
  };
  var openLightbox = function openLightbox(index) {
    showImage(index);
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    closeBtn.focus();
  };
  var closeLightbox = function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    lightboxImg.src = '';
  };
  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
      return openLightbox(index);
    });
  });
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  prevBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });
  nextBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });
  document.addEventListener('keydown', function (e) {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
};
/* harmony default export */ __webpack_exports__["default"] = (initLightbox);

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var initStickyContact = function initStickyContact() {
  var widget = document.getElementById('contact-sticky');
  var toggle = document.getElementById('contact-sticky-toggle');
  var menu = document.getElementById('contact-sticky-menu');
  var triggers = document.querySelectorAll('.contact-trigger');
  if (!widget || !toggle || !menu) return;
  var open = function open() {
    menu.hidden = false;
    widget.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar opciones de contacto');
  };
  var close = function close() {
    menu.hidden = true;
    widget.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir opciones de contacto');
  };
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    widget.classList.contains('is-open') ? close() : open();
  });
  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      open();
    });
  });
  document.addEventListener('click', function (e) {
    if (!widget.contains(e.target)) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
};
/* harmony default export */ __webpack_exports__["default"] = (initStickyContact);

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var initBandsSwiper = function initBandsSwiper() {
  var el = document.querySelector('.bands-swiper');
  if (!el || typeof Swiper === 'undefined') return;
  var swiper = null;
  var mql = window.matchMedia('(max-width: 959px)');
  var enable = function enable() {
    if (swiper) return;
    swiper = new Swiper(el, {
      slidesPerView: 1.12,
      spaceBetween: 16,
      grabCursor: true,
      pagination: {
        el: '.bands-swiper__pagination',
        clickable: true
      },
      breakpoints: {
        480: {
          slidesPerView: 1.35,
          spaceBetween: 20
        },
        640: {
          slidesPerView: 1.6,
          spaceBetween: 24
        }
      }
    });
  };
  var disable = function disable() {
    if (!swiper) return;
    swiper.destroy(true, true);
    swiper = null;
  };
  var handleChange = function handleChange() {
    mql.matches ? enable() : disable();
  };
  handleChange();
  mql.addEventListener('change', handleChange);
};
/* harmony default export */ __webpack_exports__["default"] = (initBandsSwiper);

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var initDiscographySwiper = function initDiscographySwiper() {
  var el = document.querySelector('.discography-swiper');
  if (!el || typeof Swiper === 'undefined') return;
  var swiper = null;
  var mql = window.matchMedia('(max-width: 959px)');
  var enable = function enable() {
    if (swiper) return;
    swiper = new Swiper(el, {
      slidesPerView: 2.15,
      spaceBetween: 12,
      grabCursor: true,
      pagination: {
        el: '.discography-swiper__pagination',
        clickable: true
      },
      breakpoints: {
        480: {
          slidesPerView: 2.5,
          spaceBetween: 16
        },
        640: {
          slidesPerView: 3.2,
          spaceBetween: 20
        }
      }
    });
  };
  var disable = function disable() {
    if (!swiper) return;
    swiper.destroy(true, true);
    swiper = null;
  };
  var handleChange = function handleChange() {
    mql.matches ? enable() : disable();
  };
  handleChange();
  mql.addEventListener('change', handleChange);
};
/* harmony default export */ __webpack_exports__["default"] = (initDiscographySwiper);

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var initUtils = function initUtils() {
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (initUtils);

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
/* harmony import */ var _modules_nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _lightbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _modules_sticky_contact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _modules_bands_swiper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _modules_discography_swiper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);






(function () {
  (0,_modules_nav__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_lightbox__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_sticky_contact__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_bands_swiper__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_discography_swiper__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_utils__WEBPACK_IMPORTED_MODULE_5__["default"])();
})();
}();
/******/ })()
;
//# sourceMappingURL=index-dist.js.map