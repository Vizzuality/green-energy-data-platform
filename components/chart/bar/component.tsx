import React, { FC } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis,
  Tooltip,
  BarProps,
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
  bars: BarProps,
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
    bars,
    tooltip,
  } = widgetConfig;
  return (
    <div>
      <ResponsiveContainer width={500} height={500}>
        <BarChart width={400} height={200} data={widgetData}>
          {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
          {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
          {xAxis && (<XAxis  {...xAxis} />)}
          {yAxis && (<YAxis {...yAxis} />)}
          {bars && Object.keys(bars).map((bar) => (<Bar key={bar} {...bars[bar]} />))}
          {tooltip && (<Tooltip />)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
