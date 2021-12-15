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

  return (
    <ResponsiveContainer width="100%" height={height}>
      <Sankey
        ref={sankeyRef}
        width={1200}
        height={height}
        data={widgetData}
        node={<DemoSankeyNode containerWidth={width} />}
        nodePadding={200}
        nodePaddingRatio={30}
        linkCurvature={0.5}
        iterations={50}
        link={<DemoSankeyLink />}
        {...widgetConfig}
      >

        {TITLE.map((level, index) => (
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
              {level}
            </text>
          </>
        ))}
        <Tooltip content={TooltipContent} />
      </Sankey>
    </ResponsiveContainer>
  );
};

export default Chart;
