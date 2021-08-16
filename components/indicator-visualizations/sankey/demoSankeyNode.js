import React from 'react';
import { Rectangle, Layer } from 'recharts';

const DemoSankeyNode = ({
  x, y, width, height, index, payload, containerWidth,
}) => {
  const isOut = x + width + 6 > containerWidth;
  console.log(x, y, width, height, index, payload, containerWidth, 'x, y, width, height, index, payload, containerWidt');
  return (
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
        textAnchor={isOut ? 'end' : 'start'}
        x={0}
        y={y + height / 2}
        fontSize="14"
        stroke="#333"
      >
        {payload.name}
      </text>
      <text
        textAnchor={isOut ? 'end' : 'start'}
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
};

export default DemoSankeyNode;
