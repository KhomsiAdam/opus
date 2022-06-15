/* eslint-disable global-require */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    fontFamily: {
      sans: 'CircularStdBook, CircularStdMedium, CircularStdBold, CircularStdBlack, jira, sans-serif',
    },
    extend: {
      colors: {
        'primary': {
          '50': '#f4f8f9',
          '100': '#eaf1f2',
          '200': '#cadddf',
          '300': '#aac9cb',
          '400': '#6ba0a4',
          '500': '#2b777d',
          '600': '#276b71',
          '700': '#20595e',
          '800': '#1a474b',
          '900': '#153a3d'
        },
        'secondary': {
          '50': '#f7fcf8',
          '100': '#eff9f1',
          '200': '#d7efdb',
          '300': '#bfe5c5',
          '400': '#8fd29a',
          '500': '#5fbe6e',
          '600': '#56ab63',
          '700': '#478f53',
          '800': '#397242',
          '900': '#2f5d36'
        },
        'danger': {
          '50': '#fcf6f6',
          '100': '#faecec',
          '200': '#f2d0d0',
          '300': '#e9b3b3',
          '400': '#d97b7b',
          '500': '#c94242',
          '600': '#b53b3b',
          '700': '#973232',
          '800': '#792828',
          '900': '#622020'
        },
        'warning': {
          '50': '#fdfdf6',
          '100': '#fcfcee',
          '200': '#f6f6d4',
          '300': '#f1f1bb',
          '400': '#e7e787',
          '500': '#dcdc54',
          '600': '#c6c64c',
          '700': '#a5a53f',
          '800': '#848432',
          '900': '#6c6c29'
        }
      },
      screens: {
        'xs': { 'max': '360px' },
        '3xl': '1920px',
        '4xl': '2560px',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
