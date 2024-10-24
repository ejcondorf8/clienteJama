/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jama: {
          blue: '#5DC1B9',
          'blue-dark': '#4BA39C',
          bg: '#8DD9D5'
        }
      }
    },
  },
  plugins: [],
}