import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	base: "/e-commerce-react/",
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': new URL('./src', import.meta.url).pathname,
		},
	},
});