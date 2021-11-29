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
  const { nodes, links } = widgetData;

  const width = 1220;
  const COLORS = ['#1B5183', '#1E6D86', '#2A8FAF', '#C9E6E8', '#929292', '#766964', '#F8981C', '#760015'];

  return (
    <ResponsiveContainer width={width} height={2000}>
      <Sankey
        width={1200}
        height={2000}
        data={widgetData}
        node={(
          <DemoSankeyNode
            nodes={nodes}
            containerWidth={width}
          />
)}
        link={<DemoSankeyLink nodes={links} />}
        {...widgetConfig}
      >
        <Tooltip />
      </Sankey>
    </ResponsiveContainer>
  );
};

export default Chart;
