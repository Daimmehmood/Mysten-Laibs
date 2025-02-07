/** @type {import('tailwindcss').Config} */
export default {
  content: [  './src/**/*.{js,jsx,ts,tsx}',  './index.html'],
  darkMode: 'class',
  theme: {
    container  : {
      center: true,
      padding: '0.5rem'
    },
    extend: {},
    colors : {
      primary : {
        DEFAULT: '#D40651'
      },
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent',
      current: 'currentColor',
    }
  },
  plugins: [],
}
