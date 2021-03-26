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
  CartesianAxisProps,
  CartesianGridProps,
  XAxisProps,
  YAxisProps,
  TooltipProps,
} from 'recharts';

type DataObjectProps = {
  label: string | number,
  value: string | number,
};

type GradientProps = {
  offset: string,
  stopColor: string,
  stopOpacity: number,
};

interface ConfigProps {
  gradients?: GradientProps;
  areas: AreaProps,
  cartesianAxis?: CartesianAxisProps,
  cartesianGrid?: CartesianGridProps,
  xAxis?: XAxisProps,
  yAxis?: YAxisProps,
  tooltip: TooltipProps<string, string>,
}

interface ChartProps {
  widgetData: DataObjectProps[],
  widgetConfig: ConfigProps,
  color?: string,
  indicatorId: string
}

const Chart: FC<ChartProps> = ({ indicatorId, widgetData, widgetConfig }: ChartProps) => {
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
    <div>
      <ResponsiveContainer width={500} height={500}>
        <AreaChart width={400} height={200} data={widgetData}>
          {tooltip && <Tooltip {...tooltip} />}
          {gradients && (
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
          {areas && Object.keys(areas).map((area) => (<Area key={area} {...areas[area]} id={indicatorId} strokeWidth="3px" fill="url(#area-color)" />))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
