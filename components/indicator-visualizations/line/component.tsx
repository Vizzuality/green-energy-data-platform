import React, { FC } from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  LineProps,
  LineChart,
  XAxisProps,
  YAxisProps,
} from 'recharts';

import { colors } from '../../../constants';

type Object = {
  label: string | number,
  value: string | number,
};

interface ConfigProps {
  lines: LineProps,
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

const Chart: FC<ChartProps> = ({ widgetData, widgetConfig }: ChartProps) => {
  const {
    cartesianGrid,
    cartesianAxis,
    xAxis,
    yAxis,
    lines,
    tooltip,
  } = widgetConfig;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart width={400} height={200} data={widgetData}>
        {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
        {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
        {xAxis && (<XAxis {...xAxis} />)}
        {yAxis && (<YAxis {...yAxis} />)}
        {lines && Object.keys(lines).map((line, index) => (
          <Line key={line} {...lines[line]} stroke={colors[index]} />
        ))}
        {tooltip && (<Tooltip />)}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
