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

const HomePage: FC = () => {
  const { data: groups, isLoading } = useGroups();
  return (
    <LayoutPage className="h-full pb-48">
      <Head title="Welcome to Green Energy Data Platform" />
      <Hero className="flex flex-col text-center py-24 md:py-12 sm:py-3">
        <h1 className="text-5.5xl pb-14">Discover data insights for a sustainable future.</h1>
        <h3 className="text-lg">Longer description about the site and benefits, lorem ipsum sit amet. Donec ullamcorper nulla non metus auctor fringilla.</h3>
      </Hero>
      {isLoading
        ? <LoadingSpinner />
        : groups?.map((group, index) => (
          <div key={group.id} className="container m-auto">
            <GroupCard group={group} className={cx('flex justify-around', { 'flex-row-reverse': index % 2 !== 0 })} />
          </div>
        ))}
      <PreFooter />
    </LayoutPage>
  );
};

export default HomePage;
