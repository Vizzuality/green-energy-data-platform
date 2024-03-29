import React, { FC } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  PieProps,
  Cell,
  XAxisProps,
  YAxisProps,
} from 'recharts';

type Object = {
  label: string | number,
  value: string | number,
};

interface ConfigProps {
  pies: PieProps,
  cartesianAxis?: Object,
  cartesianGrid?: Object,
  xAxis?: XAxisProps,
  yAxis?: YAxisProps,
  tooltip?: Object,
  height?: number,
}

interface ChartProps {
  widgetData: Object[],
  widgetConfig: ConfigProps,
  color?: string,
  colors: string[],
  className?: string,
}

const Chart: FC<ChartProps> = ({
  widgetData, widgetConfig, colors, color, className,
}: ChartProps) => {
  const {
    pies,
    tooltip,
    height,
    ...rest
  } = widgetConfig;

  return (
    <ResponsiveContainer height={height || 400} className={className}>
      <PieChart {...rest}>
        {pies && Object.keys(pies).map((pie, index) => (
          <Pie
            key={pie}
            {...pies[pie]}
            data={widgetData}
            labelLine={false}
            fill={color || colors[index]}
          >
            {widgetData.map((d, i) => (
              <Cell key={`cell-${d}`} fill={color || colors[i % colors.length]} />
            ))}
          </Pie>
        ))}
        {tooltip && (<Tooltip {...tooltip} />)}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
