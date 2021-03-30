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
  CartesianAxisProps,
  CartesianGridProps,
  XAxisProps,
  YAxisProps,
  TooltipProps,
} from 'recharts';

import { colors } from '../../../constants';

type DataObjectProps = {
  label: string | number,
  value: string | number,
};

interface ConfigProps {
  pies: PieProps,
  cartesianAxis?: CartesianAxisProps,
  cartesianGrid?: CartesianGridProps,
  xAxis?: XAxisProps,
  yAxis?: YAxisProps,
  tooltip: TooltipProps<string, string>,
}

interface ChartProps {
  widgetData: DataObjectProps[],
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
  //     <text x={x} y={y} fill="red" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
  //       {label} - {`${(value * 100).toFixed(0)}%`}
  //     </text>
  //   );
  // }; - TO DO - remove when it's clear label has disappearded forever
  return (
    <div className="py-10">
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
    </div>
  );
};

export default Chart;
