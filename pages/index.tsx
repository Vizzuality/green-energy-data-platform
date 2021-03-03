import React, {
  FC
} from 'react';

// components
import StaticPage from 'layout/static-page';
import Head from 'components/head';

type HomePageProps = {
};

const HomePage: FC<HomePageProps> = () => {
  return (
  <StaticPage className="static-custom">
    <Head title="Welcome to Green Energy Data Platform" />
    <p className="text-green-600">Home</p>
    <div id="transifex-picker" />
  </StaticPage>
);
  }

export default HomePage;
