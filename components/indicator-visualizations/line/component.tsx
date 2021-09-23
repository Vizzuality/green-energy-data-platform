import React, {
  FC,
} from 'react';
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
  [key: string]: string | number | (() => void),
};

interface ConfigProps {
  lines: LineProps,
  cartesianAxis?: Object,
  cartesianGrid?: Object,
  xAxis?: XAxisProps,
  yAxis?: YAxisProps,
  tooltip?: Object,
  height: number,
}

interface ChartProps {
  widgetData: Object[],
  widgetConfig: ConfigProps,
  color?: string,
}

const Chart: FC<ChartProps> = ({ widgetData, widgetConfig }: ChartProps) => {
  const {
    cartesianGrid,
    cartesianAxis,
    xAxis,
    yAxis,
    lines,
    tooltip,
    height,
    ...rest
  } = widgetConfig;

  return (
    <ResponsiveContainer height={height || 400}>
      <LineChart {...rest} data={widgetData}>
        {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
        {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
        {xAxis && (<XAxis {...xAxis} />)}
        {yAxis && (<YAxis {...yAxis} />)}
        {lines && Object.keys(lines).map((line, index) => (
          <Line key={line} {...lines[line]} stroke={colors[index]} />
        ))}
        {tooltip && (<Tooltip {...tooltip} />)}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
