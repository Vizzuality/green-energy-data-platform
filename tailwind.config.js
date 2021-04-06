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
        color1: '#009DCD',
        color2: '#3A3F59',
        color3: '#6905E8',
        gray1: '#EAEFF3',
        gray2: '#3A3F59',
        gray3: '#2F3031',
        gray4: '#C4C4C4',
        grayProfile: '#35373E', // TO DO - change name when adapting colors
        'color-red': '#FF472E',
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
        4.5: '1.125rem',
        6.5: '1.563rem',
        7.5: '1.875rem',
        13: '3.125rem',
      },
      maxWidth: {
        xs: '15.5rem',
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
      },
      borderRadius: {
        '2lg': '0.625rem',
        '2.5xl': '1.25rem',
        '4xl': '4.5rem',
      },
      borderColor: {
        'sign-in-gradient': 'linear-gradient(119.21deg, #009DCD 1.52%, #2A8FAF 100%);',
      },
      boxShadow: {
        sm: ' 0px 14px 20px rgba(14, 48, 114, 0.1)',
        md: 'linear-gradient(115.02deg, #F2F5F8 11.67%, #EAEFF3 65.91%)',
      },
      backgroundImage: {
        'sign-in': "url('/images/sign-in-bg.jpg')",
        'sign-in-gradient': 'linear-gradient(90deg, #DA2584 0%, #A42AD9 47.92%, #1A82FD 100%)',
        button: 'linear-gradient(119.21deg, #45CBF4 1.52%, #009DCD 56.4%, #2A8FAF 100%)',
        'gradient-color1': 'linear-gradient(119.21deg, #009DCD 1.52%, #2A8FAF 100%)',
        'gradient-color2': 'linear-gradient(103.52deg, #FD101F 0%, #DE259D 100.23%)',
        'gradient-color3': 'linear-gradient(103.52deg, #3510AB 0%, #00A3FE 100.23%)',
        'gradient-gray1': 'linear-gradient(115.02deg, #F2F5F8 11.67%, #EAEFF3 65.91%)',
      },
      inset: {
        17: '4.75rem',
        18: '5.143rem',
      },
    },
  },
  variants: {
  },
};
