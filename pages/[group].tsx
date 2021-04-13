import React, {
  FC,
} from 'react';

import { useRouter } from 'next/router';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Hero from 'layout/hero';
import Nav from 'components/nav';
import Dropdown from 'components/select';
import IndicatorsData from 'layout/indicator-data';
import WidgetsGrid from 'layout/widgets-grid';

import { useGroups } from 'hooks/groups';
import { relatedIndicators } from '../constants';

const Group: FC = () => {
  const router = useRouter();
  const { group } = router.query;
  const { groups, isLoading } = useGroups();

  if (isLoading) return <p>Loading...</p>;

  const selected = groups && groups.find((g) => g.id === group);

  if (!selected) return null;

  return (
    <LayoutPage className="text-white bg-gradient-gray1 pb-20">
      <Head title={`${group} analysis`} />
      <Hero>
        <Nav items={groups} className="py-7.5" />
        <div className="flex items-center">
          <h1 className="text-5.5xl py-6">{selected.subgroups[0].name || ''}</h1>
          <Dropdown
            menuElements={selected.subgroups}
            border="border-2"
            className="ml-3 h-full"
            icon="triangle_border"
            iconSize="md"
            theme="light"
            label={false}
          />
        </div>
      </Hero>
      <div className="container m-auto">
        <section className="-mt-40">
          <IndicatorsData
            groups={groups}
          />
          <WidgetsGrid items={relatedIndicators} />
        </section>
      </div>
    </LayoutPage>
  );
};

export default Group;
