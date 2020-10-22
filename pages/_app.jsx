import React from 'react';
import PropTypes from 'prop-types';
import wrapper from 'config/store';

import 'css/index.scss';

const GreenEnergyDataApp = ({ Component, pageProps }) => {
  return (
    <Component {...pageProps} />
  );
};

GreenEnergyDataApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export default wrapper.withRedux(GreenEnergyDataApp);
