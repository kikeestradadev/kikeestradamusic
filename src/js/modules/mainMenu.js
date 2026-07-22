const mainMenu = () => {
	document.querySelectorAll('.main-menu').forEach((root) => {
		if (root.dataset.mainMenuReady === 'true') {
			return;
		}

		const toggle = root.querySelector('.main-menu__toggle');
		const links = root.querySelectorAll('.main-menu__link, .lang-toggle__option');
		const openLabel = toggle?.dataset.labelOpen || 'Open menu';
		const closeLabel = toggle?.dataset.labelClose || 'Close menu';

		const setOpen = (isOpen) => {
			root.classList.toggle('main-menu--open', isOpen);
			if (toggle) {
				toggle.setAttribute('aria-expanded', String(isOpen));
				toggle.setAttribute('aria-label', isOpen ? closeLabel : openLabel);
			}
			document.body.style.overflow = isOpen ? 'hidden' : '';
		};

		if (toggle) {
			toggle.addEventListener('click', () => {
				setOpen(!root.classList.contains('main-menu--open'));
			});
		}

		links.forEach((link) => {
			link.addEventListener('click', () => {
				setOpen(false);
			});
		});

		window.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				setOpen(false);
			}
		});

		root.dataset.mainMenuReady = 'true';
	});
};

export default mainMenu;
