import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { ResponsiveContainer, Tooltip, Sankey } from 'recharts';

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
  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);
  const [selectedLinks, setSelectedLinks] = useState<number[]>([]);

  useEffect(() => {
    if (selectedLinks.length === 1) {
      const link = widgetData.links[selectedLinks[0]];
      if (link) {
        setSelectedNodes([link.source, link.target]);
      }
    }
    if (!selectedLinks.length) {
      setSelectedNodes([]);
    }
  }, [selectedLinks, widgetData.links]);

  const width = 1220;
  const height = 800;

  const TooltipContent: FC<TooltipProps> = ({ payload }: TooltipProps) => (
    <CustomTooltip
      unit={unit}
      indicatorName={indicatorName}
      payload={payload}
    />
  );

  const sankeyRef = useRef(null);
  const nodePadding = width > 500 ? 7 : 20;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <Sankey
        ref={sankeyRef}
        data={widgetData}
        height="100%"
        width="100%"
        node={(
          <DemoSankeyNode
            selectedNodes={selectedNodes}
            setSelectedNodes={setSelectedNodes}
            setSelectedLinks={setSelectedLinks}
          />
        )}
        link={(
          <DemoSankeyLink
            selectedLinks={selectedLinks}
            setSelectedLinks={setSelectedLinks}
          />
        )}
        linkCurvature={0.5}
        className="overflow-visible"
        iterations={6}
        nodePadding={nodePadding}
        nodePaddingRatio={0.8}
        {...widgetConfig}
      >
        <Tooltip content={TooltipContent} />
      </Sankey>
    </ResponsiveContainer>
  );
};

export default Chart;
