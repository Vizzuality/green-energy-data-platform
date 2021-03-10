import React from 'react';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import wrapper from 'config/store';

// types
import { LiveSettings } from 'types/transifex';

// styles
import 'styles/index.css';

const TransifexScript = dynamic(() => import('../scripts/transifex'), { ssr: false });

declare global {
  interface Window {
    liveSettings: LiveSettings
  }
}

const GreenEnergyDataApp = ({ Component, pageProps }: AppProps) => (
  <>
    <TransifexScript />
    <Component {...pageProps} />
  </>
);

export default wrapper.withRedux(GreenEnergyDataApp);
