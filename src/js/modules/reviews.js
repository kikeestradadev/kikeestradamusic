const reviews = () => {
	document.querySelectorAll('.reviews').forEach((root) => {
		if (root.dataset.reviewsReady === 'true') {
			return;
		}

		const slider = root.querySelector('.reviews__slider');
		const prevNav = root.querySelector('.reviews__nav--prev');
		const nextNav = root.querySelector('.reviews__nav--next');
		const pagination = root.querySelector('.reviews__pagination');
		const slides = root.querySelectorAll('.reviews__item');

		if (!slider || !slides.length || typeof window.Swiper !== 'function') {
			return;
		}

		root.classList.add('reviews--slider');
		new window.Swiper(slider, {
			slidesPerView: 1,
			spaceBetween: 16,
			loop: false,
			rewind: false,
			grabCursor: true,
			watchOverflow: true,
			pagination: pagination
				? {
						el: pagination,
						clickable: true,
					}
				: undefined,
			navigation: {
				prevEl: prevNav,
				nextEl: nextNav,
				disabledClass: 'swiper-button-disabled',
			},
			breakpoints: {
				640: {
					slidesPerView: 1.35,
					spaceBetween: 18,
				},
				960: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1280: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
			},
		});

		root.dataset.reviewsReady = 'true';
	});
};

export default reviews;
