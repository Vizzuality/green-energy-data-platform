import React, { FC } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis
} from "recharts";

type DataItem = Object;

type ConfigObject = {
  cartesianGrid: Object,
  cartesianAxis: Object,
  xAxis: Object,
  yAxis: Object,
  pies: Object,
}

interface ChartProps {
  widgetData: DataItem[],
  widgetConfig: ConfigObject
};

const Chart: FC<ChartProps> = ({ widgetData, widgetConfig }) => {
  const {
    cartesianGrid,
    cartesianAxis,
    xAxis,
    yAxis,
    pies,
  } = widgetConfig;
  console.log(pies, widgetData)
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;


