module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: { // https://tailwindcss.com/docs/theme
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    // fontFamily: {
    //   display: [],
    //   body: [],
    // },
    // extend: {
    //   colors: {},
    //   margin: {},
    // },
  },
  variants: {
    opacity: ['responsive', 'hover'],
  },
  // plugins: [],
};
