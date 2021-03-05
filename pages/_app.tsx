import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import wrapper from 'config/store';

// styles
import 'styles/index.css';

declare global {
  interface Window {
    liveSettings: {
      detectlang: boolean,
      dynamic: boolean,
      picker: string,
      api_key: string,
    }
  }
};

typeof window !== 'undefined' && (window.liveSettings = window.liveSettings);

const GreenEnergyDataApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      {typeof window !== 'undefined' && (
        <script>
          {window.liveSettings = {
            detectlang: true,
            dynamic: true,
            picker: '#transifex-picker',
            api_key: process.env.NEXT_PUBLIC_TRANSIFEX_API_TOKEN,
          }}
        </script>
      )}
      {typeof window !== 'undefined' && (<script type="text/javascript" src="//cdn.transifex.com/live.js"></script>)}
    </Head>
    <Component {...pageProps} />
  </>
);

export default wrapper.withRedux(GreenEnergyDataApp);
