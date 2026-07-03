/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{html,js,pug}",
		"./public/**/*.html"
	],
	darkMode: 'class',
	theme: {
		screens: {
			's': '0px',
			'sm': '480px',
			'md': '768px',
			'm': '640px',
			'l': '960px',
			'lg': '1280px',
			'xl': '1600px',
			'xxl': '1920px',
		},
		extend: {
			colors: {
				stage: {
					DEFAULT: "#0d0d0d",
					light: "#1a1a1a",
					muted: "#2a2a2a",
					border: "#333333",
				},
				accent: {
					DEFAULT: "#d4a853",
					light: "#e8c77b",
					dark: "#b8922f",
				},
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
				display: ["Playfair Display", "Georgia", "Times New Roman", "serif"],
			},
		},
	},
	plugins: [],
	future: {
		hoverOnlyWhenSupported: true,
	},
} 
