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

export default initNav;
