/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#A6DD05',
          dark: '#8bc004',
          light: '#b8e534',
        },
        accent: '#A6DD05',
        light: '#F1F1F1',
        dark: {
          DEFAULT: '#171717',
          card: '#2D2D2D',
          border: '#3a3a3a',
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
