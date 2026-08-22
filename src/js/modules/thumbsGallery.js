const thumbsGallery = () => {
	document.querySelectorAll('.thumbs-gallery').forEach((root) => {
		if (root.dataset.thumbsGalleryReady === 'true') {
			return;
		}

		const main = root.querySelector('.thumbs-gallery__main');
		const thumbs = root.querySelector('.thumbs-gallery__thumbs');
		const prevNav = root.querySelector('.thumbs-gallery__nav--prev');
		const nextNav = root.querySelector('.thumbs-gallery__nav--next');

		if (typeof window.Swiper !== 'function' || !main || !thumbs) {
			return;
		}

		try {
			const thumbsSwiper = new window.Swiper(thumbs, {
				spaceBetween: 8,
				slidesPerView: 4,
				freeMode: true,
				watchSlidesProgress: true,
				watchOverflow: true,
				navigation: {
					prevEl: prevNav,
					nextEl: nextNav,
					disabledClass: 'is-disabled',
				},
			});

			new window.Swiper(main, {
				spaceBetween: 0,
				grabCursor: true,
				thumbs: {
					swiper: thumbsSwiper,
				},
			});

			root.dataset.thumbsGalleryReady = 'true';
		} catch (error) {
			console.error('Thumbs gallery failed to init', error);
		}
	});
};

export default thumbsGallery;
