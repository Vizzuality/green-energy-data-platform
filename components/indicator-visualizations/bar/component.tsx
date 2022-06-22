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

import { MapLayersProps } from 'components/indicator-visualizations/choropleth/component';
import { format } from 'd3-format';
import { orderBy } from 'lodash';

type Object = {
  [key: string]: string | number | (() => void),
};

interface Data {
  [key: string]: string | number | string[] | MapLayersProps,
  layers?: MapLayersProps,
  model?: string,
  year?: number,
}

interface BarData {
  year: number,
  // visualizationTypes: string[],
  [key: string]: string | number | string[] | Data[] | Data,
}

interface ConfigProps {
  bars: BarProps,
  cartesianAxis?: Object,
  cartesianGrid?: Object,
  xAxis?: XAxisProps,
  yAxis?: YAxisProps,
  tooltip?: Object,
}

interface ChartProps {
  width?: number,
  height?: number,
  widgetData: BarData[],
  widgetConfig: ConfigProps,
  color?: string,
  colors: string[],
}

const Chart: FC<ChartProps> = ({
  widgetData,
  widgetConfig,
  colors,
  color,
  width,
  height,
}: ChartProps) => {
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
    <ResponsiveContainer width="100%" height={height} {...rest}>
      <BarChart width={width} height={height} data={widgetData} {...rest}>
        {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
        {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
        {xAxis && (<XAxis {...xAxis} />)}
        {yAxis && (<YAxis {...yAxis} interval={0} tickFormatter={format('.3s')} />)}
        {bars && (
          Object.keys(bars)
            .map((bar, index) => (<Bar key={bar} {...bars[bar]} fill={color || colors[index]} />
            )))}
        {!!tooltip && (<Tooltip {...tooltip} />)}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
