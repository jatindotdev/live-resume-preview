module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: 'Google Sans, sans-serif',
			},
			colors: {
				"bg": 'hsl(var(--bg))',
				"bg-alt": 'hsl(var(--bg-alt))',
				"fg": 'hsl(var(--fg))',
				"fg-secondary": 'hsl(var(--fg-secondary))',
				"primary": 'hsl(var(--primary))',
				"primary-hover": 'hsl(var(--primary-hover))',
				"primay-active": 'hsl(var(--primay-active))',
				"border-disabled": 'hsl(var(--border-disabled))',
				"border": 'hsl(var(--border))',
				"border-active": 'hsl(var(--border-active))',
				"card": 'hsl(var(--card))',
				"card-hover": 'hsl(var(--card-hover))',
			},
			boxShadow: {
				uniform: 'var(--shadow-uniform)',
			},
		},
	},
	plugins: [],
};
