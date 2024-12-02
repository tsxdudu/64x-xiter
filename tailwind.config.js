/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          dark: '#6D28D9',
        },
        background: '#121212',
        surface: '#1E1E1E',
      },
    },
  },
  plugins: [],
};