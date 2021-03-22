import React, { FC } from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";

type DataItem = Object;

type YAxisProps = {
  type?: string,
  ticksCount?: number,
};

type ConfigObject = {
  cartesianGrid: Object,
  cartesianAxis: Object,
  xAxis: Object,
  yAxis?: YAxisProps,
  lines: Object,
};

interface ChartProps {
  widgetData: DataItem[],
  widgetConfig: ConfigObject
}

const Chart: FC<ChartProps> = ({ widgetData, widgetConfig }: ChartProps) => {
  const {
    cartesianGrid,
    cartesianAxis,
    xAxis,
    yAxis,
    lines,
  } = widgetConfig;
console.log(yAxis)
  return (
    <div>
      <ResponsiveContainer width={500} height={500}>
        <LineChart width={400} height={200} data={widgetData}>
          {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
          {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
          {xAxis && (<XAxis {...xAxis} />)}
          {yAxis && (<YAxis {...yAxis} />)}
          {lines && Object.keys(lines).map((line) => (<Line key={line} {...lines[line]} />))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
