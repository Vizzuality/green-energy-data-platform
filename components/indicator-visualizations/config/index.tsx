import React, { FC } from 'react';

import Tooltip from 'components/widgets/tooltip';
import i18next from 'i18next';

import { uniq } from 'lodash';

type PayloadObject = {
  name: string,
  value: number,
  color: string,
  fill: string,
  year: number,
};

interface TickProps {
  x: number,
  y: number,
  payload: PayloadObject,
}

interface TooltipProps {
  payload: PayloadObject[]
  label?: string,
}

const TickSmall: FC<TickProps> = (({
  x, y, payload,
}: TickProps) => {
  const { value } = payload;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={-10}
        dy={14}
        textAnchor="end"
        fill="#3A3F59"
        opacity={0.5}
        transform="rotate(270)"
        fontSize="9px"
      >
        {value}
      </text>
    </g>
  );
});

const Tick: FC<TickProps> = (({
  x, y, payload,
}: TickProps) => {
  const { value } = payload;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={-10}
        dy={14}
        textAnchor="end"
        fill="#3A3F59"
        opacity={0.5}
        transform="rotate(270)"
        fontSize="14px"
      >
        {value}
      </text>
    </g>
  );
});

// language keys
const region = i18next.t('region');

const LabelContent = () => (
  <g>
    <text x="50%" y={400} textAnchor="middle" fill="#C4C4C4" fontSize="14px">
      {region}
    </text>
  </g>
);

const TooltipContent: FC<TooltipProps> = ({
  label,
  payload,
}: TooltipProps) => <Tooltip label={label} payload={payload} />;

const ChartConfig = (categories, language, data) => {
  const unitId = uniq(data.map(({ unit }) => unit.id))[0];
  const isPercentage = unitId === '542351b7-2813-4856-a7d8-1ceadd1f4a03';
  // const values = useMemo(() => data.filter((v) => v?.region?.name !== 'China')
  // .map((d) => d.value), [data]);
  // const MINVALUE = useMemo(() => (Math.min(...values)), [values]);
  // const MAXVALUE = useMemo(() => (Math.max(...values)), [values]);
  const KEY = language === 'cn' ? '总量' : 'Total';
  const getLines = () => {
    if (categories.length) {
      return categories.map((category) => ({
        dataKey: category,
        strokeWidth: 2,
        isAnimationActive: false,
        dot: { strokeWidth: 4, r: 1 },
      }));
    }
    return ([{
      dataKey: !!categories[0] || KEY,
      strokeWidth: 2,
      isAnimationActive: false,
    }]);
  };

  const getBars = () => {
    if (categories.length) {
      return categories.map((c) => ({
        dataKey: c,
        stackId: 'a',
        maxBarSize: 30,
      }));
    }
    return ([{
      stackId: 'a',
      dataKey: KEY,
      maxBarSize: 30,
    }]);
  };

  const DefaultTick = {
    fill: '#3A3F59',
    opacity: 0.5,
    fontSize: '14px',
  };
  return {
    line: {
      margin: {
        top: 20, right: 0, left: 0, bottom: 0,
      },
      cartesianGrid: {
        vertical: false,
        height: '1px',
        strokeDasharray: '10 5',
      },
      lines: getLines(),
      gradients: [
        {
          offset: '7.05%',
          stopColor: 'rgba(0, 107, 254, 0.64)',
          stopOpacity: 1,
        },
        {
          offset: '100%',
          stopColor: 'rgba(0, 107, 254, 0.1)',
          stopOpacity: 1,
        },
        {
          offset: '100%',
          stopColor: 'rgba(0, 107, 254, 0)',
          stopOpacity: 1,
        },
      ],
      xAxis: {
        dataKey: 'year',
        tick: { fill: '#3A3F59', opacity: 0.5, fontSize: 12 },
        interval: 0,
      },
      yAxis: {
        type: 'number',
        tick: DefaultTick,
        ...(isPercentage && { domain: [0, 100] }),
        ...(isPercentage && { ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] }),
        interval: 0,
        isPercentage,
      },
      tooltip: {
        isAnimationActive: true,
        content: TooltipContent,
      },
    },
    pie: {
      margin: {
        top: 20, right: 0, left: 0, bottom: 0,
      },
      cartesianGrid: {
        vertical: false,
      },
      pies: [
        {
          nameKey: 'name',
          dataKey: 'value',
          cx: '50%',
          cy: '50%',
        },
      ],
      tooltip: {
        isAnimationActive: false,
        content: TooltipContent,
      },
    },
    bar: {
      margin: {
        top: 20, right: 0, left: 0, bottom: 100,
      },
      cartesianGrid: {
        vertical: false,
      },
      isAnimationActive: false,
      bars: getBars(),
      yAxis: {
        tick: DefaultTick,
        // domain: [MINVALUE, MAXVALUE],
        tickCount: 7,
        interval: 'preserveEnd',
      },
      xAxis: {
        type: 'category',
        dataKey: 'province',
        interval: 0,
        tick: Tick,
        label: {
          content: LabelContent,
        },
      },
      tooltip: {
        isAnimationActive: false,
        content: TooltipContent,
      },
    },
    stacked_bar: {
      margin: {
        top: 20, right: 0, left: 0, bottom: 0,
      },
      cartesianGrid: {
        vertical: false,
      },
      bars: [
        {
          dataKey: 'value1',
          stackId: 'a',
        },
        {
          dataKey: 'value2',
          stackId: 'a',
        },
      ],
      xAxis: {
        dataKey: 'province',
        tick: DefaultTick,
      },
    },
    model_intercomparison_bar: {
      margin: {
        top: 20, right: 0, left: 0, bottom: 100,
      },
      width: 350,
      height: 250,
      cartesianGrid: {
        vertical: false,
      },
      isAnimationActive: false,
      bars: getBars(),
      yAxis: {
        tick: DefaultTick,
      },
      xAxis: {
        dataKey: 'year',
        interval: 0,
        tick: TickSmall,
        strokeDasharray: '3 3',
        strokeOpacity: 0.2,
      },
      year: 'year',
      tooltip: {
        isAnimationActive: false,
        content: TooltipContent,
      },
    },
  };
};

export default ChartConfig;
