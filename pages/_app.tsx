import React from 'react';
import { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { Hydrate } from 'react-query/hydration';
import { Provider } from 'next-auth/client';

// language
import { I18nextProvider, Translation } from 'react-i18next';
import i18n from 'i18next';
import { initializeLanguage } from 'utils';

import makeStore from 'store/store';

import Icons from 'components/icons';

// styles
import 'styles/index.css';

initializeLanguage();
const queryClient = new QueryClient();

const GreenEnergyDataApp = ({ Component, pageProps }: AppProps) => (
  <>
    <ReduxProvider store={makeStore}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider session={pageProps.session}>
            <I18nextProvider i18n={i18n}>
              <Translation>
                {() => <Component {...pageProps} />}
              </Translation>
            </I18nextProvider>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </ReduxProvider>
    <Icons />
  </>
);

export default GreenEnergyDataApp;
