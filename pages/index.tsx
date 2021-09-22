import React, {
  FC,
} from 'react';

import cx from 'classnames';

import { useGroups } from 'hooks/groups';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import PreFooter from 'components/pre-footer';
import Hero from 'layout/hero';
import GroupCard from 'components/group-cards';
import LoadingSpinner from 'components/loading-spinner';
import i18next from 'i18next';

const HomePage: FC = () => {
  const { data: groups, isLoading } = useGroups();
  return (
    <LayoutPage className="h-full min-h-screen">
      <Head title="Welcome to Green Energy Data Platform" />
      <Hero className="flex flex-col text-center py-24 sm:py-3">
        <h1 className="text-5.5xl pb-14">{i18next.t('landingTitle')}</h1>
        <h3 className="text-lg">Longer description about the site and benefits, lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla.</h3>
      </Hero>
      {isLoading
        ? <LoadingSpinner />
        : groups?.map((group, index) => (
          <div key={group.id} className="container m-auto pb-28">
            <GroupCard group={group} className={cx('flex justify-around', { 'flex-row-reverse': index % 2 !== 0 })} />
          </div>
        ))}

      <section className="flex pb-23">
        <PreFooter />
      </section>
    </LayoutPage>
  );
};

export default HomePage;
