import React from 'react';
import PropTypes from 'prop-types';
import wrapper from 'config/store';

const GreenEnergyDataApp = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

GreenEnergyDataApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default wrapper.withRedux(GreenEnergyDataApp);
