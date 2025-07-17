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
      'offwhite': '#FAFAFA',
      'softgreen': '#D9F9D4',
      'softergreen': '#E6FDE2',
      'green': '#90DE82',
      'softyellow': '#FFF6C6',
      'softeryellow': '#FFFBD7',
      'yellow': '#FFDD33',
      'softblue': '#D8DAF7',
      'softerblue': '#EEEFFF',
      'blue': '#5564E8',
      'softred': '#FFD8D7',
      'red': '#FF968A',
      'lightgray': '#EDEDED'
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
