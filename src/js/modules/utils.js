const initUtils = () => {
	const yearEl = document.getElementById('footer-year');
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear();
	}

	const contactForm = document.getElementById('contact-form');
	if (contactForm) {
		contactForm.addEventListener('submit', (e) => {
			e.preventDefault();

			const name = document.getElementById('contact-name').value.trim();
			const email = document.getElementById('contact-email').value.trim();
			const message = document.getElementById('contact-message').value.trim();

			const subject = encodeURIComponent('Contacto desde kikeestradamusic.com');
			const body = encodeURIComponent(
				`Nombre: ${name}\nEmail: ${email}\n\n${message}`
			);

			window.location.href = `mailto:kikeestradamusic@gmail.com?subject=${subject}&body=${body}`;
		});
	}
};

export default initUtils;
