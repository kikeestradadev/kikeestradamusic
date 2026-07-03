const initNav = () => {
	const toggle = document.getElementById('nav-toggle');
	const menu = document.getElementById('nav-menu');
	const navLinks = document.querySelectorAll('.nav-link');
	const header = document.getElementById('header');

	if (!toggle || !menu) return;

	const closeMenu = () => {
		menu.classList.add('hidden');
		menu.classList.remove('flex');
		menu.setAttribute('aria-hidden', 'true');
		toggle.setAttribute('aria-expanded', 'false');
		toggle.setAttribute('aria-label', 'Abrir menú');
		toggle.classList.remove('is-open');
		document.body.classList.remove('overflow-hidden');
	};

	const openMenu = () => {
		menu.classList.remove('hidden');
		menu.classList.add('flex');
		menu.setAttribute('aria-hidden', 'false');
		toggle.setAttribute('aria-expanded', 'true');
		toggle.setAttribute('aria-label', 'Cerrar menú');
		toggle.classList.add('is-open');
		document.body.classList.add('overflow-hidden');
	};

	toggle.addEventListener('click', () => {
		const isOpen = toggle.getAttribute('aria-expanded') === 'true';
		isOpen ? closeMenu() : openMenu();
	});

	navLinks.forEach((link) => {
		link.addEventListener('click', closeMenu);
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeMenu();
	});

	window.addEventListener('scroll', () => {
		if (!header) return;
		header.classList.toggle('shadow-lg', window.scrollY > 50);
		header.classList.toggle('shadow-accent/5', window.scrollY > 50);
	});
};



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



// Obtén tu access_key gratis en https://web3forms.com
// (ingresa kikeestradamusic@gmail.com y te llegará por correo)



	toEmail: 'kikeestradamusic@gmail.com',
	subject: 'Contacto desde kikeestradamusic.com',
};



const initContactForm = () => {
	const form = document.getElementById('contact-form');
	const statusEl = document.getElementById('contact-status');
	const submitBtn = document.getElementById('contact-submit');

	if (!form || !statusEl || !submitBtn) return;

	const setStatus = (type, message) => {
		statusEl.hidden = false;
		statusEl.textContent = message;
		statusEl.className = `contact-status contact-status--${type}`;
	};

	const setLoading = (loading) => {
		submitBtn.disabled = loading;
		submitBtn.textContent = loading ? 'Enviando…' : 'Enviar mensaje';
		submitBtn.classList.toggle('opacity-60', loading);
		submitBtn.classList.toggle('cursor-not-allowed', loading);
	};

	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		if (WEB3FORMS_ACCESS_KEY === 'REEMPLAZA_CON_TU_ACCESS_KEY') {
			setStatus('error', 'Falta configurar el access key de Web3Forms. Revisa src/js/config/contact.js');
			return;
		}

		const formData = new FormData(form);
		const payload = {
			access_key: WEB3FORMS_ACCESS_KEY,
			subject: CONTACT_CONFIG.subject,
			name: formData.get('name'),
			email: formData.get('email'),
			message: formData.get('message'),
		};

		setLoading(true);
		statusEl.hidden = true;

		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify(payload),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				form.reset();
				setStatus('success', '¡Mensaje enviado! Te responderé pronto.');
			} else {
				setStatus('error', data.message || 'No se pudo enviar el mensaje. Intenta de nuevo.');
			}
		} catch {
			setStatus('error', 'Error de conexión. Revisa tu internet e intenta de nuevo.');
		} finally {
			setLoading(false);
		}
	});
};



const initUtils = () => {
	const yearEl = document.getElementById('footer-year');
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear();
	}
};








(() => {
	initNav();
	initLightbox();
	initContactForm();
	initUtils();
})();
