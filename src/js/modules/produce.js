const DESKTOP_MQ = '(width >= 960px)';

const produce = () => {
	document.querySelectorAll('.produce').forEach((root) => {
		if (root.dataset.produceReady === 'true') {
			return;
		}

		const dialog = root.querySelector('.produce__dialog');
		const frame = root.querySelector('[data-produce-frame]');
		const caption = root.querySelector('[data-produce-caption]');
		const externalLink = root.querySelector('[data-produce-external]');
		const closeButton = root.querySelector('[data-produce-close]');
		const triggers = [...root.querySelectorAll('.produce__play')];
		const slider = root.querySelector('.produce__slider');
		const prevNav = root.querySelector('.produce__nav--prev');
		const nextNav = root.querySelector('.produce__nav--next');
		const pagination = root.querySelector('.produce__pagination');
		const items = [...root.querySelectorAll('.produce__item')];
		const filterButtons = [...root.querySelectorAll('[data-produce-filter]')];
		const desktopQuery = window.matchMedia(DESKTOP_MQ);

		if (!dialog || !frame || !slider || !triggers.length) {
			return;
		}

		let lastTrigger = null;
		let swiperInstance = null;
		let activeFilter = filterButtons[0]?.dataset.produceFilter || 'productions';

		const isDesktop = () => desktopQuery.matches;

		const clearFrame = () => {
			frame.replaceChildren();
		};

		const closeDialog = () => {
			clearFrame();

			if (typeof dialog.close === 'function') {
				dialog.close();
			} else {
				dialog.removeAttribute('open');
			}

			document.body.style.overflow = '';

			if (lastTrigger && typeof lastTrigger.focus === 'function') {
				lastTrigger.focus();
			}
		};

		const openDialog = (trigger) => {
			const embedUrl = trigger.dataset.produceEmbed;
			const title = trigger.dataset.produceTitle || '';
			const watchUrl = trigger.dataset.produceWatch || '';

			if (!embedUrl) {
				if (watchUrl) {
					window.open(watchUrl, '_blank', 'noopener,noreferrer');
				}
				return;
			}

			if (typeof dialog.showModal !== 'function') {
				if (watchUrl) {
					window.open(watchUrl, '_blank', 'noopener,noreferrer');
				}
				return;
			}

			lastTrigger = trigger;
			clearFrame();

			const separator = embedUrl.includes('?') ? '&' : '?';
			const iframe = document.createElement('iframe');
			iframe.className = 'produce__iframe';
			iframe.src = `${embedUrl}${separator}autoplay=1`;
			iframe.title = title;
			iframe.allow =
				'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
			iframe.allowFullscreen = true;
			iframe.referrerPolicy = 'strict-origin-when-cross-origin';
			frame.append(iframe);

			if (caption) {
				caption.textContent = title;
			}

			if (externalLink) {
				externalLink.href = watchUrl || embedUrl;
			}

			dialog.showModal();
			document.body.style.overflow = 'hidden';
			closeButton?.focus();
		};

		const destroySlider = () => {
			if (!swiperInstance) {
				return;
			}

			swiperInstance.destroy(true, true);
			swiperInstance = null;
			root.classList.remove('produce--slider');
		};

		const getVisibleItems = () =>
			items.filter((item) => !item.classList.contains('is-filtered-out'));

		const initSlider = () => {
			if (typeof window.Swiper !== 'function') {
				return;
			}

			destroySlider();

			if (!getVisibleItems().length) {
				return;
			}

			root.classList.add('produce--slider');
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

		const applyFilter = (filterKey) => {
			activeFilter = filterKey;
			let visibleCount = 0;

			items.forEach((item) => {
				const category = item.dataset.produceCategory || 'productions';
				const isVisible = category === filterKey;
				item.classList.toggle('is-filtered-out', !isVisible);
				if (isVisible) {
					visibleCount += 1;
				}
			});

			filterButtons.forEach((button) => {
				const isActive = button.dataset.produceFilter === filterKey;
				button.classList.toggle('is-active', isActive);
				button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
			});

			if (pagination) {
				pagination.hidden = visibleCount === 0 || isDesktop();
			}

			if (prevNav) {
				prevNav.hidden = visibleCount === 0 || isDesktop();
			}

			if (nextNav) {
				nextNav.hidden = visibleCount === 0 || isDesktop();
			}

			closeDialog();

			if (!isDesktop() && visibleCount > 0) {
				initSlider();
			} else {
				destroySlider();
			}
		};

		const syncMode = () => {
			if (isDesktop()) {
				destroySlider();
				if (pagination) {
					pagination.hidden = true;
				}
				if (prevNav) {
					prevNav.hidden = true;
				}
				if (nextNav) {
					nextNav.hidden = true;
				}
				return;
			}

			applyFilter(activeFilter);
		};

		filterButtons.forEach((button) => {
			button.addEventListener('click', () => {
				applyFilter(button.dataset.produceFilter || 'productions');
			});
		});

		triggers.forEach((trigger) => {
			trigger.addEventListener('click', () => {
				const item = trigger.closest('.produce__item');
				if (item?.classList.contains('is-filtered-out')) {
					return;
				}

				openDialog(trigger);
			});
		});

		closeButton?.addEventListener('click', () => {
			closeDialog();
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
			clearFrame();
			document.body.style.overflow = '';
		});

		if (typeof desktopQuery.addEventListener === 'function') {
			desktopQuery.addEventListener('change', syncMode);
		} else if (typeof desktopQuery.addListener === 'function') {
			desktopQuery.addListener(syncMode);
		}

		applyFilter(activeFilter);
		root.dataset.produceReady = 'true';
	});
};

export default produce;
