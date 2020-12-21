import React from 'react';
import type { AppProps } from 'next/app';

import wrapper from 'config/store';

// styles
import 'styles/index.css';

const GreenEnergyDataApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(GreenEnergyDataApp);
