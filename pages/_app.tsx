import React from 'react';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { Provider } from 'next-auth/client';

import wrapper from 'config/store';

// types
import { LiveSettings } from 'types/transifex';

// components
import Icons from 'components/icons';

// styles
import 'styles/index.css';

const TransifexScript = dynamic(() => import('../scripts/transifex'), { ssr: false });

declare global {
  interface Window {
    liveSettings: LiveSettings
  }
}

const GreenEnergyDataApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <>
      <TransifexScript />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider session={pageProps.session}>
            <Component {...pageProps} />
          </Provider>
        </Hydrate>
      </QueryClientProvider>
      <Icons />
    </>
  );
};

export default wrapper.withRedux(GreenEnergyDataApp);
