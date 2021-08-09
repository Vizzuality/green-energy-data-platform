import React, { FC } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  PieProps,
  Cell,
  XAxisProps,
  YAxisProps,
} from 'recharts';

import { colors } from '../../../constants';

type Object = {
  label: string | number,
  value: string | number,
};

interface ConfigProps {
  pies: PieProps,
  cartesianAxis?: Object,
  cartesianGrid?: Object,
  xAxis?: XAxisProps,
  yAxis?: YAxisProps,
  tooltip: Object,
}

interface ChartProps {
  widgetData: Object[],
  widgetConfig: ConfigProps,
  color?: string,
}

const Chart: FC<ChartProps> = ({ widgetData, widgetConfig }: ChartProps) => {
  const {
    pies,
    tooltip,
    ...rest
  } = widgetConfig;
  return (
    <ResponsiveContainer>
      <PieChart {...rest}>
        {pies && Object.keys(pies).map((pie, index) => (
          <Pie
            key={pie}
            {...pies[pie]}
            data={widgetData}
            labelLine={false}
            fill={colors[index]}
          >
            {widgetData.map((d, i) => (
              <Cell key={`cell-${d}`} fill={colors[i % colors.length]} />
            ))}
          </Pie>
        ))}
        {tooltip && (<Tooltip {...tooltip} />)}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
