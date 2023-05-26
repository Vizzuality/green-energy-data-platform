import React, { FC } from 'react';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import i18next from 'i18next';

// language keys
const privacy = i18next.t('privacy');
const energyFoundation = i18next.t('energyFoundation');
const updated = i18next.t('updated');
const personalInformation = i18next.t('personalInformation');

const PrivacyPolicyPage: FC = () => (
  <LayoutPage className="pb-48 text-justify text-white bg-gradient-gray1">
    <Head title="Green Energy Data Platform" />
    <Hero className="px-8 lg:px-32 md:px-24 sm:px-16">
      <h1 className="text-5.5xl pt-3 text-left">{privacy}</h1>
    </Hero>
    <div className="container m-auto bg-white rounded-2.5xl text-grayProfile divide-grayProfile divide-opacity-50 shadow -mt-40 divide-x flex px-10">
      <section className="my-3 text-justify lg:mx-28 md:mx-16 md:my-14">
        <div className="py-1">
          <h2 className="text-2.5xl mt-3">
            {energyFoundation}
          </h2>
          <h3 className="py-3 font-bold">
            {updated}
            {' '}
            March 12, 2021
          </h3>
          <p className="py-5 text-sm leading-7">
            {/* eslint-disable-next-line */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="py-1">
          <h2 className="text-2.5xl mt-3">
            {personalInformation}
          </h2>
          <p className="py-5 text-sm leading-7">
            {/* eslint-disable-next-line */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <ul className="pb-3 text-sm leading-7 list-disc list-inside">
          {/* eslint-disable-next-line */}
          <li className="py-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
          {/* eslint-disable-next-line */}
          <li className="py-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
          {/* eslint-disable-next-line */}
          <li className="py-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
        </ul>
      </section>
    </div>
  </LayoutPage>
);

export const getServerSideProps = async (context) => ({
  props: ({
    locale: context.query?.locale ?? 'en',
  }),
});

export default PrivacyPolicyPage;
