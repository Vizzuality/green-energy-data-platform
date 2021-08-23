import React, { FC, useState } from 'react';
import { Layer } from 'recharts';

interface DemoProps {
  sourceX?: number,
  targetX?: number,
  sourceY?: number,
  targetY?: number,
  sourceControlX?: number,
  targetControlX?: number,
  linkWidth?: number,
  index?: number,
}
const Demo: FC<DemoProps> = ({
  sourceX,
  targetX,
  sourceY,
  targetY,
  sourceControlX,
  targetControlX,
  linkWidth,
  index,
}: DemoProps) => {
  const [color, setColor] = useState('#45CBF4');

  return (
    <Layer key={`CustomLink${index}`}>
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
        fill={color}
        strokeWidth="10"
        onMouseEnter={() => setColor('#009DCD')}
        onMouseLeave={() => setColor('#45CBF4')}
      />
    </Layer>
  );
};

export default Demo;
