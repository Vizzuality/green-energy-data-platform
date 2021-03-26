import React, { FC } from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis,
  Tooltip,
  LineProps,
  LineChart,
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

interface ConfigProps {
  lines: LineProps,
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
    <div>
      <ResponsiveContainer width={500} height={500}>
        <LineChart width={400} height={200} data={widgetData}>
          {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
          {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
          {xAxis && (<XAxis {...xAxis} />)}
          {yAxis && (<YAxis {...yAxis} />)}
          {lines && Object.keys(lines).map((line) => (<Line key={line} {...lines[line]} />))}
          {tooltip && (<Tooltip />)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
