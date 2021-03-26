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
  CartesianAxisProps,
  CartesianGridProps,
  XAxisProps,
  YAxisProps,
  TooltipProps,
} from 'recharts';

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
const Chart: FC<ChartProps> = ({ widgetData, widgetConfig }) => {
  const {
    cartesianGrid,
    cartesianAxis,
    xAxis,
    yAxis,
    pies,
    tooltip
  } = widgetConfig;
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    label,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * 1.5 * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * 1.5 * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="red" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {label} - {`${(value * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div>
      <ResponsiveContainer width={500} height={500}>
        <PieChart width={400} height={200}>
          {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
          {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
          {xAxis && (<XAxis  {...xAxis} />)}
          {yAxis && (<YAxis {...yAxis} />)}
          {pies && Object.keys(pies).map(pie => (
            <Pie
              data={widgetData}
              label={renderCustomizedLabel}
              {...pies[pie]}
            />
          ))}
          {tooltip && (<Tooltip />)}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;


