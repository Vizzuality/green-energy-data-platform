const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./**/*.{jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        color1: '#009DCD',
        gray1: '#3A3F59',
        gray3: '#2F3031',
        gray4: '#C4C4C4',
        gray5: '#EAEFF3',
        gray6: '#0E3072',
        grayProfile: '#35373E', // TO DO - change name when adapting colors
        warning: '#FF472E',
        // chart colors
        color4: '#A880FF',
        color5: '#29C2DA',
        color6: '#FEB961',
        color7: '#00A3FE',
        color8: '#FFACE3',
        color9: '#1D8190',
        color10: '#FF7629',
        color11: '#CC1771',
        color12: '#8E9195',
        'gradient-white': 'linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 49.55%, rgba(255, 255, 255, 0) 101.2%)',
        'red-100': '#FD1A2F',
      },
      spacing: {
        3.75: '0.938rem',
        4.5: '1.125rem',
        6.5: '1.563rem',
        7.5: '1.875rem',
        13: '3.125rem',
        23: '5.65rem',
      },
      minHeight: {
        '1/4': '25vh',
        '1/2': '50vh',
        '3/4': '75vh',
        xs: '13.75rem',
      },
      maxHeight: {
        128: '32rem',
      },
      maxWidth: {
        xs: '13rem',
      },
      fontSize: {
        '2.5xl': '1.625rem',
        '3.5xl': '2rem',
        '5.5xl': '3.25rem',
      },
      height: {
        0.2: '0.0625rem',
        0.7: '0.188rem',
        7.5: '1.875rem',
      },
      borderWidth: {
        3: '0.188rem',
        6: '0.375rem',
      },
      borderRadius: {
        '2lg': '0.625rem',
        '2.5xl': '1.25rem',
        '4xl': '4.5rem',
      },
      borderColor: {
        'gradient-color1': 'linear-gradient(119.21deg, #45CBF4 1.52%, #009DCD 56.4%, #2A8FAF 100%)',
        'gradient-white': 'linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 49.55%, rgba(255, 255, 255, 0) 101.2%)',
      },
      boxShadow: {
        xsm: '0px 10px 20px rgba(14, 48, 114, 0.1)',
        sm: ' 0px 14px 20px rgba(14, 48, 114, 0.1)',
        'md-right': '110px 65px 5px 0px rgba(234,239,243,1)',
        'md-left': '-110px 65px 5px 0px rgba(234,239,243,1)',
        'sm-right': '40px 25px 5px 0px rgba(234,239,243,1)',
        'sm-left': '-40px 25px 5px 0px rgba(234,239,243,1)',
      },
      backgroundImage: {
        'gradient-color1': 'linear-gradient(119.21deg, #45CBF4 1.52%, #009DCD 56.4%, #2A8FAF 100%)',
        'gradient-color1-reverse': 'linear-gradient(90deg, rgba(42,143,175,1) 0%, rgba(0,157,205,1) 44%, rgba(69,203,244,1) 100%)',
        'gradient-color2': 'linear-gradient(119.21deg, #009DCD 1.52%, #2A8FAF 100%)',
        'gradient-gray1': 'linear-gradient(115.02deg, #F2F5F8 11.67%, #EAEFF3 65.91%)',
        'gradient-white': 'linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 49.55%, rgba(255, 255, 255, 0) 101.2%)',
      },
      inset: {
        17: '4.75rem',
        18: '5.143rem',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
          // webkit browsers
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
