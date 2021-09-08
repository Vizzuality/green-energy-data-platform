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

interface ChartProps {
  widgetData: any,
  widgetConfig: any
}

const Chart: FC<ChartProps> = ({ widgetData, widgetConfig }: ChartProps) => {
  // const categories = widgetData.nod
  console.log(widgetData)
  const { nodes, links } = widgetData;



  return (
  <ResponsiveContainer width={1200} height={2000}>
    <Sankey
      width={1200}
      height={2000}
      data={widgetData}
      node={<DemoSankeyNode nodes={nodes} />}
      link={<DemoSankeyLink nodes={nodes} />}
      {...widgetConfig}
    >
      <Tooltip />
      <defs>
        <linearGradient id="linkGradient">
          <stop offset="0%" stopColor="rgba(#1B5183, 0.5)" />
          <stop offset="100%" stopColor="rgba(#C9E6E8, 0.3)" />
        </linearGradient>
      </defs>
    </Sankey>
  </ResponsiveContainer>
);
  };

export default Chart;
