const DESKTOP_MQ = '(width >= 960px)';

const gallery = () => {
	document.querySelectorAll('.gallery').forEach((root) => {
		if (root.dataset.galleryReady === 'true') {
			return;
		}

		const slider = root.querySelector('.gallery__slider');
		const dialog = root.querySelector('.gallery__dialog');
		const triggers = [...root.querySelectorAll('.gallery__trigger')];
		const image = root.querySelector('[data-gallery-image]');
		const placeholder = root.querySelector('[data-gallery-placeholder]');
		const caption = root.querySelector('[data-gallery-caption]');
		const figure = root.querySelector('[data-gallery-figure]');
		const closeButton = root.querySelector('[data-gallery-close]');
		const prevButton = root.querySelector('[data-gallery-prev]');
		const nextButton = root.querySelector('[data-gallery-next]');
		const prevNav = root.querySelector('.gallery__nav--prev');
		const nextNav = root.querySelector('.gallery__nav--next');
		const pagination = root.querySelector('.gallery__pagination');
		const desktopQuery = window.matchMedia(DESKTOP_MQ);

		if (!slider || !dialog || !triggers.length || !image || !placeholder || !caption) {
			return;
		}

		let activeIndex = 0;
		let swiperInstance = null;

		const isDesktop = () => desktopQuery.matches;

		const getItem = (index) => {
			const trigger = triggers[index];
			if (!trigger) {
				return null;
			}

			return {
				src: trigger.dataset.gallerySrc || '',
				alt: trigger.dataset.galleryAlt || '',
				label: trigger.dataset.galleryLabel || '',
				tone: trigger.dataset.galleryTone || 'mid',
			};
		};

		const renderItem = (index) => {
			const item = getItem(index);
			if (!item) {
				return;
			}

			activeIndex = index;
			caption.textContent = item.label;

			placeholder.className = 'gallery__dialog-placeholder';
			placeholder.classList.add(`gallery__dialog-placeholder--${item.tone}`);
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

		const closeDialog = () => {
			if (typeof dialog.close === 'function') {
				dialog.close();
			} else {
				dialog.removeAttribute('open');
			}
			document.body.style.overflow = '';
		};

		const openAt = (index) => {
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
			closeButton?.focus();
		};

		const showRelative = (offset) => {
			const nextIndex = (activeIndex + offset + triggers.length) % triggers.length;
			renderItem(nextIndex);
		};

		const destroySlider = () => {
			if (!swiperInstance) {
				return;
			}

			swiperInstance.destroy(true, true);
			swiperInstance = null;
			root.classList.remove('gallery--slider');
		};

		const initSlider = () => {
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
						slidesPerView: 1.35,
						spaceBetween: 18,
					},
					640: {
						slidesPerView: 1.6,
						spaceBetween: 20,
					},
				},
			});
		};

		const syncMode = () => {
			if (isDesktop()) {
				destroySlider();
				triggers.forEach((trigger) => {
					trigger.setAttribute('aria-haspopup', 'dialog');
				});
				return;
			}

			closeDialog();
			triggers.forEach((trigger) => {
				trigger.removeAttribute('aria-haspopup');
			});
			initSlider();
		};

		triggers.forEach((trigger, index) => {
			trigger.addEventListener('click', (event) => {
				if (!isDesktop()) {
					event.preventDefault();
					return;
				}

				openAt(index);
			});
		});

		closeButton?.addEventListener('click', () => {
			closeDialog();
		});

		prevButton?.addEventListener('click', () => {
			if (!isDesktop()) {
				return;
			}

			showRelative(-1);
		});

		nextButton?.addEventListener('click', () => {
			if (!isDesktop()) {
				return;
			}

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

		syncMode();
		root.dataset.galleryReady = 'true';
	});
};

export default gallery;
