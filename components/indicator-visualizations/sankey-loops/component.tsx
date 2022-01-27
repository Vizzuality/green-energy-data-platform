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
  indicator,
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
  const widthFix = indicator === '77531248-7467-482f-977b-fcdb39adb3ed' ? 80 : 150;

  return (
    <ParentSize>
      {(parent) => (
        <svg
          ref={containerRef}
          width={parent.width - (parent.left)}
          height={parent.height}
        >
          <Sankey
            top={parent.top}
            left={0}
            data={data}
            size={[parent.width - widthFix, parent.height]}
            extent={[[1, 1], [parent.width - widthFix, parent.height - 6]]}
            nodeWidth={7}
            nodePadding={10}
            nodePaddingRatio={0.1}
        // nodeAlign="left"
            nodeId={(d) => d.name}
            iterations={4}
          >
            {({ data: parsedData }) => (
              // const indexNodes = parsedData.nodes
              // .filter(({ targetLinks }) => !targetLinks.length).map((link) => link.index);
              // const filteredNodes = parsedData.nodes
              // .filter((node) => !indexNodes.includes(node.index));
              // const filteredLinks = parsedData.links
              // .filter(({ source, target }) => !indexNodes
              // .includes(source.index) && !indexNodes.includes(target.index))

              <Group style={{ zIndex: 500 }}>
                {parsedData.nodes.map((node) => (
                  <Group top={node.y0} left={node.x0} key={`node-${node.index}`} style={{ zIndex: 500 }}>
                    <rect
                      id={`rect-${node.index}`}
                      width={node.x1 - node.x0}
                      height={node.y1 - node.y0}
                      fill="#3A3F59"
                      fillOpacity="0.5"
                      stroke="white"
                      strokeWidth={2}
                      style={{ zIndex: 100 }}
                    />
                    {
            (node.y1 - node.y0 > 15 && node.name !== 'Raw coal production')
            && (
              <Text
                x={10}
                y={((node.y1 - node.y0) / 2)}
                verticalAnchor="middle"
                style={{
                  font: '10px sans-serif',
                  zIndex: 200,
                }}
              >
                {node.name}
              </Text>
            )
}

                  </Group>
                ))}

                <Group strokeOpacity={0.2}>
                  {parsedData.links.map((link) => {
                    const linkRes = linkIndex === link.index ? 1 : 0.2;
                    return (
                      <path
                        key={`link-${link.index}`}
                        d={link.path}
                        stroke={COLORS[link.class.toLowerCase()]}
                        strokeWidth={Math.max(1, link.width)}
                        opacity={!linkIndex ? 1 : linkRes}
                        fill="none"
                        onMouseEnter={(event) => {
                          setOpacityLinkIndex(link.index);
                          handleMouseOver(event, link);
                        }}
                        onMouseLeave={() => {
                          setOpacityLinkIndex(null);
                        }}
                      />
                    );
                  })}
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
