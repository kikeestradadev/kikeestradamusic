const initUtils = () => {
	const yearEl = document.getElementById('footer-year');
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear();
	}
};

export default initUtils;
