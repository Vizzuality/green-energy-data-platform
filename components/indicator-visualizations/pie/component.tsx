import React, { FC } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis,
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
  indicatorId: string
}
const Chart: FC<ChartProps> = ({ widgetData, widgetConfig }: ChartProps) => {
  const {
    cartesianGrid,
    cartesianAxis,
    xAxis,
    yAxis,
    pies,
    tooltip,
  } = widgetConfig;
  // const RADIAN = Math.PI / 180;

  // const renderCustomizedLabel = ({
  //   cx,
  //   cy,
  //   midAngle,
  //   innerRadius,
  //   outerRadius,
  //   value,
  //   label,
  // }) => {
  //   const radius = innerRadius + (outerRadius - innerRadius);
  //   const x = cx + radius * 1.5 * Math.cos(-midAngle * RADIAN);
  //   const y = cy + radius * 1.5 * Math.sin(-midAngle * RADIAN);
  //   return (
  //     <text
  //       x={x}
  //       y={y} fill="red" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
  //       {label} - {`${(value * 100).toFixed(0)}%`}
  //     </text>
  //   );
  // }; - TO DO - remove when it's clear label has disappearded forever
  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart width={400} height={200}>
        {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
        {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
        {xAxis && (<XAxis {...xAxis} />)}
        {yAxis && (<YAxis {...yAxis} />)}
        {pies && Object.keys(pies).map((pie, index) => (
          <Pie
            key={pie}
            {...pies[pie]}
            data={widgetData}
            // label={renderCustomizedLabel}
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
