import React, { FC } from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { sankeyCircular as d3Sankey } from 'd3-sankey-circular';

import { SankeyChartProps } from './types';

const Sankey: FC<SankeyChartProps> = ({
  top,
  left,
  className,
  data,
  size,
  nodeId,
  nodeAlign,
  nodeWidth,
  nodePadding,
  nodePaddingRatio,
  extent,
  sortNodes,
  iterations,
  circularLinkGap,
  children,
}: SankeyChartProps) => {
  if (!data) return null;
  const sankey = d3Sankey();

  if (size) sankey.size(size);
  if (nodeId) sankey.nodeId(nodeId);
  if (nodeAlign) sankey.nodeAlign(nodeAlign);
  if (nodeWidth) sankey.nodeWidth(nodeWidth);
  if (nodePadding) sankey.nodePadding(nodePadding);
  if (nodePaddingRatio) sankey.nodePaddingRatio(nodePaddingRatio);
  if (sortNodes) sankey.sortNodes(sortNodes);
  if (extent) sankey.extent(extent);
  if (iterations) sankey.iterations(iterations);
  if (circularLinkGap) sankey.circularLinkGap(circularLinkGap);

 
  const sankeyData = sankey(data);

  if (!children) return null;
  return (
    <Group top={top} left={left} className={cx('vx-sankey', className)}>
      {children({ data: sankeyData })}
    </Group>
  );
};

export default Sankey;
