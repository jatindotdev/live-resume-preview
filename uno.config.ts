import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  content: {
    filesystem: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  },
  theme: {
    fontFamily: {
      sans: 'Google Sans, sans-serif',
    },
    colors: {
      background: 'var(--background)',
      pdf: 'var(--pdf-background)',
    },
    boxShadow: {
      uniform: 'var(--shadow-uniform)',
    },
  },
  presets: [presetUno()],
});
