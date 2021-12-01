import React, {
  FC,
  useRef,
} from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  Sankey,
} from 'recharts';

import CustomTooltip from './tooltip';

import DemoSankeyNode from './demoSankeyNode';
import DemoSankeyLink from './demoSankeyLink';

// types
import { TooltipProps, ChartProps } from './types';

const LEVELS = [
  {
    title: 'ENERGY RESOURCES',
    subtitle: 'PRIMARY ENERGY',
  },
  {
    title: 'ENERGY RESOURCES TRANSFORMATION',
    subtitle: 'DIRECT USE',
  },
  {
    title: 'FINAL EERGY DEMAND',
    subtitle: 'ENERGY SECTOR USE',
  },
];

const Chart: FC<ChartProps> = ({
  widgetData, widgetConfig, unit, indicatorSlug,
}: ChartProps) => {
  const TooltipContent: FC<TooltipProps> = ({
    payload,
  }: TooltipProps) => (
    <CustomTooltip
      unit={unit}
      indicatorSlug={indicatorSlug}
      payload={payload}
    />
  );
  const width = 1220;
  const sankeyRef = useRef();

  const positionX = sankeyRef?.current?.props?.width / 3;

  return (
    <ResponsiveContainer width={width} height={2000}>
      <Sankey
        ref={sankeyRef}
        width={1200}
        height={2000}
        data={widgetData}
        node={<DemoSankeyNode containerWidth={width} />}
        link={<DemoSankeyLink />}
        {...widgetConfig}
      >

        {LEVELS.map((level, index) => (
          <>
            <text
              textAnchor="middle"
              x={index === 0 ? positionX : positionX * index + (positionX / index)}
              y={10}
              fontSize="12"
              fontWeight="bold"
              stroke="rgb(58, 63, 89)"
              strokeWidth="0.5px"
              fill="rgb(58, 63, 89)"
            >
              {level.title}
            </text>
            <text
              textAnchor="middle"
              x={index === 0 ? positionX : positionX * index + (positionX / index)}
              y={25}
              fontSize="12"
              stroke="rgb(58, 63, 89)"
              strokeWidth="0.5px"
              fill="rgb(58, 63, 89)"
            >
              {level.subtitle}
            </text>
          </>
        ))}
        <Tooltip content={TooltipContent} />
      </Sankey>
    </ResponsiveContainer>
  );
};

export default Chart;
