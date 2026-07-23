const DESKTOP_MQ = '(width >= 960px)';

const mediaGallery = () => {
	document.querySelectorAll('[data-media-gallery]').forEach((root) => {
		if (root.dataset.mediaGalleryReady === 'true') {
			return;
		}

		const slider = root.querySelector('.media-gallery__slider');
		const grid = root.querySelector('.media-gallery__grid');
		const items = [...root.querySelectorAll('.media-gallery__item')];
		const pills = [...root.querySelectorAll('[data-media-filter]')];
		const empty = root.querySelector('[data-media-empty]');
		const dialog = root.querySelector('.media-gallery__dialog');
		const dialogImage = root.querySelector('[data-media-dialog-image]');
		const dialogVideo = root.querySelector('[data-media-dialog-video]');
		const dialogIframe = root.querySelector('[data-media-dialog-iframe]');
		const dialogCaption = root.querySelector('[data-media-dialog-caption]');
		const closeButton = root.querySelector('[data-media-close]');
		const prevButton = root.querySelector('[data-media-prev]');
		const nextButton = root.querySelector('[data-media-next]');
		const prevNav = root.querySelector('.media-gallery__nav--prev');
		const nextNav = root.querySelector('.media-gallery__nav--next');
		const counter = root.querySelector('[data-media-counter]');
		const desktopQuery = window.matchMedia(DESKTOP_MQ);

		if (!slider || !grid || !dialog || !items.length) {
			return;
		}

		let activeFilter = 'video';
		let activeIndex = 0;
		let visibleItems = items;
		let swiperInstance = null;

		const isDesktop = () => desktopQuery.matches;

		const updateCounter = (current = 1, total = 0) => {
			if (!counter) {
				return;
			}

			if (!total || isDesktop()) {
				counter.hidden = true;
				counter.textContent = '';
				return;
			}

			counter.hidden = false;
			counter.textContent = `${current} / ${total}`;
		};

		const getVisibleItems = () =>
			items.filter((item) => {
				if (item.hasAttribute('hidden')) {
					return false;
				}

				return item.dataset.mediaKind === activeFilter;
			});

		const stopVideo = () => {
			if (dialogIframe) {
				dialogIframe.removeAttribute('src');
				dialogIframe.setAttribute('title', '');
			}
		};

		const closeDialog = () => {
			stopVideo();
			if (typeof dialog.close === 'function') {
				dialog.close();
			} else {
				dialog.removeAttribute('open');
			}
			document.body.style.overflow = '';
		};

		const renderDialog = (item) => {
			if (!item || !dialogImage || !dialogVideo || !dialogCaption) {
				return;
			}

			const kind = item.dataset.mediaKind;
			const label = item.dataset.mediaLabel || '';

			dialogCaption.textContent = label;

			if (kind === 'video') {
				dialogImage.hidden = true;
				dialogImage.removeAttribute('src');
				dialogVideo.hidden = false;
				if (dialogIframe) {
					dialogIframe.src = `${item.dataset.mediaEmbed}?autoplay=1`;
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

		const openAt = (index) => {
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
			closeButton?.focus();
		};

		const showRelative = (offset) => {
			visibleItems = getVisibleItems();
			if (!visibleItems.length) {
				return;
			}

			activeIndex = (activeIndex + offset + visibleItems.length) % visibleItems.length;
			renderDialog(visibleItems[activeIndex]);
		};

		const updateNavTop = () => {
			const activeSlide =
				slider.querySelector('.swiper-slide-active') ||
				getVisibleItems()[0] ||
				null;
			const figure = activeSlide?.querySelector('.media-gallery__figure');

			if (!figure) {
				slider.style.removeProperty('--media-gallery-nav-top');
				return;
			}

			const sliderRect = slider.getBoundingClientRect();
			const figureRect = figure.getBoundingClientRect();
			const top =
				figureRect.top - sliderRect.top + figureRect.height / 2;
			slider.style.setProperty('--media-gallery-nav-top', `${top}px`);
		};

		const destroySlider = () => {
			if (!swiperInstance) {
				return;
			}

			swiperInstance.destroy(true, true);
			swiperInstance = null;
			root.classList.remove('media-gallery--slider');
			slider.style.removeProperty('--media-gallery-nav-top');
		};

		const initSlider = () => {
			destroySlider();

			const slides = getVisibleItems();
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
				preventClicks: false,
				preventClicksPropagation: false,
				speed: 450,
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
				on: {
					init(swiper) {
						updateCounter(swiper.realIndex + 1, slides.length);
						requestAnimationFrame(updateNavTop);
					},
					slideChange(swiper) {
						updateCounter(swiper.realIndex + 1, slides.length);
					},
					slideChangeTransitionEnd() {
						updateNavTop();
					},
					resize() {
						updateNavTop();
					},
				},
			});
		};

		const applyFilter = (filterId) => {
			activeFilter = filterId;

			pills.forEach((pill) => {
				const isActive = pill.dataset.mediaFilter === filterId;
				pill.classList.toggle('media-gallery__pill--active', isActive);
				pill.setAttribute('aria-selected', String(isActive));
			});

			items.forEach((item) => {
				const match = item.dataset.mediaKind === filterId;
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

		const syncMode = () => {
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

		pills.forEach((pill) => {
			pill.addEventListener('click', () => {
				applyFilter(pill.dataset.mediaFilter || 'all');
			});
		});

		items.forEach((item) => {
			const trigger = item.querySelector('[data-media-open]');
			trigger?.addEventListener('click', () => {
				visibleItems = getVisibleItems();
				const index = visibleItems.indexOf(item);
				if (index >= 0) {
					openAt(index);
				}
			});
		});

		closeButton?.addEventListener('click', () => {
			closeDialog();
		});

		prevButton?.addEventListener('click', () => {
			showRelative(-1);
		});

		nextButton?.addEventListener('click', () => {
			showRelative(1);
		});

		dialog.addEventListener('click', (event) => {
			if (event.target === dialog) {
				closeDialog();
			}
		});

		dialog.addEventListener('cancel', (event) => {
			event.preventDefault();
			closeDialog();
		});

		dialog.addEventListener('close', () => {
			stopVideo();
			document.body.style.overflow = '';
		});

		window.addEventListener('keydown', (event) => {
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

export default mediaGallery;
