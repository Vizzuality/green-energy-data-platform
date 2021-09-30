import React, { FC } from 'react';
import {
  ResponsiveContainer,
  CartesianAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip,
  AreaProps,
  XAxisProps,
  YAxisProps,
  TooltipProps,
} from 'recharts';

type Object = {
  [key: string]: string | number,
  value: string | number,
};

type GradientProps = {
  offset: string,
  stopColor: string,
  stopOpacity: number,
};

interface ConfigProps {
  gradients?: GradientProps[];
  areas: AreaProps,
  cartesianAxis?: Object,
  cartesianGrid?: Object,
  xAxis?: XAxisProps,
  yAxis?: YAxisProps,
  tooltip?: TooltipProps<any, any>,
}

interface ChartProps {
  widgetData: any[],
  widgetConfig: ConfigProps,
  colors: string[]
}

const Chart: FC<ChartProps> = ({ widgetData, widgetConfig, colors }: ChartProps) => {
  if (!widgetConfig || !widgetData) return null;
  const {
    gradients,
    cartesianGrid,
    cartesianAxis,
    xAxis,
    yAxis,
    areas,
    tooltip,
  } = widgetConfig;
  return (
    <ResponsiveContainer width="100%" height={500}>
      <AreaChart width={400} height={200} data={widgetData}>
        {tooltip && <Tooltip {...tooltip} />}
        {gradients && gradients.length && (
          <defs>
            <linearGradient id="area-color" x1="0" y1="0" x2="0" y2="1">
              {gradients.map(({ offset, stopColor, stopOpacity }) => (
                <stop key={`${offset}-${stopColor}`} offset={offset} stopColor={stopColor} stopOpacity={stopOpacity} />
              ))}
            </linearGradient>
          </defs>
        )}
        {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
        {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
        {xAxis && (<XAxis {...xAxis} />)}
        {yAxis && (<YAxis {...yAxis} />)}
        {areas && Object.keys(areas).map((area, index) => (<Area key={area} {...areas[area]} strokeWidth="3px" fill={colors[index]} />))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
