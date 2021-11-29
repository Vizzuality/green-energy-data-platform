import React, { FC, useState } from 'react';
import { Layer } from 'recharts';

import COLORS from './constants';

type Source = Readonly<{
  name: string,
  category: string
}>;

type Payload = Readonly<{
  source: Source
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
  payload: Payload
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

  const currentColor = COLORS.find((c) => payload.source.name.toLowerCase()
    .includes(c.label.toLowerCase())) || { label: 'General', value: '#CCCCCC' };

  const gradientID = `linkGradient${index}`;
  return (
    <Layer key={`CustomLink${index}`}>
      <defs>
        <linearGradient id={gradientID}>
          <stop offset="100%" stopColor={currentColor.value} stopOpacity={opacity} />
          {/* <stop offset="20%" stopColor={currentColor.value} stopOpacity={0.5} /> */}
        </linearGradient>
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
        opacity={0.5}
        strokeWidth="10"
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => setOpacity(0.3)}
      />

    </Layer>
  );
};

export default Demo;
