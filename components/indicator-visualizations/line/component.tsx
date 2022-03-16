import React, {
  FC,
  useMemo,
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

// interface ModelIntercomparisonData {
//   [key: string]: string | number | (() => void) | string[],
//   year?: number,
//   model: string,
//   visualizationTypes: string[]
// }

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

  const screenProps = useMemo<XAxisProps>(
    () => {
      if (window.innerWidth > 1300) {
        return ({
          interval: 'preserveStartEnd',
          fontSize: 12,
          tick: {
            fill: '#3A3F59', opacity: 0.5,
          },
        });
      }
      return ({
        interval: 0,
        fontSize: 9,
        tick: {
          fill: '#3A3F59', opacity: 0.5,
        },
      });
    }, [],
  );

  return (
    <ResponsiveContainer height={height || 400}>
      <LineChart {...rest} data={widgetData}>
        {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
        {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
        {xAxis && (<XAxis {...screenProps} />)}
        {yAxis && (<YAxis {...yAxis} />)}
        {lines && Object.keys(lines).map((line, index) => (
          <Line key={line} {...lines[line]} stroke={color || colors[index]} />
        ))}
        {tooltip && (<Tooltip {...tooltip} />)}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
