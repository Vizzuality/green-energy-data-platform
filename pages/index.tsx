import React, {
  FC,
} from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { useGroups } from 'hooks/groups';
import { useRouter } from 'next/router';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import PreFooter from 'components/pre-footer';
import Hero from 'layout/hero';
import GroupCard from 'components/group-cards';
import LoadingSpinner from 'components/loading-spinner';
import Search from 'components/search';

import i18next from 'i18next';

import { InView } from 'react-intersection-observer';
import CookieBanner from 'components/cookie-banner';

const HomePage: FC = () => {
  const { query: { locale } } = useRouter();
  const lang = locale || 'en';
  const { data: groups, isLoading } = useGroups({ locale: lang });
  
  // language keys
  const browse = i18next.t('browse');
  const landingTitle = i18next.t('landingTitle');
  const landingDescription = i18next.t('landingDescription');
  return (
    <LayoutPage className="h-full">
      <Head title="Welcome to Green Energy Data Platform" />
      <Hero className="flex flex-col px-8 py-24 text-center lg:px-32 md:px-24 sm:px-16">
        <h1 className="text-5.5xl pb-14">{landingTitle}</h1>
        <h3 className="text-lg">{landingDescription}</h3>
      </Hero>
      <div className="container px-14 m-auto -mt-11 lg:px-24 md:px-16 sm:px-4">
        <Search
          items={groups}
          className="h-24 p-4 -mt-4 bg-white shadow-sm"
        >
          <Link
            href={{ pathname: "/indicators", query: { locale } }}
            className="items-center justify-center py-5 ml-3 text-sm text-center text-white border rounded bg-gray1 border-gray1 focus-within:flex hover:bg-opacity-90 active:bg-white active:text-gray1 focus:outline-none px-11"
          >
            {browse}
          </Link>
        </Search>
      </div>
      <div className="space-y-10 py-10">
      {isLoading
        ? <LoadingSpinner />
        : groups?.map((group, index) => {
          const textPosition = index % 2 !== 0 ? 'left' : 'right';
          return (
            <InView key={group.id} triggerOnce>
              {({ ref, inView }) => (
                <div ref={ref} key={group.id} className="container p-8 m-auto lg:px-32 md:px-24 sm:px-16 flex space-x-10 w-full">
                  {inView && <GroupCard textPosition={textPosition} group={group} className={cx('flex justify-between items-start', { 'flex-row-reverse': textPosition === 'left' })} />}
                </div>
              )}
            </InView>
          );
        })}
</div>
      <CookieBanner />
      <PreFooter />
    </LayoutPage>
  );
};

export const getServerSideProps = async (context) => ({
  props: ({
    locale: context.query?.locale ?? 'en',
  }),
});

export default HomePage;
