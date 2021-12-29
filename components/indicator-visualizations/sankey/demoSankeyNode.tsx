import React, { FC, useRef } from 'react';
import { Rectangle, Layer } from 'recharts';

import { TITLE } from './constants';

interface SankeyNodeProps {
  x?: number,
  y?: number,
  width?: number,
  containerWidth: number,
  linkWidth: number,
  indicatorSlug: string,
  height?: number,
  index?: number,
  payload?: any,
}

const DemoSankeyNode: FC<SankeyNodeProps> = (props: SankeyNodeProps) => {
  const {
    x, y, width, height, index, payload, containerWidth, linkWidth, indicatorSlug,
  } = props;
  const isOut = x + width + 6 > containerWidth;
  const str = payload?.name;
  const spaceCheck = (numero) => {
    const isSpace = str?.charAt(numero) === ' ';
    return (isSpace || numero > str.length)
      ? [str.substr(0, numero), '...'].filter((s) => s !== '')
      : spaceCheck(numero + 1);
  };

  const labelHeight = 15;
  const labelSplitted = spaceCheck(15);
  const isLabelSplitted = labelSplitted.length > 1;
  const labelPositionFix = isLabelSplitted ? -(labelHeight / 4) : 0;
  const heightFix = height / 2 > labelHeight ? labelHeight / 2 : labelHeight / 4;
  const fullLabel = width > 640;

  const nodeRef = useRef(null);
  if (!nodeRef) return null;
  const nodeWidth = nodeRef?.current?.props?.width;

  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle
        ref={nodeRef}
        x={x}
        y={y}
        width={width}
        height={height}
        fill="#3A3F59"
        fillOpacity="1"
      />

      {/* TO - DO - add labels to API for different indicators */}
      <text>
        {x < 250 && !!linkWidth && indicatorSlug === 'energy-flows-energy-flows' && TITLE.map((level, i) => (
          <tspan
            key={level}
            textAnchor="left"
            x={50 + linkWidth * i - nodeWidth * i * 2}
            y={10}
            fontSize="12"
            fontWeight="bold"
            stroke="rgb(58, 63, 89)"
            strokeWidth="0.5px"
            fill="rgb(58, 63, 89)"
          >
            {level}
          </tspan>
        ))}
      </text>
      {fullLabel && (
      <text
        textAnchor="end"
        fontSize="12"
        fontWeight="bold"
        stroke="white"
        strokeWidth="0.5px"
        fill="#3A3F59"
        width={20}
      >
        <tspan
          y={y + height / 2 + heightFix}
          x={isOut ? x - 3 : x + width - 13}
        >
          {payload?.name}
        </tspan>
      </text>
      )}
      {!fullLabel && (
      <text
        fontSize="12"
        fontWeight="bold"
        stroke="white"
        strokeWidth="0.5px"
        fill="#3A3F59"
        width={20}
      >
        <tspan
          textAnchor="end"
          y={y + height / 2 + heightFix + labelPositionFix * (labelHeight / 2)}
          x={isOut ? x - 6 : x + width - 16}
        >
          {labelSplitted[0]}
          {labelSplitted[1]}
        </tspan>
      </text>
      )}
    </Layer>
  );
};

export default DemoSankeyNode;
