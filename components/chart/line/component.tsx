import React, { FC } from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from 'recharts';

type DataObjectProps = {
  label: string | number,
  value: string | number,
};

type CartesianProps = {
  vertical?: boolean
};

type AxisProps = {
  type?: 'number' | 'category',
  ticksCount?: string,
};

type ConfigObjectProps = {
  cartesianGrid: CartesianProps,
  cartesianAxis: Object,
  xAxis: AxisProps,
  yAxis?: AxisProps,
  lines: Object,
};

interface ChartProps {
  widgetData: DataObjectProps[],
  widgetConfig: ConfigObjectProps
}

const Chart: FC<ChartProps> = ({ widgetData, widgetConfig }: ChartProps) => {
  const {
    cartesianGrid,
    cartesianAxis,
    xAxis,
    yAxis,
    lines,
  } = widgetConfig;

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
