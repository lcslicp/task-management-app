/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      'black': '#2D2D2D',
      'darkerblue': '#090A0E',
      'darkblue': '#2C3344',
      'brightblue': '#0944CE',
      'brighterblue': '#0B53FF',
      'navyblue': '#0A00A6',
      'grey': '#4A5263',
      'lightgray': '#DEE3EB',
      'lightergray': '#DEE3EB',
      'white': '#FFF',
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
