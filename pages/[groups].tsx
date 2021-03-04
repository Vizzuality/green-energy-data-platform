import React, {
  FC,
} from 'react';

import { useRouter } from 'next/router';

// components
import StaticPage from 'layout/static-page';
import Head from 'components/head';
import Nav from 'components/nav';
import VisualizationsNav from 'components/visualizations-nav';
import Dropdown from 'components/select/component';

const Group: FC = () => {
  const router = useRouter();
  const { id } = router.query;

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
    <StaticPage className="static-custom">
      <Head title={`${id} analysis`} />
      <p className="text-green-600">{id}</p>
      <Nav items={items} />
      <h1>Energy balance</h1>
      <p>Metadata lorem ipsgum</p>
      <section>
        <VisualizationsNav selected={'Line'} />
        {/* Subgroup title, dynamic*/}
        <h2>Overall energy balance</h2>
        <Dropdown />
      </section>
    </StaticPage>
  );
};

export default Group;
