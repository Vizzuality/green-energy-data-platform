import React, {
  FC,
} from 'react';

import { useRouter } from 'next/router';

// components
import StaticPage from 'layout/static-page';
import Head from 'components/head';
import Header from 'components/header';
import Hero from 'components/hero';
import IndicatorsData from 'components/indicator-data';
import RelatedIndicators from 'components/related-indicators';

const Group: FC = () => {
  const router = useRouter();
  const { groups } = router.query;

  const items = [
    {
      id: 'energy',
      name: 'Energy',
      status: 'active',
      color: 'color1',
    },
    {
      id: 'socio-economic',
      name: 'Socio-economic',
      status: 'disabled',
      color: 'color2',
    },
    {
      id: 'coal-power-plant',
      name: 'Coal power plant',
      status: 'disabled',
      color: 'color3',
    },
  ];
  const active = items.find((i) => i.id === groups);
  if (!active) return null;

  const relatedWidgets = ['widget', 'widget', 'widget', 'widget', 'widget', 'widget'];

  return (
    <StaticPage className="text-white">
      <Head title={`${groups} analysis`} />
      <Header color={active.color} />
      <Hero color={active.color} items={items} />
      <IndicatorsData color={active.color} />
      <RelatedIndicators info={relatedWidgets} />
    </StaticPage>
  );
};

export default Group;
