/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
};
