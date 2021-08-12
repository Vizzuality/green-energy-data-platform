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
import groupBy from 'lodash/groupBy';

import { colors } from '../../../constants';

type Object = {
  label: string | number,
  value: string | number,
};

interface ConfigProps {
  lines: LineProps,
  cartesianAxis?: Object,
  cartesianGrid?: Object,
  xAxis?: XAxisProps,
  yAxis?: YAxisProps,
  tooltip: Object,
}

interface ChartProps {
  widgetData: Object[],
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
    tooltip,
  } = widgetConfig;

  const categories = useMemo(() => Object.keys(groupBy(widgetData, 'category_1')).filter((key) => key !== 'null'), [widgetData]);

  const parsedData = useMemo(() => {
    const dataByYears = groupBy(widgetData, 'year');
    const years = Object.keys(dataByYears);

    if (!categories.length) {
      return years.map((dataByYear) => ({
        year: +dataByYear,
        ...dataByYears[dataByYear].reduce((current, next) => ({
          ...current,
          value: next.value,
        }), {}),
      }));
    }

    return years.map((dataByYear) => ({
      year: +dataByYear,
      ...dataByYears[dataByYear].reduce((current, next: any) => ({
        ...current,
        [next.category_1]: next.value,
      }), {}),
    }));
  }, [widgetData, categories]);

  const lines = useMemo(
    () => {
      if (!categories.length) {
        return [{
          type: 'monotone',
          dataKey: 'value',
        }];
      }

      return categories.map((category) => ({
        type: 'monotone',
        dataKey: category,
      }));
    },
    [categories],
  );

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart width={400} height={200} data={parsedData}>
        {cartesianGrid && (<CartesianGrid {...cartesianGrid} />)}
        {cartesianAxis && (<CartesianAxis {...cartesianAxis} />)}
        {xAxis && (<XAxis {...xAxis} />)}
        {yAxis && (<YAxis {...yAxis} />)}
        {lines && Object.keys(lines).map((line, index) => (
          <Line key={line} {...lines[line]} stroke={colors[index]} />
        ))}
        {tooltip && (<Tooltip {...tooltip} />)}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
