const initDiscographySwiper = () => {
	const el = document.querySelector('.discography-swiper');
	if (!el || typeof Swiper === 'undefined') return;

	let swiper = null;
	const mql = window.matchMedia('(max-width: 959px)');

	const enable = () => {
		if (swiper) return;

		swiper = new Swiper(el, {
			slidesPerView: 2.15,
			spaceBetween: 12,
			grabCursor: true,
			pagination: {
				el: '.discography-swiper__pagination',
				clickable: true,
			},
			breakpoints: {
				480: {
					slidesPerView: 2.5,
					spaceBetween: 16,
				},
				640: {
					slidesPerView: 3.2,
					spaceBetween: 20,
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

export default initDiscographySwiper;
