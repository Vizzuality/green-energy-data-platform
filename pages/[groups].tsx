import React, {
  FC,
} from 'react';

import { useRouter } from 'next/router';

// components
import StaticPage from 'layout/static-page';
import Head from 'components/head';
import Nav from 'components/nav';
import Card from 'components/card';

const Group: FC = () => {
  const router = useRouter();
  const { groups } = router.query;

  const items = [
    {
      id: 'energy',
      name: 'Energy',
      status: 'active',
    },
    {
      id: 'socio-economic',
      name: 'Socio-economic',
      status: 'disabled',
    },
    {
      id: 'coal-power-plant',
      name: 'Coal power plant',
      status: 'disabled',
    }
  ];

  return (
    <StaticPage className={`static-custom bg-color-${groups} text-white`}>
      <Head title={`${groups} analysis`} />
      <p className="text-white">{groups}</p>
      <Nav items={items} />
      <h1>Energy balance</h1>
      <p>Metadata lorem ipsgum</p>
      <Card />
    </StaticPage>
  );
};

export default Group;
