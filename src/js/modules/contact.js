import { WEB3FORMS_ACCESS_KEY, CONTACT_CONFIG } from '../config/contact';

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

export default initContactForm;
