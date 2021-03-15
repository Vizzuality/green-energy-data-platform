import React, {
  FC,
} from 'react';

// components
import StaticPage from 'layout';
import Head from 'components/head';
<<<<<<< HEAD
import Footer from 'components/footer';
=======

<<<<<<< HEAD
const LanguageSelect = dynamic(() => import('../components/language-select'), { ssr: false });
>>>>>>> c9989db... adjust buttons to styles out of ui-kit

=======
>>>>>>> 66e05f7... remove unneccesary import
const HomePage: FC = () => (
  <StaticPage className="static-custom">
    <Head title="Welcome to Green Energy Data Platform" />
<<<<<<< HEAD
    <Footer />
=======
    <p className="text-5xl bold">Green energy data platform</p>
    <LanguageSelect />
>>>>>>> c9989db... adjust buttons to styles out of ui-kit
  </StaticPage>
);

export default HomePage;
