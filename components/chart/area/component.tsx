import React, { FC } from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from 'recharts';

type DataObjectProps = {
  label: string | number,
  value: string | number,
};

type GradientsObjectProps = {
  offset: string,
  stopColor: string,
  stopOpacity: number,
};

type CartesianProps = {
  vertical?: boolean
};

type AxisProps = {
  type?: 'number' | 'category',
  ticksCount?: string,
};

type ConfigObjectProps = {
  gradients?: GradientsObjectProps[];
  cartesianGrid: CartesianProps,
  cartesianAxis: Object,
  xAxis: AxisProps,
  yAxis?: AxisProps,
  areas: Object,
};

interface ChartProps {
  widgetData: DataObjectProps[],
  widgetConfig: ConfigObjectProps,
  color?: string,
}

const Chart: FC<ChartProps> = ({ widgetData, widgetConfig }: ChartProps) => {
  const {
    gradients,
    cartesianGrid,
    cartesianAxis,
    xAxis,
    yAxis,
    areas,
  } = widgetConfig;
  return (
    <div>
      <ResponsiveContainer width={500} height={500}>
        <AreaChart width={400} height={200} data={widgetData}>
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
          {areas && Object.keys(areas).map((area) => (<Area key={area} {...areas[area]} strokeWidth="3px" fill="url(#area-color)" />))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
