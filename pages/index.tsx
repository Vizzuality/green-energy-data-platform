import React, {
  FC,
} from 'react';

// components
import StaticPage from 'layout';
import Head from 'components/head';
import Footer from 'components/footer';

const HomePage: FC = () => (
  <StaticPage className="static-custom">
    <Head title="Welcome to Green Energy Data Platform" />
    <Footer />
  </StaticPage>
);

export default HomePage;
