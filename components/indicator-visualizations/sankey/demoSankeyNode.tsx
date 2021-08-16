import React, { FC } from 'react';
import { Rectangle, Layer } from 'recharts';

interface SankeyNodeProps {
  x: number,
  y: number,
  width: number,
  height: number,
  index: number,
  payload,
}

const DemoSankeyNode: FC<SankeyNodeProps> = ({
  x, y, width, height, index, payload,
}: SankeyNodeProps) => (
  <Layer key={`CustomNode${index}`}>
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill="#5192ca"
      fillOpacity="1"
    />
    <text
      textAnchor="end"
      x={0}
      y={y + height / 2}
      fontSize="14"
      stroke="#333"
    >
      {payload.name}
    </text>
    <text
      textAnchor="end"
      x={x + width + 6}
      y={y + height / 2 + 13}
      fontSize="12"
      stroke="#333"
      strokeOpacity="0.5"
    >
      {`${payload.value}k`}
    </text>
  </Layer>
);

export default DemoSankeyNode;
