import React, {
  FC,
} from 'react';

// components
import StaticPage from 'layout/static-page';
import Head from 'components/head';

type HomePageProps = {
};

const HomePage: FC<HomePageProps> = () => (
  <StaticPage className="static-custom">
    <Head title="Welcome to Green Energy Data Platform" />
    <p>Home</p>
  </StaticPage>
);

export default HomePage;
