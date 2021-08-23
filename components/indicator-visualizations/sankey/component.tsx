import React, {
  FC,
} from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  Sankey,
} from 'recharts';

import DemoSankeyNode from './demoSankeyNode';
import DemoSankeyLink from './demoSankeyLink';
import CONFIG from './config';

// import data from './sankey_0609.json';
import data from './sankey_emissions_test.json';

const Chart: FC = () => (
  <ResponsiveContainer width={1200} height={2000}>
    <Sankey
      width={1200}
      height={2000}
      data={data}
      node={<DemoSankeyNode />}
      link={<DemoSankeyLink />}
      {...CONFIG}
    >
      <Tooltip />
      <defs>
        <linearGradient id="linkGradient">
          <stop offset="0%" stopColor="rgba(0, 255, 254, 0.5)" />
          <stop offset="100%" stopColor="rgba(0, 197, 159, 0.3)" />
        </linearGradient>
      </defs>
    </Sankey>
  </ResponsiveContainer>
);

export default Chart;
