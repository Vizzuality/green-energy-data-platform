import React, { useState, FC, useMemo } from 'react';
import { Group } from '@vx/group';
import { Text } from '@vx/text';

import { useTooltip, useTooltipInPortal } from '@visx/tooltip';

import { ParentSize } from '@vx/responsive';
import { localPoint } from '@visx/event';

import { COLORS } from './constants';
import Sankey from './circularSankey';
import Tooltip from './tooltip';
// import Link from './link';

import { SankeyChart, Node } from './types';

const SankeyLoops: FC<SankeyChart> = ({
  data,
  unit,
}: SankeyChart) => {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
  } = useTooltip();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
  });

  const handleMouseOver = (event, payload) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: payload,
    });
  };

  const [linkIndex, setOpacityLinkIndex] = useState(null);
  const tooltipPayload = useMemo<Node | {}>(() => tooltipData, [tooltipData]);

  return (
    <ParentSize>
      {(parent) => (
        <svg
          ref={containerRef}
          width={parent.width - (parent.left - parent.top)}
          height={parent.height}
        >
          <Sankey
            top={parent.top}
            left={0}
            data={data}
            size={[parent.width - 100, parent.height]}
      // extent={[[0, 500], [500, 896]]}
            nodeWidth={10}
            nodePadding={10}
            nodePaddingRatio={0.1}
        // nodeAlign="left"
            nodeId={(d) => d.name}
            iterations={5}
          >
            {({ data: parsedData }) => (
              // const indexNodes = parsedData.nodes
              // .filter(({ targetLinks }) => !targetLinks.length).map((link) => link.index);
              // const filteredNodes = parsedData.nodes
              // .filter((node) => !indexNodes.includes(node.index));
              // const filteredLinks = parsedData.links
              // .filter(({ source, target }) => !indexNodes
              // .includes(source.index) && !indexNodes.includes(target.index))
              <Group>
                {parsedData.nodes.map((node) => (
                  <Group top={node.y0} left={node.x0} key={`node-${node.index}`}>
                    <rect
                      id={`rect-${node.index}`}
                      width={node.x1 - node.x0}
                      height={node.y1 - node.y0}
                      fill="#3A3F59"
                      fillOpacity="1"
                      stroke="white"
                      strokeWidth={2}
                    />

                    {
            (node.y1 - node.y0 > 15)
            && (
              <Text
                x={15}
                y={((node.y1 - node.y0) / 2)}
                verticalAnchor="middle"
                style={{
                  font: '10px sans-serif',
                }}
              >
                {node.name}
              </Text>
            )
}

                  </Group>
                ))}

                <Group strokeOpacity={0.2}>
                  {parsedData.links.map((link) => (
                    <path
                      key={`link-${link.index}`}
                      d={link.path}
                      stroke={COLORS[link.class.toLowerCase()]}
                      strokeWidth={Math.max(1, link.width)}
                      opacity={linkIndex === link.index ? 0.7 : 0.3}
                      fill="none"
                      onMouseEnter={(event) => {
                        setOpacityLinkIndex(link.index);
                        handleMouseOver(event, link);
                      }}
                    />
                  ))}
                </Group>
              </Group>
            )}
          </Sankey>
          {tooltipOpen && (
          <TooltipInPortal
          // set this to random so it correctly updates with parent bounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
          >
            <Tooltip data={tooltipPayload} unit={unit} />
          </TooltipInPortal>
          )}
        </svg>
      )}
    </ParentSize>
  );
};

export default SankeyLoops;
