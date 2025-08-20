/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      xs: '430px',
      '2xs': '375px',
      '3xl': '1920px',
    },
    colors: {
      transparent: 'transparent',
      'brandblack': '#0D0D0D',
      'white': '#FFFFFF',
      'offwhite': '#F2F6FF',
      'cardwhite': '#ECEFF4',
      'softgreen': '#D5F6ED',
      'softergreen': '#D5F6ED',
      'brandgreen': '#71D260',
      'statusgreen': '#3B872E',
      'softyellow': '#FFF4D8',
      'darkyellow': '#917900',
      'softblue': '#C9ECF5',
      'brandblue': '#286E80',
      'softred': '#FBE2F5',
      'brandred': '#9F2582',
      'lightgray': '#F9F9F9',
      'coolgray': '#AFB1D9',
      'hovergray': '#242424',
      'darkgray': '#575757',
      'togglegray': '#353535',
      'brandgray': '#898989'
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
