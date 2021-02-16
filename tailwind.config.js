const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      color1: '#026BFE',
      color2: '#FD1B30',
      color3: '#6907E8',
      white: colors.white,
      black: colors.black,
    },
    pseudo: {
      before: 'before',
      after: 'after',
      'not-first': 'not(:first-child)',
    },
  },
  variants: {
    extend: {},
  },
};
