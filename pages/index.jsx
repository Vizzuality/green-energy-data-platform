import React from 'react';
import StaticPage from 'layout/static-page';
import Head from 'components/head';
import SubFooter from 'components/sub-footer';

import 'css/index.scss';

const HomePage = () => (
  <StaticPage className="p-home">
    <Head />
    <p>Home</p>
    <SubFooter />
  </StaticPage>
);

export default HomePage;
