/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#424242',
        'teal-dark': '#229799', 
        'teal-light': '#48CFCB',
        'light-gray': '#F5F5F5'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}