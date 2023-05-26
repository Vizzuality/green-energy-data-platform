// import { useColors } from 'hooks/utils';
import React, { FC } from 'react';
import { Layer } from 'recharts';

import { NODE_COLORS } from './constants';

type Target = Readonly<{
  name: string;
  depth: number;
  targetNodes: number[];
  sourceNodes: number[];
}>;

type Payload = Readonly<{
  class: string;
  target: Target;
  source: Target;
}>;

interface DemoProps {
  sourceX?: number;
  targetX?: number;
  sourceY?: number;
  targetY?: number;
  sourceControlX?: number;
  targetControlX?: number;
  linkWidth?: number;
  index?: number;
  payload?: Payload;
  selectedLinks?: number[];
  setSelectedLinks?: (index: number[]) => void;
  // length?: number,
}

const Demo: FC<DemoProps> = ({
  sourceX,
  targetX,
  sourceY,
  targetY,
  sourceControlX,
  targetControlX,
  linkWidth,
  payload,
  index,
  selectedLinks,
  setSelectedLinks,
}: DemoProps) => {
  const currentColor = NODE_COLORS[payload.source.depth];
  const gradientID = `linkGradient${index}`;

  // target link with losses to make gradient fade away
  const targetLoss = payload?.target?.name?.includes('losses');

  const setStopOpacity = () => {
    if (selectedLinks.length) {
      if (selectedLinks.includes(index)) return 0.5;
      return 0.1;
    }
    return 0.3;
  };

  const stopOpacity = setStopOpacity();

  const handleSelectLink = () => {
    setSelectedLinks([index]);
  };

  /** To compensate the node width. The default is 10px, but we are using 20px,
   * so we need top remove 10px from the link width. */
  const compensatedSourceX = sourceX + 10;

  return (
    <Layer
      key={`CustomLink${index}`}
      onMouseEnter={handleSelectLink}
      onMouseLeave={() => setSelectedLinks([])}
    >
      <defs>
        {targetLoss && (
          <linearGradient id={gradientID}>
            <stop
              offset="0%"
              stopColor={currentColor}
              stopOpacity={stopOpacity}
            />
            <stop offset="100%" stopColor="black" stopOpacity={0} />
          </linearGradient>
        )}
        {!targetLoss && (
          <linearGradient id={gradientID}>
            <stop
              offset="100%"
              stopColor={currentColor}
              stopOpacity={stopOpacity}

            />
          </linearGradient>
        )}
      </defs>
      <path
        d={`
            M${compensatedSourceX},${sourceY + linkWidth / 2}
            C${sourceControlX},${sourceY + linkWidth / 2}
              ${targetControlX},${targetY + linkWidth / 2}
              ${targetX},${targetY + linkWidth / 2}
            L${targetX},${targetY - linkWidth / 2}
            C${targetControlX},${targetY - linkWidth / 2}
              ${sourceControlX},${sourceY - linkWidth / 2}
              ${compensatedSourceX},${sourceY - linkWidth / 2}
            Z
          `}
        fill={`url(#${gradientID})`}
        strokeWidth="10"
      />
    </Layer>
  );
};

export default Demo;
