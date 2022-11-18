/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    container: {
      
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
