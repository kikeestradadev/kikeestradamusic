const floatingButton = () => {
	document.querySelectorAll('.floating-button').forEach((root) => {
		const toggle = root.querySelector('.floating-button__toggle');
		const tooltip = root.querySelector('.floating-button__tooltip');

		if (!toggle || !tooltip) {
			return;
		}

		const openLabel = toggle.dataset.floatingOpen || 'Open contact';
		const closeLabel = toggle.dataset.floatingClose || 'Close contact';

		const setOpen = (isOpen) => {
			toggle.setAttribute('aria-expanded', String(isOpen));
			toggle.setAttribute('aria-label', isOpen ? closeLabel : openLabel);
			tooltip.hidden = !isOpen;
		};

		toggle.addEventListener('click', (event) => {
			event.stopPropagation();
			const isOpen = toggle.getAttribute('aria-expanded') === 'true';
			setOpen(!isOpen);
		});

		document.addEventListener('click', (event) => {
			if (!root.contains(event.target)) {
				setOpen(false);
			}
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				setOpen(false);
			}
		});
	});
};

export default floatingButton;
