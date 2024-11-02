/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
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