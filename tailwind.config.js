import { Warning } from 'postcss';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			container: {
				screens: {
					sm: '480px',
					md: '768px',
					lg: '1024px',
					xl: '1280px',
				},
				center: true,
				padding: '1rem',
			},
			fontFamily: ['Poppins', 'sans-serif'],
			fontWeight: {
				thin: 300,
				light: 400,
				normal: 500,
				semiBold: 600,
				bold: 700,
			},
			colors: {
				softPrimary: '#84D187',
				primary: '#00B207',
				hardPrimary: '#2C742F',
				warning: '#FF8A00',
				danger: '#EA4B48',
				white: '#ffffff',
			},
		},
	},
	plugins: [],
};
