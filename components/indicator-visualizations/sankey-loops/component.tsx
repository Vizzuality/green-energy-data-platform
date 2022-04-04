import React, { FC, useMemo, useCallback } from 'react';
import { Group } from '@vx/group';

import { useTooltip, useTooltipInPortal } from '@visx/tooltip';

import { ParentSize } from '@vx/responsive';

import * as d3 from 'd3';

import Sankey from './circularSankey';
import Links from './links';
import Tooltip from './tooltip';

import { SankeyChart, Payload } from './types';

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

  const tooltipPayload = useMemo<Payload | {}>(() => tooltipData, [tooltipData]);
  const widthFix = 170;

  const spaceCheck = useCallback((str, charNumber) => {
    const isSpace = str?.charAt(charNumber) === ' ';
    return (isSpace || charNumber > str.length)
      ? [str.substring(0, charNumber), str.substring(charNumber + 1, str.length)].filter((s) => s !== '')
      : spaceCheck(str, charNumber + 1);
  }, []);

  const labelHeight = 15;

  return (
    <ParentSize>
      {(parent) => (
        <svg
          ref={containerRef}
          width={parent.width - (parent.left)}
          height={parent.height + 300}
        >
          <Sankey
            top={parent.top}
            left={0}
            data={data}
            size={[parent.width - widthFix, parent.height
            ]}
            extent={[[1, 1], [parent.width - widthFix, parent.height]]}
            nodeWidth={7}
            nodePadding={10}
            nodeAlign={d3.sankeyLeft}
            nodePaddingRatio={0.4}
            sortNodes="col"
            nodeId={(d) => d.name}
            iterations={5}
          >
            {({ data: parsedData }) => {
              interface NodeTypes {
                circular: boolean,
                class: string,
                class_cn: string,
                index: number,
                optimal: string,
                path: string,
                source: any,
                target: any,
                value: number,
                width: number,
                y0: number,
                y1: number,
                col: number;
                column: number;
                depth: number;
                height: number;
                name: string;
                partOfCycle: boolean;
                sourceLinks: unknown[];
                targetLinks: unknown[];
                x0: number;
                x1: number;
              }
              const dataNodes = useMemo(() => parsedData.nodes, [parsedData]);
              const dataLinks = useMemo(() => parsedData.links, [parsedData]);
              return (
                <Group style={{ zIndex: 500 }}>
                  {dataNodes.map((d) => {
                    const str = d.name;
                    const labelSplitted = spaceCheck(str, 10);
                    const isLabelSplitted = labelSplitted.length > 1;
                    const width = d.x1 - d.x0;
                    const height = d.y1 - d.y0;
                    const labelPositionFix = isLabelSplitted ? -(labelHeight / 4) : 0;
                    const heightFix = height / 2 > labelHeight ? labelHeight / 2 : labelHeight / 4;
                    return (
                      <Group top={d.y0} left={d.x0} key={`d-${d.index}`} style={{ zIndex: 500 }}>
                        <rect
                          id={`rect-${d.index}`}
                          // x={d.x1 - d.x0}
                          // y={d.y1 - d.y0}
                          width={width}
                          height={height}
                          fill="#3A3F59"
                          // fillOpacity="0.5"
                          stroke="white"
                          strokeWidth={2}
                          style={{ zIndex: 100 }}
                        />
                        {
                          (!isLabelSplitted && height > 5)
                          && (
                            <text
                              x={10}
                              y={Math.abs(d.y1 - d.y0) - height / 2 - labelPositionFix}
                              style={{
                                font: '11px sans-serif',
                                zIndex: 200,
                                letterSpacing: 2,
                                border: '1px solid white'
                              }}
                            >
                              {d.name}
                            </text>
                          )
                        }

                        {
                          (isLabelSplitted && height > 7)
                          && labelSplitted.map((label, i) => (
                            <text
                              x={10}
                              y={d.y0 - d.y1 + height * 1.25 + heightFix + labelPositionFix + i * (labelHeight / 4) + 4 * i}
                              // y = { ((height) / 2 + i * 10)}
                              style={{
                                font: '11px sans-serif',
                                zIndex: 200,
                                letterSpacing: 2,
                                border: '1px solid white'
                              }}
                            >
                              {label}
                            </text>
                          ))
                        }
                      </Group>
                    )
                  })}
                  <Links
                    data={dataLinks}
                    tooltip={showTooltip}
                  />
                </Group>
              )
            }}
          </Sankey>
          {tooltipOpen && (
            <TooltipInPortal
              // set this to random so it correctly updates with parent bounds
              key={Math.random()}
              top={tooltipTop}
              left={tooltipLeft}
            >
              <Tooltip
                data={tooltipPayload}
                unit={unit}
              />
            </TooltipInPortal>
          )}
        </svg>
      )
      }
    </ParentSize >
  );
};

export default SankeyLoops;
