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
      ? [str.substr(0, numero), str.substr(numero + 1, str.length - 1)].filter((s) => s !== '')
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
  const nodeHeight = nodeRef?.current?.props?.height;

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
            fontWeight={700}
            letterSpacing={0.2}
            fill="rgb(58, 63, 89)"
          >
            {level.toLocaleUpperCase}
          </tspan>
        ))}
      </text>
      {fullLabel && !!nodeHeight && nodeHeight > 13 && (
      <text
        textAnchor="end"
        fontSize="12"
        fontWeight="bold"
        stroke="white"
        strokeWidth="0.35px"
        letterSpacing={0.2}
        fill="#3A3F59"
        width={20}
      >
        <tspan
          y={y + height / 2 + heightFix + labelPositionFix * (labelHeight / 2)}
          x={isOut ? x - 3 : x + width - 13}
        >
          {payload?.name}
        </tspan>
      </text>
      )}
      {!fullLabel && !!nodeHeight && nodeHeight > 13 && (
      <text
        fontSize="12"
        fontWeight="bold"
        stroke="white"
        strokeWidth="0.35px"
        letterSpacing={0.2}
        fill="#3A3F59"
        width={20}
      >
        {labelSplitted.map((label, i) => (
          <tspan
            textAnchor="end"
            key={label}
            y={y + height / 2 + heightFix + labelPositionFix + i * (labelHeight / 2) + 3 * i}
            x={isOut ? x - 6 : x + width - 16}
          >
            {label}
          </tspan>
        ))}
      </text>
      )}
    </Layer>
  );
};

export default DemoSankeyNode;
