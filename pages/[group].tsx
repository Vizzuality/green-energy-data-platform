import React, {
  FC,
} from 'react';

import { useRouter } from 'next/router';

// components
import StaticPage from 'layout/static-page';
import Head from 'components/head';
import Hero from 'layout/hero';
import IndicatorsData from 'layout/indicator-data';
import WidgetsGrid from 'layout/widgets-grid';

import { groups, relatedIndicators } from '../constants';

const Group: FC = () => {
  const router = useRouter();
  const { group } = router.query;

  const active = groups.find((i) => i.id === group);
  if (!active) return null;

  return (
    <StaticPage className="text-white bg-gradient-gray1">
      <Head title={`${group} analysis`} />
      <Hero color={active.color} items={groups} />
      <div className="container m-auto">
        <section className="-mt-40">
          <IndicatorsData color={active.color} />
          <WidgetsGrid items={relatedIndicators} />
        </section>
      </div>
    </StaticPage>
  );
};

export default Group;