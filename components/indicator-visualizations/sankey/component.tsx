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
import type { TooltipProps, SankeyProps } from './types';

const Chart: FC<SankeyProps> = ({
  indicatorName,
  unit,
  widgetData,
  widgetConfig,
}: SankeyProps) => {
  const width = 1220;
  const height = 800;

  const TooltipContent: FC<TooltipProps> = ({
    payload,
  }: TooltipProps) => (
    <CustomTooltip
      unit={unit}
      indicatorName={indicatorName}
      payload={payload}
    />
  );

  const sankeyRef = useRef(null);
  const nodePadding = width > 500 ? 7 : 20;

  const linksLength = widgetData?.links?.length;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <Sankey
        ref={sankeyRef}
        data={widgetData}
        height="100%"
        width="100%"
        node={(
          <DemoSankeyNode />
        )}
        nodePaddingRatio={0.8}
        linkCurvature={0.5}
        iterations={7}
        link={<DemoSankeyLink length={linksLength} />}
        className="overflow-visible"
        nodePadding={nodePadding}
        {...widgetConfig}
      >
        <Tooltip content={TooltipContent} />
      </Sankey>
    </ResponsiveContainer>
  );
};

export default Chart;
