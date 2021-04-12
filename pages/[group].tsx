import React, {
  FC,
  useEffect,
} from 'react';

import { useQuery } from 'react-query';

import { useRouter } from 'next/router';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import Nav from 'components/nav';
import Dropdown from 'components/select';
import IndicatorsData from 'layout/indicator-data';
import WidgetsGrid from 'layout/widgets-grid';

import { fetchGroups } from 'services/groups';

import { relatedIndicators } from '../constants';

const Group: FC = () => {
  const router = useRouter();
  const { group } = router.query;

  const { isLoading, error, data } = useQuery('groups', () => fetchGroups().then((res) => res));
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>There is an error</p>;
  const groups = data;
  const selected = groups.find((g) => g.id === group);

  if (!selected) return null;

  return (
    <LayoutPage className="text-white bg-gradient-gray1">
      <Head title={`${group} analysis`} />
      <Hero>
        <Nav items={groups} className="py-7.5" />
        <div className="flex items-center">
          <h1 className="text-5.5xl py-6">{selected.subgroups[0] || ''}</h1>
          <Dropdown
            menuElements={selected.subgroups}
            border
            className="ml-3"
            icon="triangle_border"
            iconSize="lg"
          />
        </div>
      </Hero>
      <div className="container m-auto">
        <section className="-mt-40">
          <IndicatorsData />
          <WidgetsGrid items={relatedIndicators} />
        </section>
      </div>
    </LayoutPage>
  );
};

export default Group;
