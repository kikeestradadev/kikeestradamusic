const reveal = () => {
	const roots = document.querySelectorAll('.reveal');
	if (!roots.length) {
		return;
	}

	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

	const showAll = () => {
		roots.forEach((root) => {
			root.classList.add('is-visible');
		});
	};

	if (reduceMotion.matches || typeof window.IntersectionObserver !== 'function') {
		showAll();
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			});
		},
		{
			rootMargin: '0px 0px -8% 0px',
			threshold: 0.12,
		}
	);

	roots.forEach((root) => {
		observer.observe(root);
	});

	const onMotionPreferenceChange = (event) => {
		if (event.matches) {
			observer.disconnect();
			showAll();
		}
	};

	if (typeof reduceMotion.addEventListener === 'function') {
		reduceMotion.addEventListener('change', onMotionPreferenceChange);
	} else if (typeof reduceMotion.addListener === 'function') {
		reduceMotion.addListener(onMotionPreferenceChange);
	}
};

export default reveal;
