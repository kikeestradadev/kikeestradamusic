const reviews = () => {
	document.querySelectorAll('.reviews').forEach((root) => {
		if (root.dataset.reviewsReady === 'true') {
			return;
		}

		const slider = root.querySelector('.reviews__slider');
		const prevNav = root.querySelector('.reviews__nav--prev');
		const nextNav = root.querySelector('.reviews__nav--next');
		const pagination = root.querySelector('.reviews__pagination');
		const items = [...root.querySelectorAll('.reviews__item')];
		const filterButtons = [...root.querySelectorAll('[data-reviews-filter]')];
		const embeds = [...root.querySelectorAll('.reviews__embed')];

		if (!slider || !items.length || typeof window.Swiper !== 'function') {
			return;
		}

		let swiperInstance = null;
		let activeFilter =
			filterButtons.find((button) => button.classList.contains('is-active'))
				?.dataset.reviewsFilter ||
			filterButtons[0]?.dataset.reviewsFilter ||
			'artist';

		const restoreEmbed = (embed) => {
			if (!embed || embed.querySelector('.reviews__play')) {
				return;
			}

			const title = embed.dataset.videoTitle || '';
			const thumb = embed.dataset.videoThumb || '';
			const playLabel = embed.dataset.playLabel || 'Play';

			if (!thumb) {
				embed.replaceChildren();
				return;
			}

			const button = document.createElement('button');
			button.className = 'reviews__play';
			button.type = 'button';
			button.setAttribute('aria-label', `${playLabel}: ${title}`);

			const image = document.createElement('img');
			image.className = 'reviews__thumb';
			image.src = thumb;
			image.alt = '';
			image.loading = 'lazy';
			image.decoding = 'async';

			const icon = document.createElement('span');
			icon.className = 'reviews__play-icon';
			icon.setAttribute('aria-hidden', 'true');

			button.append(image, icon);
			embed.replaceChildren(button);
			button.addEventListener('click', () => {
				playEmbed(embed);
			});
		};

		const stopAllEmbeds = () => {
			embeds.forEach((embed) => {
				restoreEmbed(embed);
			});
		};

		const playEmbed = (embed) => {
			const url = embed.dataset.videoEmbed;
			const title = embed.dataset.videoTitle || '';

			if (!url) {
				return;
			}

			stopAllEmbeds();

			const separator = url.includes('?') ? '&' : '?';
			const iframe = document.createElement('iframe');
			iframe.className = 'reviews__iframe';
			iframe.src = `${url}${separator}autoplay=1`;
			iframe.title = title;
			iframe.allow =
				'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
			iframe.allowFullscreen = true;
			iframe.referrerPolicy = 'strict-origin-when-cross-origin';

			embed.replaceChildren(iframe);
		};

		const destroySlider = () => {
			if (!swiperInstance) {
				return;
			}

			swiperInstance.destroy(true, true);
			swiperInstance = null;
			root.classList.remove('reviews--slider');
		};

		const getVisibleItems = () =>
			items.filter((item) => !item.classList.contains('is-filtered-out'));

		const initSlider = () => {
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
			});
		};

		const applyFilter = (filterKey) => {
			activeFilter = filterKey;
			let visibleCount = 0;

			stopAllEmbeds();

			items.forEach((item) => {
				const categories = (item.dataset.reviewsCategories || '')
					.trim()
					.split(/\s+/)
					.filter(Boolean);
				const isVisible = categories.includes(filterKey);
				item.classList.toggle('is-filtered-out', !isVisible);
				if (isVisible) {
					visibleCount += 1;
				}
			});

			filterButtons.forEach((button) => {
				const isActive = button.dataset.reviewsFilter === filterKey;
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

		embeds.forEach((embed) => {
			const thumb = embed.querySelector('.reviews__thumb');
			const playButton = embed.querySelector('.reviews__play');

			if (thumb?.src) {
				embed.dataset.videoThumb = thumb.src;
			}

			if (playButton) {
				embed.dataset.playLabel =
					playButton.getAttribute('aria-label')?.split(':')[0] || 'Play';
			}

			playButton?.addEventListener('click', () => {
				playEmbed(embed);
			});
		});

		filterButtons.forEach((button) => {
			button.addEventListener('click', () => {
				const filterKey = button.dataset.reviewsFilter;
				if (!filterKey || filterKey === activeFilter) {
					return;
				}
				applyFilter(filterKey);
			});
		});

		applyFilter(activeFilter);
		root.dataset.reviewsReady = 'true';
	});
};

export default reviews;
