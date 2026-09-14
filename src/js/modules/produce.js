const ALL_FILTER = 'all';
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
		const items = [...root.querySelectorAll('.produce__item')];
		const filterButtons = [...root.querySelectorAll('[data-produce-filter]')];
		const filtersSlider = root.querySelector('.produce__filters');
		const filtersPrevNav = root.querySelector('.produce__filters-nav--prev');
		const filtersNextNav = root.querySelector('.produce__filters-nav--next');
		const pagesRoot = root.querySelector('[data-produce-pages]');
		const pageList = root.querySelector('[data-produce-page-list]');
		const pagePrev = root.querySelector('.produce__page-nav--prev');
		const pageNext = root.querySelector('.produce__page-nav--next');
		const desktopQuery = window.matchMedia(DESKTOP_MQ);

		if (!dialog || !frame || !slider || !triggers.length) {
			root.dataset.produceReady = 'true';
			return;
		}

		let lastTrigger = null;
		let swiperInstance = null;
		let filtersSwiper = null;
		let activeFilter =
			filterButtons.find((button) => button.classList.contains('is-active'))
				?.dataset.produceFilter ||
			filterButtons[0]?.dataset.produceFilter ||
			ALL_FILTER;
		let currentPage = 1;
		let pageCount = 1;
		const pageSize = Number(pagesRoot?.dataset.produceLimit) || 5;

		const isDesktop = () => desktopQuery.matches;

		const clearFrame = () => {
			frame.replaceChildren();
		};

		const initFiltersSlider = () => {
			if (
				typeof window.Swiper !== 'function' ||
				!filtersSlider ||
				filtersSwiper ||
				!filterButtons.length
			) {
				return;
			}

			filtersSwiper = new window.Swiper(filtersSlider, {
				slidesPerView: 'auto',
				spaceBetween: 10,
				watchOverflow: true,
				freeMode: true,
				navigation: {
					prevEl: filtersPrevNav,
					nextEl: filtersNextNav,
					disabledClass: 'swiper-button-disabled',
				},
			});
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
			const captionText = trigger.dataset.produceCaption || title;
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
				caption.textContent = captionText;
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
			items.filter(
				(item) =>
					!item.classList.contains('is-filtered-out') &&
					!item.classList.contains('is-collapsed')
			);

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

		const getItemCategories = (item) =>
			(item.dataset.produceCategories || item.dataset.produceCategory || '')
				.trim()
				.split(/\s+/)
				.filter(Boolean);

		const matchesFilter = (item, filterKey) =>
			filterKey === ALL_FILTER || getItemCategories(item).includes(filterKey);

		const renderPager = () => {
			if (!pagesRoot || !pageList) {
				return;
			}

			const showPager = activeFilter === ALL_FILTER && pageCount > 1;
			pagesRoot.hidden = !showPager;
			pageList.replaceChildren();

			if (!showPager) {
				return;
			}

			for (let page = 1; page <= pageCount; page += 1) {
				const button = document.createElement('button');
				button.type = 'button';
				button.className = `produce__page${page === currentPage ? ' is-active' : ''}`;
				button.textContent = String(page);
				button.setAttribute('aria-label', String(page));
				button.setAttribute('aria-current', page === currentPage ? 'page' : 'false');
				button.addEventListener('click', () => {
					if (page === currentPage) {
						return;
					}

					currentPage = page;
					applyFilter(activeFilter, false);
				});
				pageList.append(button);
			}

			if (pagePrev) {
				pagePrev.disabled = currentPage <= 1;
			}

			if (pageNext) {
				pageNext.disabled = currentPage >= pageCount;
			}
		};

		const syncSlider = () => {
			const visibleCount = getVisibleItems().length;

			if (prevNav) {
				prevNav.hidden = visibleCount === 0 || isDesktop();
			}

			if (nextNav) {
				nextNav.hidden = visibleCount === 0 || isDesktop();
			}

			if (!isDesktop() && visibleCount > 0) {
				initSlider();
			} else {
				destroySlider();
			}
		};

		const applyFilter = (filterKey, resetPage = true) => {
			activeFilter = filterKey || ALL_FILTER;

			if (resetPage) {
				currentPage = 1;
			}

			const matchedItems = items.filter((item) => matchesFilter(item, activeFilter));
			const paged = activeFilter === ALL_FILTER;
			pageCount = paged ? Math.max(1, Math.ceil(matchedItems.length / pageSize)) : 1;

			if (currentPage > pageCount) {
				currentPage = pageCount;
			}

			const pageStart = (currentPage - 1) * pageSize;
			const pageEnd = pageStart + pageSize;

			items.forEach((item) => {
				const matched = matchesFilter(item, activeFilter);
				let collapsed = false;

				if (matched && paged) {
					const index = matchedItems.indexOf(item);
					collapsed = index < pageStart || index >= pageEnd;
				}

				item.classList.toggle('is-filtered-out', !matched);
				item.classList.toggle('is-collapsed', collapsed);
			});

			filterButtons.forEach((button) => {
				const isActive = button.dataset.produceFilter === activeFilter;
				button.classList.toggle('is-active', isActive);
				button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
			});

			renderPager();
			closeDialog();
			syncSlider();
		};

		filterButtons.forEach((button) => {
			button.addEventListener('click', () => {
				applyFilter(button.dataset.produceFilter || ALL_FILTER);
			});
		});

		pagePrev?.addEventListener('click', () => {
			if (currentPage <= 1) {
				return;
			}

			currentPage -= 1;
			applyFilter(activeFilter, false);
		});

		pageNext?.addEventListener('click', () => {
			if (currentPage >= pageCount) {
				return;
			}

			currentPage += 1;
			applyFilter(activeFilter, false);
		});

		triggers.forEach((trigger) => {
			trigger.addEventListener('click', () => {
				const item = trigger.closest('.produce__item');
				if (
					item?.classList.contains('is-filtered-out') ||
					item?.classList.contains('is-collapsed')
				) {
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
			desktopQuery.addEventListener('change', () => {
				applyFilter(activeFilter, false);
			});
		} else if (typeof desktopQuery.addListener === 'function') {
			desktopQuery.addListener(() => {
				applyFilter(activeFilter, false);
			});
		}

		applyFilter(activeFilter);
		initFiltersSlider();
		root.dataset.produceReady = 'true';
	});
};

export default produce;
