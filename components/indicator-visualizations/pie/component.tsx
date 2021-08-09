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
  indicatorId: string
}

// const RADIAN = Math.PI / 180;

// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   value,
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       textAnchor={x > cx ? 'start' : 'end'}
//       fill="white"
//       dominantBaseline="central"
//     >
//       {`${value.toFixed(2)}%`}
//     </text>
//   );
// };
const Chart: FC<ChartProps> = ({ widgetData, widgetConfig }: ChartProps) => {
  const {
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
      <PieChart>
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
