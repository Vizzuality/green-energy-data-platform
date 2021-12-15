import React, { FC } from 'react';
import { Rectangle, Layer } from 'recharts';

interface SankeyNodeProps {
  x?: number,
  y?: number,
  width?: number,
  containerWidth: number,
  height?: number,
  index?: number,
  payload?: any,
}

const DemoSankeyNode: FC<SankeyNodeProps> = ({
  x, y, width, height, index, payload, containerWidth,
}: SankeyNodeProps) => {
  const isOut = x + width + 6 > containerWidth;

  const breakString = (str, limit) => {
    if (!str) return null;
    const array = Array.from(str);
    let brokenString = '';
    return array.forEach((element, i) => {
      if (i >= limit && element === ' ') {
        brokenString += '\n';
        return brokenString;
      }
      brokenString += element;
      return brokenString;
    });
  };

  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill="#3A3F59"
        fillOpacity="1"
      />
      <text
        textAnchor="end"
        x={isOut ? x - 6 : x + width - 16}
        y={y + height / 2}
        fontSize="20"
        fontWeight="bold"
        stroke="white"
        strokeWidth="0.5px"
        fill="#3A3F59"
        width={20}
      >
        {payload.name}
      </text>
    </Layer>
  );
};

export default DemoSankeyNode;
