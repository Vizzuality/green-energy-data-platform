import React, {
  FC,
} from 'react';

import Head from 'next/head';

const TransifexScript: FC = () => {
  if (!process.env.NEXT_PUBLIC_TRANSIFEX_API_KEY) console.error('TRANSIFEX: API KEY NOT DEFINED.');

  // eslint-disable-next-line no-return-assign
  return (
    <Head>
      <script>
        {window.liveSettings = {
          detectlang: true,
          dynamic: true,
          picker: '#transifexSelectorHidden',
          api_key: process.env.NEXT_PUBLIC_TRANSIFEX_API_KEY,
        }}
      </script>
      <script src="//cdn.transifex.com/live.js" />
    </Head>
  );
};

export default TransifexScript;
