import React from 'react';
import StaticPage from 'layout/static-page';
import Head from 'components/head';
import Bars from 'components/widgets/widget-templates/vertical-bars';
import HorizontalBars from 'components/widgets/widget-templates/horizontal-bars';

import 'css/index.scss';

const HomePage = () => (
  <StaticPage className="p-home">
    <Head />
    <p>Home</p>
    <Bars />
    <HorizontalBars />
  </StaticPage>
);

export default HomePage;
