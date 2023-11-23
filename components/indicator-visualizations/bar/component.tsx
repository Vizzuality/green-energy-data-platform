import React, { FC, useMemo } from 'react';
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
  // visualizationTypes: string[],
  [key: string]: string | number | string[] | Data[] | Data,
  province?: string,
  visualizationTypes?: string[],
}

interface ConfigProps {
  bars: BarProps,
  cartesianAxis?: Object,
  cartesianGrid?: Object,
  xAxis?: XAxisProps,
  yAxis?: YAxisProps & { isPercentage: boolean, areSmallValues: boolean, maxValue: number },
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
  const { isPercentage, areSmallValues, maxValue } = yAxis;

  const getFormat = useMemo(() => {
    if (maxValue > 1000000)    {
      return     format(',.3s');
    }
    if (maxValue < 1000000 && maxValue > 1000) return format(',.0f');
    else return format(',.2f');
  }, [maxValue]);

  return (
    <ResponsiveContainer width="100%" height={height} {...rest}>
      <BarChart width={width} height={height} data={widgetData} {...rest}>
        {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
        {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
        {xAxis && (<XAxis {...xAxis} />)}
        {yAxis && (<YAxis 
          {...yAxis} 
          tickFormatter={ areSmallValues ? false : (isPercentage ? format('.0f') : getFormat  )} />)}
        {bars && (
          Object.keys(bars)
            .map((bar, index) => (<Bar key={bar} {...bars[bar]} fill={color || colors[index]} />
            )))}
        {!!tooltip && (<Tooltip cursor={{ opacity: 0.5 }} {...tooltip} />)}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
