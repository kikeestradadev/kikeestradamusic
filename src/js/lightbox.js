const initLightbox = () => {
	const lightbox = document.getElementById('lightbox');
	const lightboxImg = document.getElementById('lightbox-img');
	const closeBtn = document.getElementById('lightbox-close');
	const prevBtn = document.getElementById('lightbox-prev');
	const nextBtn = document.getElementById('lightbox-next');
	const galleryItems = document.querySelectorAll('.gallery-item');

	if (!lightbox || !lightboxImg || !galleryItems.length) return;

	const images = Array.from(galleryItems).map((item) => {
		const img = item.querySelector('img');
		return { src: img.src, alt: img.alt };
	});

	let currentIndex = 0;

	const showImage = (index) => {
		currentIndex = (index + images.length) % images.length;
		lightboxImg.src = images[currentIndex].src;
		lightboxImg.alt = images[currentIndex].alt;
	};

	const openLightbox = (index) => {
		showImage(index);
		lightbox.classList.remove('hidden');
		lightbox.classList.add('flex');
		document.body.classList.add('overflow-hidden');
		closeBtn.focus();
	};

	const closeLightbox = () => {
		lightbox.classList.add('hidden');
		lightbox.classList.remove('flex');
		document.body.classList.remove('overflow-hidden');
		lightboxImg.src = '';
	};

	galleryItems.forEach((item, index) => {
		item.addEventListener('click', () => openLightbox(index));
	});

	closeBtn.addEventListener('click', closeLightbox);

	lightbox.addEventListener('click', (e) => {
		if (e.target === lightbox) closeLightbox();
	});

	prevBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		showImage(currentIndex - 1);
	});

	nextBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		showImage(currentIndex + 1);
	});

	document.addEventListener('keydown', (e) => {
		if (lightbox.classList.contains('hidden')) return;

		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
		if (e.key === 'ArrowRight') showImage(currentIndex + 1);
	});
};

export default initLightbox;
