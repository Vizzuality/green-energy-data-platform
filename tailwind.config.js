module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    pseudo: {
      before: 'before',
      after: 'after',
      'not-first': 'not(:first-child)',
    },
    extend: {
      colors: {
        color1: '#006BFE',
        color2: '#FD1A2F',
        color3: '#6905E8',
        gray1: '#EAEFF3',
        gray2: '#3A3F59',
        gray3: '#2F3031',
        gray4: '#C4C4C4',
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
        color13: '#FF61CA',
        color14: '#7898E1',
        color15: '#C5C6C8',
        color16: '#B9EBD7',
        color17: '#75BBF5',
        color18: '#E580B5',
        color19: '#FFD675',
        color20: '#FFAC8C',
        color21: '#0C3CC4',
        color22: '#041F5A',
        color23: '#5AB015',
        color24: '#A97500',
      },
      spacing: {
        3.75: '0.938rem',
        6.5: '1.563rem',
        7.5: '1.875rem',
        13: '3.125rem',
      },
      width: {
        7.5: '1.875rem',
      },
      height: {
        7.5: '1.875rem',
      },
      borderRadius: {
        '2lg': '0.625rem',
        '2.5xl': '1.25rem',
      },
      boxShadow: {
        sm: ' 0px 14px 20px rgba(14, 48, 114, 0.1)',
      },
      fontSize: {
        '3.5xl': '2rem',
        '5.25xl': '3.25rem',
      },
      backgroundImage: {
        'gradient-color1': 'linear-gradient(103.52deg, #6905E8 0%, #A880FF 100.23%)',
        'gradient-color2': 'linear-gradient(103.52deg, #FD101F 0%, #DE259D 100.23%)',
        'gradient-color3': 'linear-gradient(103.52deg, #3510AB 0%, #00A3FE 100.23%)',
        'gradient-gray1': 'linear-gradient(115.02deg, #F2F5F8 11.67%, #EAEFF3 65.91%)',
      },
    },
  },
  variants: {

  },
};
