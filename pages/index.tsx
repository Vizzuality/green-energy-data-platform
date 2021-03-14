import React, {
  FC,
} from 'react';
import dynamic from 'next/dynamic';

// components
import StaticPage from 'layout/static-page';
import Head from 'components/head';
import Card from 'components/data-source';

const LanguageSelect = dynamic(() => import('../components/language-select'), { ssr: false });

const HomePage: FC = () => (
  <StaticPage className="static-custom font-heading">
    <Head title="Welcome to Green Energy Data Platform" />
    <p className="text-5xl bold">Green energy data platform</p>
    <LanguageSelect />
    <Card />
  </StaticPage>
);

export default HomePage;
