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
  XAxisProps,
  YAxisProps,
} from 'recharts';

type Object = {
  [key: string]: string | number | (() => void),
};

interface ConfigProps {
  bars: BarProps,
  cartesianAxis?: Object,
  cartesianGrid?: Object,
  xAxis?: XAxisProps,
  yAxis?: YAxisProps,
  tooltip?: Object,
}

interface ChartProps {
  widgetData: Object[],
  widgetConfig: ConfigProps,
  color?: string,
  colors: string[],
}

const Chart: FC<ChartProps> = ({ widgetData, widgetConfig, colors }: ChartProps) => {
  const {
    cartesianGrid,
    cartesianAxis,
    xAxis,
    yAxis,
    bars,
    tooltip,
    ...rest
  } = widgetConfig;

  return (
    <ResponsiveContainer width="100%" height={500} {...rest}>
      <BarChart width={400} height={500} data={widgetData} {...rest}>
        {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
        {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
        {xAxis && (<XAxis {...xAxis} />)}
        {yAxis && (<YAxis {...yAxis} />)}
        {bars && (
          Object.keys(bars)
            .map((bar, index) => (<Bar key={bar} {...bars[bar]} fill={colors[index]} />
            )))}
        {!!tooltip && (<Tooltip {...tooltip} />)}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
