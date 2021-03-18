import React, {
  FC,
} from 'react';
import dynamic from 'next/dynamic';

// components
import StaticPage from 'layout';
import Head from 'components/head';

const LanguageSelect = dynamic(() => import('../components/language-select'), { ssr: false });

const HomePage: FC = () => (
  <StaticPage className="static-custom">
    <Head title="Welcome to Green Energy Data Platform" />
    <p className="text-5xl bold">Green energy data platform</p>
    <LanguageSelect />
  </StaticPage>
);

export default HomePage;
