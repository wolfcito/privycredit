/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c4ff0d',
          dark: '#a8e00b',
          light: '#d4ff3d',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          card: '#1a1a1a',
          border: '#2a2a2a',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
