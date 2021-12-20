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

import { TITLE } from './constants';
// types
import { TooltipProps, ChartProps } from './types';

const Chart: FC<ChartProps> = ({
  widgetData, widgetConfig,
}: ChartProps) => {
  const width = 1220;
  const height = 800;
  const unit = '10000tce';
  const indicatorSlug = 'Energy flows';
  const TooltipContent: FC<TooltipProps> = ({
    payload,
  }: TooltipProps) => (
    <CustomTooltip
      unit={unit}
      indicatorSlug={indicatorSlug}
      payload={payload}
    />
  );

  const sankeyRef = useRef(null);
  const positionX = sankeyRef?.current?.props?.width / 3;
  const { margin: { left: marginFix } } = widgetConfig;
  const nodePadding = width > 500 ? 7 : 20;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <Sankey
        ref={sankeyRef}
        data={widgetData}
        height="100%"
        width="100%"
        node={<DemoSankeyNode containerWidth={width} />}
        nodePaddingRatio={30}
        linkCurvature={0.5}
        iterations={50}
        link={<DemoSankeyLink />}
        className="overflow-visible"
        nodePadding={nodePadding}
        {...widgetConfig}
      >
        <text>
          {TITLE.map((level, index) => (
            <tspan
              key={level}
              textAnchor="middle"
              x={positionX * index + (positionX / 2) + marginFix}
              y={10}
              fontSize="12"
              fontWeight="bold"
              stroke="rgb(58, 63, 89)"
              strokeWidth="0.5px"
              fill="rgb(58, 63, 89)"
            >
              {level}
            </tspan>
          ))}
        </text>
        <Tooltip content={TooltipContent} />
      </Sankey>
    </ResponsiveContainer>
  );
};

export default Chart;
