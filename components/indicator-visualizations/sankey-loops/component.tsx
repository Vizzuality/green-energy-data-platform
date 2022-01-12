import React from 'react';
import { Group } from '@vx/group';
import { Text } from '@vx/text';
import {
  scaleSequential,
} from 'd3-scale';
import { format as d3format } from 'd3-format';
import * as d3 from 'd3';
// import { sankeyJustify, sankeyLeft, sankeyRight } from 'd3-sankey-circular';
import { extent } from 'd3-array';

import { COLORS } from 'components/indicator-visualizations/sankey/constants';
import Sankey from './circularSankey';

const color = scaleSequential(d3.interpolateCool);
const SankeyLoops = ({
  margin = {
    top: 0,
    left: 0,
    right: 50,
    bottom: 0,
  },
  data,
}) => (
  <svg width={890} height={500}>
    <Sankey
      top={0}
      left={0}
      data={data}
      size={[890, 500]}
      // extent={[[0, 500], [500, 896]]}
      nodeWidth={10}
        // nodePadding={50}
      nodePaddingRatio={0.1}
        // nodeAlign="left"
      nodeId={(d) => d.name}
      iterations={0}
    >
      {({ data: parsedData }) => console.log('parsedData', parsedData) || (
      <Group>

        {parsedData.nodes.filter(({ targetLinks }) => targetLinks.length).map((node) => (
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

            {(node.y1 - node.y0 > 15) && (
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
            )}

          </Group>
        ))}

        <Group strokeOpacity={0.2}>
          {parsedData.links.map((link) => (
            <path
              key={`link-${link.index}`}
              d={link.path}
              stroke={COLORS[link.class_en]}
              strokeWidth={Math.max(1, link.width)}
              opacity={0.7}
              fill="none"
            />
          ))}
        </Group>
      </Group>
      )}
    </Sankey>
  </svg>
);

export default SankeyLoops;
