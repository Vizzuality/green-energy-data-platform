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

import { colors } from '../../../constants';

type DataObjectProps = {
  label: string | number,
  value: string | number,
};

interface ConfigProps {
  bars: BarProps,
  cartesianAxis?: Object,
  cartesianGrid?: Object,
  xAxis?: XAxisProps,
  yAxis?: YAxisProps,
  tooltip: Object,
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
    ...rest
  } = widgetConfig;
  return (
    <div className="py-10">
      <ResponsiveContainer width="100%" height={500} {...rest}>
        <BarChart width={400} height={500} data={widgetData} {...rest}>
          {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
          {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
          {xAxis && (<XAxis  {...xAxis} />)}
          {yAxis && (<YAxis {...yAxis} />)}
          {bars && Object.keys(bars).map((bar, index) => (<Bar key={bar} {...bars[bar]} fill={colors[index]} />))}
          {tooltip && (<Tooltip />)}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
