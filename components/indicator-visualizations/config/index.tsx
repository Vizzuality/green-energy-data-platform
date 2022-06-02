import React, { FC } from 'react';

import Tooltip from 'components/widgets/tooltip';

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

const LabelContent = () => (
  <g>
    <text x="50%" y={400} textAnchor="middle" fill="#C4C4C4" fontSize="14px">
      Region
    </text>
  </g>
);

const TooltipContent: FC<TooltipProps> = ({
  label,
  payload,
}: TooltipProps) => <Tooltip label={label} payload={payload} />;

const ChartConfig = (categories, language, data) => {
  // const values = useMemo(() => data.map((d) => d.value), [data]);

  const KEY = language === 'cn' ? '全部的' : 'Total';
  const getLines = () => {
    if (categories.length) {
      return categories.map((category) => ({
        dataKey: category,
        strokeWidth: 2,
      }));
    }
    return ([{
      dataKey: !!categories[0] || KEY,
      strokeWidth: 2,
    }]);
  };

  const getBars = () => {
    if (categories.length) {
      return categories.map((c) => ({
        dataKey: c,
        stackId: 'a',
      }));
    }
    return ([{
      stackId: 'a',
      dataKey: KEY,
    }]);
  };

  const DefaultTick = {
    fill: '#3A3F59',
    opacity: 0.5,
    fontSize: '14px',
  };
  return ({
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
        interval: 'preserveStartEnd',
      },
      yAxis: {
        tick: DefaultTick,
        // domain: [MINVALUE, MAXVALUE],
        interval: 0,
      },
      tooltip: {
        isAnimationActive: false,
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
      width: 200,
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
    table: {
      headers: ['Region name', 1995, 2000, 2005, 2010, 2015],
      items: [
        {
          label: 'Beijing',
          value: [
            {
              label: 1995,
              value: 50,
            },
            {
              label: 2000,
              value: 70,
            },
            {
              label: 2005,
              value: 84,
            },
            {
              label: 2010,
              value: 88,
            },
            {
              label: 2015,
              value: 90,
            },
          ],
        },
        {
          label: 'Chengdu',
          value: [
            {
              label: 1995,
              value: 60,
            },
            {
              label: 2000,
              value: 64,
            },
            {
              label: 2005,
              value: 60,
            },
            {
              label: 2010,
              value: 72,
            },
            {
              label: 2015,
              value: 84,
            },
          ],
        },
        {
          label: 'Guizhou',
          value: [
            {
              label: 1995,
              value: 70,
            },
            {
              label: 2000,
              value: 74,
            },
            {
              label: 2005,
              value: 60,
            },
            {
              label: 2010,
              value: 82,
            },
            {
              label: 2015,
              value: 20,
            },
          ],
        },
        {
          label: 'Shanghai',
          value: [
            {
              label: 1995,
              value: 60,
            },
            {
              label: 2000,
              value: 65,
            },
            {
              label: 2005,
              value: 72,
            },
            {
              label: 2010,
              value: 90,
            },
            {
              label: 2015,
              value: 50,
            },
          ],
        },
        {
          label: 'Shenyang',
          value: [
            {
              label: 1995,
              value: 54,
            },
            {
              label: 2000,
              value: 64,
            },
            {
              label: 2005,
              value: 74,
            },
            {
              label: 2010,
              value: 84,
            },
            {
              label: 2015,
              value: 94,
            },
          ],
        },
        {
          label: 'Wuhan',
          value: [
            {
              label: 1995,
              value: 54,
            },
            {
              label: 2000,
              value: 59,
            },
            {
              label: 2005,
              value: 54,
            },
            {
              label: 2010,
              value: 60,
            },
            {
              label: 2015,
              value: 63,
            },
          ],
        },
      ],
    },
  });
};

export default ChartConfig;
