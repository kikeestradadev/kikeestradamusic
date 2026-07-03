import initNav from './modules/nav';
import initLightbox from './lightbox';
import initStickyContact from './modules/sticky-contact';
import initBandsSwiper from './modules/bands-swiper';
import initDiscographySwiper from './modules/discography-swiper';
import initUtils from './modules/utils';

(() => {
	initNav();
	initLightbox();
	initStickyContact();
	initBandsSwiper();
	initDiscographySwiper();
	initUtils();
})();
