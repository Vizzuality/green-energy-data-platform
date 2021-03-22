import React, { FC } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis,
} from 'recharts';

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
  bars: Object,
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
    bars,
  } = widgetConfig;
console.log(yAxis, typeof yAxis)
  return (
    <div>
      <ResponsiveContainer width={500} height={500}>
        <BarChart width={400} height={200} data={widgetData}>
          {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
          {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
          {xAxis && (<XAxis  {...xAxis} />)}
          {yAxis && (<YAxis {...yAxis} />)}
          {bars && Object.keys(bars).map(bar => (<Bar {...bars[bar]} />))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
