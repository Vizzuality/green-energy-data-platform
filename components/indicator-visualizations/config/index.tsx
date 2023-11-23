import React, { FC, useMemo } from 'react';

import Tooltip from 'components/widgets/tooltip';
import i18next from 'i18next';

import { uniq } from 'lodash';
import { scaleLinear } from 'd3-scale';

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

type Data = {
  unit: { id: string, name: string };
  value: number;
  region: { name: string };

};


const findMaxMin = (data: Data[]): { maxValue: number, minValue: number } => {
  const initial = { maxValue: -Infinity, minValue: Infinity };

  return data.reduce((acc, obj) => {
    Object.keys(obj).forEach(key => {
      if (key !== 'year' && typeof obj[key] === 'number') {
        acc.maxValue = Math.max(acc.maxValue, obj[key]);
        acc.minValue = Math.min(acc.minValue, obj[key]);
      }
    });
    return acc;
  }, initial);
};

const ChartConfig = (categories, language, data: Data[]) => {
  const unit = uniq(data.map((d) => d.unit))[0] satisfies { id: string, name: string };
  const isPercentage = unit?.id === '542351b7-2813-4856-a7d8-1ceadd1f4a03' || unit?.name.includes('%');
  
  let minSum = 0;
  let maxSum = 0;

  data.forEach(obj => {
    let sum = 0;
    Object.keys(obj).forEach(key => {
      if (key !== 'province' && key !== 'visualizationTypes' && typeof obj[key] === 'number') {
        sum += obj[key];
      }
    });

    if (sum > maxSum) maxSum = sum;
    if (sum < minSum) minSum = sum;

  });

  const MaxMinValueUnstacked = findMaxMin(data);
  const areSmallValues = useMemo(() => (minSum - maxSum) < 10, [minSum, maxSum]);
  const step = (2 * Math.ceil(maxSum / 2) - minSum) / 10;
  const maxValueDomain = step * 10 + minSum;
  const scale = scaleLinear().domain([minSum, maxValueDomain]).nice();
  const KEY = language === 'cn' ? '总量' : 'Total';
  const getTicks =  (val1: number, val2: number) => {
    const max = Math.ceil(Math.max(val1, val2));
    const min = Math.floor(Math.min(val1, val2));
    const steps = 6; // For 9 elements, there are 8 intervals
    const stepSize = (max - min) / steps;
    return Array.from({ length: steps + 1 }, (_, index) => min + stepSize * index);
  };
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
    if (!!categories.length) {
      return categories.map((c) => ({
        dataKey: c,
        stackId: 'a',
        maxBarSize: 30,
      }));
    }
    return ([{
      dataKey: KEY,
      maxBarSize: 30,
    }]);
  };

  const DefaultTick = {
    fill: '#3A3F59',
    opacity: 0.5,
    fontSize: '14px',
    // tickCount: 7,
  };

  const TICKS = useMemo(() => getTicks(minSum, maxSum), [minSum, maxSum]);
  const minValueUnstacked = MaxMinValueUnstacked.minValue > 0 ? 0 : MaxMinValueUnstacked.minValue;
  const TICKS_UNSTACKED = useMemo(() => getTicks(minValueUnstacked, MaxMinValueUnstacked.maxValue), [MaxMinValueUnstacked]);

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
        tick: {
          ...DefaultTick,

        },
        ticks: TICKS_UNSTACKED,
        // domain: [MINVALUE, MAXVALUE],
        // ...(isPercentage && hasNegativeValues && { domain: [-100, 100] }),
        // ...(isPercentage && hasNegativeValues && { ticks: range(-100, 101, 10) }),
        // ...(isPercentage && !hasNegativeValues && { domain: [0, 100] }),
        // ...(isPercentage && ! hasNegativeValues && { ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100] }),
        // interval: 'preserveStart',
        isPercentage,
        areSmallValues,
        scale,
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
        isPercentage,
        areSmallValues,
        scale,
        maxValue: maxSum,
        minValue: minSum,
        ticks: TICKS,
        interval: 0,

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
