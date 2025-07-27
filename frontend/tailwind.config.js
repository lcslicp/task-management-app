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
      'black': '#0D0D0D',
      'white': '#FFFFFF',
      'offwhite': '#F2F6FF',
      'softgreen': '#CFFFC7',
      'softergreen': '#ECF5F4',
      'green': '#71D260',
      'softyellow': '#FFF1A7',
      'softeryellow': '#FFF4D8',
      'yellow': '#C9AA10',
      'softblue': '#D8DAF7',
      'softerblue': '#F1EDFE',
      'blue': '#5564E8',
      'softred': '#FFD8D7',
      'red': '#FF968A',
      'lightgray': '#F9F9F9',
      'coolgray': '#AFB1D9',
      'hovergray': '#242424',
      'darkgray': '#575757',
      'togglegray': '#353535',
      'gray': '#898989'
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
