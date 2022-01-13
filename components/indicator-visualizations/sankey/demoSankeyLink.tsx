import React, { FC, useState } from 'react';
import { Layer } from 'recharts';

import { COLORS } from './constants';

type Target = Readonly<{
  name: string,
}>;

type Payload = Readonly<{
  class: string,
  target: Target,
}>;

interface DemoProps {
  sourceX?: number,
  targetX?: number,
  sourceY?: number,
  targetY?: number,
  sourceControlX?: number,
  targetControlX?: number,
  linkWidth?: number,
  index?: number,
  payload?: Payload
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
}: DemoProps) => {
  const [opacity, setOpacity] = useState(0.3);

  const currentColor = COLORS[payload.class.toLowerCase()];
  const gradientID = `linkGradient${index}`;

  // target link with losses to make gradient fade away
  const targetLoss = payload?.target?.name.includes('losses');

  return (
    <Layer key={`CustomLink${index}`}>
      <defs>
        {targetLoss && (
        <linearGradient id={gradientID}>
          <stop offset="0%" stopColor={currentColor} stopOpacity={opacity} />
          <stop offset="100%" stopColor="black" stopOpacity={0} />
        </linearGradient>
        )}
        {!targetLoss && (
        <linearGradient id={gradientID}>
          <stop offset="100%" stopColor={currentColor} stopOpacity={opacity} />
        </linearGradient>
        )}
      </defs>
      <path
        d={`
            M${sourceX},${sourceY + linkWidth / 2}
            C${sourceControlX},${sourceY + linkWidth / 2}
              ${targetControlX},${targetY + linkWidth / 2}
              ${targetX},${targetY + linkWidth / 2}
            L${targetX},${targetY - linkWidth / 2}
            C${targetControlX},${targetY - linkWidth / 2}
              ${sourceControlX},${sourceY - linkWidth / 2}
              ${sourceX},${sourceY - linkWidth / 2}
            Z
          `}
        fill={`url(#${gradientID})`}
        opacity={0.8}
        strokeWidth="10"
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0.3)}
      />

    </Layer>
  );
};

export default Demo;
