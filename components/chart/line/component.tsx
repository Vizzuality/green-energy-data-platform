import React, { FC } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  CartesianAxis,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";

type DataItem = Object;

type ConfigObject = {
  cartesianGrid: Object,
  cartesianAxis: Object,
  xAxis: Object,
  yAxis: Object,
  lines: Object,
}

interface ChartProps {
  widgetData: DataItem[],
  widgetConfig: ConfigObject
};

const Chart: FC<ChartProps> = ({ widgetData, widgetConfig }) => {
  const {
    cartesianGrid,
    cartesianAxis,
    xAxis,
    yAxis,
    lines,
  } = widgetConfig;

  return (
    <div>
      <ResponsiveContainer width={500} height={500}>
        <LineChart width={400} height={200} data={widgetData}>
          {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
          {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
          {xAxis && (<XAxis {...xAxis} />)}
          {yAxis && (<YAxis {...yAxis} />)}
          {lines && Object.keys(lines).map(line => (<Line {...lines[line]} />))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
