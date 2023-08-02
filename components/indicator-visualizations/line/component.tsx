import React, {
  FC,
  useMemo,
} from 'react';

import orderBy from 'lodash/orderBy';
import { flatten } from 'lodash';
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
import { getStrokeColor } from 'utils';

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
  year?: number;
}

interface ConfigProps {
  lines: LineProps,
  cartesianAxis?: Object,
  cartesianGrid?: Object,
  xAxis?: XAxisProps,
  yAxis?: YAxisProps & { isPercentage: boolean },
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

  const { isPercentage } = yAxis;
  const data = flatten(widgetData.map((d) => {
   const { year, ...rest } = d;
    return flatten(Object.values(rest))
  })) as number[];


  const maxValue = Math.max(...data);

  const getFormat = useMemo(() => {
    if (maxValue > 1000000)    {
      return     format(',.3s')};
      if (maxValue < 1000000 && maxValue > 1000) return format(',.0f');
      else return format(',.2f');
    }, [maxValue]);

  return (
    <ResponsiveContainer height={height || 400}>
      <LineChart {...rest} data={orderBy(widgetData, 'year')}>
        {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
        {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
        {xAxis && (<XAxis {...xAxis} />)}
        {yAxis && (
          <YAxis
            {...yAxis}
            tickFormatter={isPercentage ? format('.0f') : getFormat}
          />
        )}
        {lines && Object.keys(lines).map((line, index) => (
          <Line key={`${line}-${color || colors[index]}`} connectNulls stroke={getStrokeColor(index, lines[index].dataKey, colors, color)} {...lines[line]} />
        ))}
        {tooltip && (<Tooltip {...tooltip} />)}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
