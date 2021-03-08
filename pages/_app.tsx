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
    Transifex: {
      live: {
        onReady: (ms: number) => number,
        onError: (err) => void;
        onFetchLanguages: (languages) => void,
        getAllLanguages: () => void,
        getSourceLanguage: () => { code: string },
        translateTo: (code: string) => string,
        detectLanguage: () => void,
      }
    }
  }
}

typeof window !== 'undefined' && (window.liveSettings = window.liveSettings);

const GreenEnergyDataApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      {typeof window !== 'undefined' && (
        <script>
          {window.liveSettings = {
            detectlang: true,
            dynamic: true,
            picker: '#transifexSelectorHidden',
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
