import React, {
  FC
} from 'react';

// components
import StaticPage from 'layout/static-page';
import Head from 'components/head';
import LanguageSelect from 'components/language-select';

type HomePageProps = {
};

const HomePage: FC<HomePageProps> = () => (
  <StaticPage className="static-custom">
    <Head title="Welcome to Green Energy Data Platform" />
    <p className="text-green-600">Home</p>
    {typeof window !== 'undefined' && <LanguageSelect />}
  </StaticPage>
);

export default HomePage;
