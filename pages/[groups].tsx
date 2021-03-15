import React, {
  FC,
} from 'react';
import cx from 'classnames';

import { useRouter } from 'next/router';

// components
import StaticPage from 'layout/static-page';
import Header from 'components/header';
import Head from 'components/head';
import Nav from 'components/nav';
import WidgetDataLayout from 'components/widget-data-layout';

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

  return (
    <StaticPage className={`text-white bg-${active.color}`}>
      <Head title={`${groups} analysis`} />
      <Header />
      <div className="mb-44">
        <div className="px-44">
          <Nav items={items} />
          <h1 className="text-5.25xl">Energy balance</h1>
          <p className="text-lg py-7.5">Metadata lorem ipsum sit amet. Donec ullamcorper nulla non metus
            auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet . Donec ullamcorper nulla non metus auctor fringilla.</p>
        </div>
        <WidgetDataLayout color={active.color} />
      </div>
    </StaticPage>
  );
};

export default Group;
