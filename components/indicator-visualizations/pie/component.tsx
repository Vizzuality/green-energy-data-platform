import React, { FC } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  // CartesianGrid,
  // CartesianAxis,
  // XAxis,
  // YAxis,
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

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? 'start' : 'end'}
      fill="white"
      dominantBaseline="central"
    >
      {`${value.toFixed(2)}%`}
    </text>
  );
};

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
            label={renderCustomizedLabel}
            labelLine={false}
            fill={colors[index]}
          >
            {widgetData.map((d, i) => (
              <Cell key={`cell-${d}`} fill={colors[i % colors.length]} />
            ))}
          </Pie>
        ))}
        {tooltip && (<Tooltip />)}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
