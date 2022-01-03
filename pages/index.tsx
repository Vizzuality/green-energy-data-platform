import React, {
  FC,
} from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { useGroups } from 'hooks/groups';

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

const HomePage: FC = () => {
  const { data: groups, isLoading } = useGroups();

  return (
    <LayoutPage className="h-full min-h-screen">
      <Head title="Welcome to Green Energy Data Platform" />
      <Hero className="flex flex-col text-center py-24 lg:px-32 md:px-24 sm:px-16 px-8">
        <h1 className="text-5.5xl pb-14">{i18next.t('landingTitle')}</h1>
        <h3 className="text-lg">Longer description about the site and benefits, lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla.</h3>
      </Hero>
      <div className="-mt-11 container m-auto lg:px-32 md:px-24 sm:px-16 px-8 mb-28">
        <Search
          items={groups}
          className="-mt-4 h-24 bg-white p-4 shadow-sm"
        >
          <Link href="/indicators" passHref>
            <a
              href="/indicators"
              className="bg-gray1 text-white ml-3 border border-gray1 focus-within:flex items-center justify-center text-center rounded hover:bg-opacity-90 active:bg-white active:text-gray1  focus:outline-none py-5 px-11 text-sm"
            >
              {i18next.t('browse')}
            </a>
          </Link>
        </Search>
      </div>
      {isLoading
        ? <LoadingSpinner />
        : groups?.map((group, index) => {
          const textPosition = index % 2 !== 0 ? 'left' : 'right';
          return (
            <InView key={group} triggerOnce>
              {({ ref, inView }) => (
                <div ref={ref} key={group.id} className="container m-auto pb-28 lg:px-32 md:px-24 sm:px-16 px-8">
                  {inView && <GroupCard textPosition={textPosition} group={group} className={cx('flex justify-between items-start', { 'flex-row-reverse': textPosition === 'left' })} />}
                </div>
              )}
            </InView>
          );
        })}
      <section className="flex pb-23">
        <PreFooter />
      </section>
    </LayoutPage>
  );
};

export default HomePage;
