const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      ...colors,
      color1: '#026BFE',
      color2: '#FD1B30',
      color3: '#6907E8',
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
