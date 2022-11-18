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

import { MapLayersProps } from 'components/indicator-visualizations/choropleth/component';

import { format } from 'd3-format';

type Object = {
  [key: string]: string | number | (() => void),
};

interface Data {
  [key: string]: string | number | string[] | MapLayersProps | unknown,
  layers?: MapLayersProps,
  model?: string,
  year?: number,
}

interface LineData {
  // visualizationTypes: string[],
  [key: string]: string | number | string[] | Data[] | Data,
}

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
  widgetData: LineData[],
  widgetConfig: ConfigProps,
  color?: string,
  colors: string[],
}

const Chart: FC<ChartProps> = ({
  widgetData, widgetConfig, color, colors,
}: ChartProps) => {
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
        {yAxis && (<YAxis {...yAxis} tickFormatter={format('.3s')} />)}
        {lines && Object.keys(lines).map((line, index) => (
          <Line key={`${line}-${color || colors[index]}`} stroke={color || colors[index]} {...lines[line]} />
        ))}
        {tooltip && (<Tooltip {...tooltip} />)}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
