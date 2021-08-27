import React, { FC } from 'react';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import i18next from 'i18next';

const TermsAndConditionsPage: FC = () => (
  <LayoutPage className="text-white bg-gradient-gray1 pb-48">
    <Head title="Green Energy Data Platform" />
    <Hero className="lg:px-32 md:px-20">
      <h1 className="text-5.5xl pt-3">{i18next.t('terms')}</h1>
    </Hero>
    <div className="container m-auto bg-white rounded-2.5xl text-grayProfile divide-grayProfile divide-opacity-50 shadow-sm -mt-40 divide-x flex px-10">
      <section className="lg:mx-28 md:mx-16 md:my-14 my-3 text-justify">
        <div className="py-1">
          <h2 className="text-2.5xl mt-3">
            Legal disclousure and terms of use
          </h2>
          <p className="text-sm leading-7 py-5">
            March 12, 2021
          </p>
        </div>
        <div className="py-1">
          <h2 className="text-2.5xl mt-3">
            Please read this agreement carefully; This is a binding contract
          </h2>
          <p className="text-sm leading-7 py-5">
            {/* eslint-disable-next-line */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <div className="py-1">
          <h2 className="text-2.5xl mt-3">
            About the information in this site
          </h2>
          <p className="text-sm leading-7 py-5">
            {/* eslint-disable-next-line */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <aside className="border-t border-gray1 border-opacity-20 mt-5 py-2">
          <span className="font-bold">Copyright © 2021 Energy Foundation. All rights reserved.</span>
        </aside>
      </section>
    </div>
  </LayoutPage>
);

export default TermsAndConditionsPage;
