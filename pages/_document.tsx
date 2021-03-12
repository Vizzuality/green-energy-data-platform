import React from 'react';
import Document, {
  Html, Main, NextScript, Head,
} from 'next/document';

import Icons from 'components/icons';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="author" content="Vizzuality" />
          <meta name="robots" content="noindex" />
        </Head>
        <body id="root">
          <Main />
          <NextScript />
          <Icons />
        </body>
      </Html>
    );
  }
}
