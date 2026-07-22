const DESKTOP_MQ = '(width >= 960px)';

const youtubePortfolio = () => {
	document.querySelectorAll('.youtube-portfolio').forEach((root) => {
		if (root.dataset.youtubePortfolioReady === 'true') {
			return;
		}

		const slider = root.querySelector('.youtube-portfolio__slider');
		const prevNav = root.querySelector('.youtube-portfolio__nav--prev');
		const nextNav = root.querySelector('.youtube-portfolio__nav--next');
		const pagination = root.querySelector('.youtube-portfolio__pagination');
		const slides = root.querySelectorAll('.youtube-portfolio__item');
		const desktopQuery = window.matchMedia(DESKTOP_MQ);

		if (!slider || !slides.length) {
			return;
		}

		let swiperInstance = null;

		const isDesktop = () => desktopQuery.matches;

		const destroySlider = () => {
			if (!swiperInstance) {
				return;
			}

			swiperInstance.destroy(true, true);
			swiperInstance = null;
			root.classList.remove('youtube-portfolio--slider');
		};

		const initSlider = () => {
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
					480: {
						slidesPerView: 1.2,
						spaceBetween: 18,
					},
					640: {
						slidesPerView: 1.35,
						spaceBetween: 20,
					},
				},
			});
		};

		const syncMode = () => {
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

export default youtubePortfolio;
