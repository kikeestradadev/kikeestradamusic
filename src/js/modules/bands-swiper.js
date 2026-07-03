const initBandsSwiper = () => {
	const el = document.querySelector('.bands-swiper');
	if (!el || typeof Swiper === 'undefined') return;

	let swiper = null;
	const mql = window.matchMedia('(max-width: 959px)');

	const enable = () => {
		if (swiper) return;

		swiper = new Swiper(el, {
			slidesPerView: 1.12,
			spaceBetween: 16,
			grabCursor: true,
			pagination: {
				el: '.bands-swiper__pagination',
				clickable: true,
			},
			breakpoints: {
				480: {
					slidesPerView: 1.35,
					spaceBetween: 20,
				},
				640: {
					slidesPerView: 1.6,
					spaceBetween: 24,
				},
			},
		});
	};

	const disable = () => {
		if (!swiper) return;
		swiper.destroy(true, true);
		swiper = null;
	};

	const handleChange = () => {
		mql.matches ? enable() : disable();
	};

	handleChange();
	mql.addEventListener('change', handleChange);
};

export default initBandsSwiper;
