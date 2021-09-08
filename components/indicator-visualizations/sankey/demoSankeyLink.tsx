import React, { FC, useState } from 'react';
import { Layer } from 'recharts';

import { uniq } from 'lodash';

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
  nodes,
  payload,
  index,
}: DemoProps) => {
  const [color, setColor] = useState('#45CBF4');
  const categories = uniq(
    nodes.map((node) => (node.category)));

  const COLORS = ['#1B5183', '#1E6D86', '#2A8FAF', '#C9E6E8', '#929292', '#766964', '#F8981C', '#760015'];

  const colorIndex = categories.indexOf(payload.source.category);
  console.log(colorIndex, payload)
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
        fill={COLORS[colorIndex]}
        opacity={0.5}
        strokeWidth="10"
        onMouseEnter={() => setColor('#009DCD')}
        onMouseLeave={() => setColor('#45CBF4')}
      />
    </Layer>
  );
};

export default Demo;
