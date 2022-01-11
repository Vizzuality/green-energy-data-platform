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
}) => {

  // mocked data example
  // const widgetData = {
  //   nodes: [
  //     { name: 'startA' },
  //     { name: 'startB' },
  //     { name: 'process1' },
  //     { name: 'process2' },
  //     { name: 'process3' },
  //     { name: 'process4' },
  //     { name: 'process5' },
  //     { name: 'process6' },
  //     { name: 'process7' },
  //     { name: 'process8' },
  //     { name: 'process9' },
  //     { name: 'process10' },
  //     { name: 'process11' },
  //     { name: 'process12' },
  //     { name: 'process13' },
  //     { name: 'process14' },
  //     { name: 'process15' },
  //     { name: 'process16' },
  //     { name: 'finishA' },
  //     { name: 'finishB' },
  //     { name: 'finishC' }
  //   ],
  //   links: [
  //     { source: 'startA', target: 'process1', value: 15 },
  //     { source: 'startA', target: 'process8', value: 20 },
  //     { source: 'startA', target: 'process5', value: 30 },
  //     { source: 'startA', target: 'process6', value: 20 },
  //     { source: 'startB', target: 'process1', value: 15 },
  //     { source: 'startB', target: 'process5', value: 15 },
  //     { source: 'process1', target: 'process4', value: 20 },
  //     { source: 'process4', target: 'process1', value: 10 },
  //     { source: 'process2', target: 'process7', value: 30 },
  //     { source: 'process1', target: 'process3', value: 10 },
  //     { source: 'process5', target: 'process3', value: 20 },
  //     { source: 'process6', target: 'startA', value: 5 },
  //     { source: 'process4', target: 'process2', value: 5 },
  //     { source: 'process6', target: 'process8', value: 15 },
  //     { source: 'process4', target: 'startB', value: 5 },
  //     { source: 'process4', target: 'process7', value: 10 },
  //     { source: 'process3', target: 'process2', value: 25 },
  //     { source: 'process3', target: 'startB', value: 5 },
  //     { source: 'process15', target: 'process13', value: 10 },
  //     { source: 'process13', target: 'finishC', value: 10 },
  //     { source: 'process7', target: 'startB', value: 20 },
  //     { source: 'process8', target: 'process1', value: 10 },
  //     { source: 'process16', target: 'process9', value: 10 },
  //     { source: 'process8', target: 'process11', value: 35 },
  //     { source: 'process11', target: 'process10', value: 25 },
  //     { source: 'process4', target: 'process12', value: 10 },
  //     { source: 'process12', target: 'process11', value: 5 },

  //     { source: 'process7', target: 'process15', value: 20 },
  //     { source: 'process15', target: 'process14', value: 10 },
  //     { source: 'process10', target: 'process9', value: 10 },
  //     { source: 'process10', target: 'process16', value: 20 },
  //     { source: 'process14', target: 'finishB', value: 10 },
  //     { source: 'process9', target: 'finishA', value: 10 },
  //     { source: 'process16', target: 'process8', value: 10 },
  //     { source: 'process9', target: 'finishB', value: 10 },
  //     { source: 'process11', target: 'process14', value: 25 }
  //   ]
  // };
  const width = 1220;
  const height = 800;
  if (width < 10) return null;
  return (
    <svg width={width + margin.left + margin.right} height={height}>
      <Sankey
        top={margin.top}
        left={margin.left}
        data={data}
        size={[width, height]}
        nodeWidth={15}
        nodePadding={40}
        nodePaddingRatio={0.1}
        nodeId={(d) => d.name}
        iterations={0}
      >
        {({ data: parsedData }) => (
          <Group>

            {parsedData.nodes.map((node, i) => (
              <Group top={node.y0} left={node.x0} key={`node-${i}`}>
                <rect
                  id={`rect-${i}`}
                  width={node.x1 - node.x0}
                  height={node.y1 - node.y0}
                  fill="#3A3F59"
                  fillOpacity="1"
                  stroke="white"
                  strokeWidth={2}
                />

                <Text
                  x={18}
                  y={((node.y1 - node.y0) / 2)}
                  verticalAnchor="middle"
                  style={{
                    font: '10px sans-serif',
                  }}
                >
                  {node.name}
                </Text>

              </Group>
            ))}

            <Group strokeOpacity={0.2}>
              {parsedData.links.map((link, i) => (
                <path
                  key={`link-${i}`}
                  d={link.path}
                  stroke={
                    // COLORS[link.class]
                    'aquamarine'
                  }
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
};

export default SankeyLoops;
