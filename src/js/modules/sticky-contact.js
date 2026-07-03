const initStickyContact = () => {
	const widget = document.getElementById('contact-sticky');
	const toggle = document.getElementById('contact-sticky-toggle');
	const menu = document.getElementById('contact-sticky-menu');
	const triggers = document.querySelectorAll('.contact-trigger');

	if (!widget || !toggle || !menu) return;

	const open = () => {
		menu.hidden = false;
		widget.classList.add('is-open');
		toggle.setAttribute('aria-expanded', 'true');
		toggle.setAttribute('aria-label', 'Cerrar opciones de contacto');
	};

	const close = () => {
		menu.hidden = true;
		widget.classList.remove('is-open');
		toggle.setAttribute('aria-expanded', 'false');
		toggle.setAttribute('aria-label', 'Abrir opciones de contacto');
	};

	toggle.addEventListener('click', (e) => {
		e.stopPropagation();
		widget.classList.contains('is-open') ? close() : open();
	});

	triggers.forEach((trigger) => {
		trigger.addEventListener('click', (e) => {
			e.preventDefault();
			open();
		});
	});

	document.addEventListener('click', (e) => {
		if (!widget.contains(e.target)) close();
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') close();
	});
};

export default initStickyContact;
