import React, {
  FC,
} from 'react';
import dynamic from 'next/dynamic';

// components
import StaticPage from 'layout/static-page';
import Head from 'components/head';
import Card from 'components/card';
import CardItem from 'components/card-item';

const LanguageSelect = dynamic(() => import('../components/language-select'), { ssr: false });

const downloadLinks = [
  { label: 'CSV', href: '' },
  { label: 'XML', href: '' },
  { label: 'EXCEL', href: '' },
];

const dataSourceLinks = [
  { label: 'Data Source', href: '' },
];

const HomePage: FC = () => (
  <StaticPage className="static-custom font-heading">
    <Head title="Welcome to Green Energy Data Platform" />
    <p className="text-green-600 font">Green energy data platform</p>
    <LanguageSelect />
    <Card theme="light">
      <CardItem
        icon="download"
        name="Download"
        links={downloadLinks}
      />
      <CardItem
        icon="arrow"
        name="Source name"
        links={dataSourceLinks}
      />
    </Card>
  </StaticPage>
);

export default HomePage;
