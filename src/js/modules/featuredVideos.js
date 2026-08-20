const DESKTOP_MQ = '(width >= 960px)';

const featuredVideos = () => {
	document.querySelectorAll('.featured-videos').forEach((root) => {
		if (root.dataset.featuredVideosReady === 'true') {
			return;
		}

		const slider = root.querySelector('.featured-videos__slider');
		const prevNav = root.querySelector('.featured-videos__nav--prev');
		const nextNav = root.querySelector('.featured-videos__nav--next');
		const pagination = root.querySelector('.featured-videos__pagination');
		const slides = root.querySelectorAll('.featured-videos__item');
		const embeds = root.querySelectorAll('.featured-videos__embed');
		const desktopQuery = window.matchMedia(DESKTOP_MQ);

		if (!slider || !slides.length) {
			return;
		}

		let swiperInstance = null;

		const isDesktop = () => desktopQuery.matches;

		const playEmbed = (embed) => {
			const url = embed.dataset.videoEmbed;
			const title = embed.dataset.videoTitle || '';

			if (!url) {
				return;
			}

			const separator = url.includes('?') ? '&' : '?';
			const iframe = document.createElement('iframe');
			iframe.className = 'featured-videos__iframe';
			iframe.src = `${url}${separator}autoplay=1`;
			iframe.title = title;
			iframe.allow =
				'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
			iframe.allowFullscreen = true;
			iframe.referrerPolicy = 'strict-origin-when-cross-origin';

			embed.replaceChildren(iframe);
		};

		embeds.forEach((embed) => {
			const playButton = embed.querySelector('.featured-videos__play');
			playButton?.addEventListener('click', () => {
				playEmbed(embed);
			});
		});

		const destroySlider = () => {
			if (!swiperInstance) {
				return;
			}

			swiperInstance.destroy(true, true);
			swiperInstance = null;
			root.classList.remove('featured-videos--slider');
		};

		const initSlider = () => {
			if (swiperInstance || typeof window.Swiper !== 'function') {
				return;
			}

			root.classList.add('featured-videos--slider');
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
		root.dataset.featuredVideosReady = 'true';
	});
};

export default featuredVideos;
