import React, {
  FC,
  useMemo,
} from 'react';
import {
  ResponsiveContainer,
  LineProps,
  XAxisProps,
  YAxisProps,
  Sankey,
} from 'recharts';

import DemoSankeyLink from './demoSankeyLink';
import DemoSankeyNode from './demoSankeyNode';

import groupBy from 'lodash/groupBy';

type Object = {
  label: string | number,
  value: string | number,
};

interface ConfigProps {
  lines: LineProps,
  cartesianAxis?: Object,
  cartesianGrid?: Object,
  xAxis?: XAxisProps,
  yAxis?: YAxisProps,
  tooltip: Object,
}

interface ChartProps {
  widgetData: Object[],
  widgetConfig: ConfigProps,
}

const Chart: FC<ChartProps> = ({ widgetData, widgetConfig }: ChartProps) => {
  // const {
  //   cartesianGrid,
  //   cartesianAxis,
  //   xAxis,
  //   yAxis,
  //   tooltip,
  // } = widgetConfig;

  const categories = useMemo(() => Object.keys(groupBy(widgetData, 'category_1')).filter((key) => key !== 'null'), [widgetData]);
  const widgetFakeData = {
    nodes: [
      { name: 'agric' },
      { name: 'socioec' },
      { name: 'what' },
      { name: 'whatve2' },
      { name: 'whatver3' },
      { name: 'whatever5' },
      { name: 'whatever6' },
      { name: 'whatever7' },
      { name: 'whatever8' },
      { name: 'whatever9' }
    ],
    links: [
      { source: 0, target: 5, value: 30 },
      { source: 1, target: 8, value: 99 },
      { source: 1, target: 7, value: 20 },
      { source: 1, target: 6, value: 15 },
      { source: 4, target: 5, value: 6 },
      { source: 2, target: 8, value: 30 },
      { source: 0, target: 6, value: 15 },
      { source: 2, target: 9, value: 11 },
      { source: 3, target: 9, value: 8 },
      { source: 3, target: 8, value: 23 },
      { source: 2, target: 5, value: 20 }
    ]
  };
  return (
    <ResponsiveContainer width="100%" height={500}>
      <Sankey
        width={400}
        height={200}
        data={widgetFakeData}

        // {...widgetConfig}

        // link={{ stroke: '#77c878' }}
         node={<DemoSankeyNode containerWidth={960} />}
        // nodePading={50}
        margin={{
          left: 200,
           right: 200,
           top: 100,
           bottom: 100,
         }}
         link={<DemoSankeyLink />}
      >
        {/* {tooltip && (<Tooltip />)} */}
        <defs>
            <linearGradient id={'linkGradient'}>
              <stop offset="0%" stopColor="rgba(0, 136, 254, 0.5)" />
              <stop offset="100%" stopColor="rgba(0, 197, 159, 0.3)" />
            </linearGradient>
          </defs>

      </Sankey>
    </ResponsiveContainer>
  );
};

export default Chart;
