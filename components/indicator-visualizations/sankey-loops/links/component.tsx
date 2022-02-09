import { FC, useState } from 'react';

import { localPoint } from '@visx/event';

import { Group } from '@vx/group';

import { COLORS } from '../constants';

type Source = Readonly<{
  circularLinkType: string,
  col: number,
  column: number,
  depth: number,
  height: number,
  index: number,
  name: string,
  partOfCycle: boolean,
  sourceLinks: unknown[],
  tagetLinks: unknown[],
  value: number,
  x0: number,
  x1: number,
  y0: number,
  y1: number,
}>;

type SankeyLoopsData = Readonly<{
    circular: boolean,
    class: string,
    class_cn: string,
    index: number,
    path: string,
    source: Source,
    target: Source,
    value: number,
    width: number,
    y0: number,
    y1: number,
}>;

interface LinksData {
  data: SankeyLoopsData[],
  tooltip: ({}) => void,
};

const Links: FC<LinksData> = ({
    data,
    tooltip,
}) => {
  const [linkIndex, setOpacityLinkIndex] = useState(null);

  const handleMouseOver = (event, payload) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    tooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: payload,
    });
  };

  console.log(data)
  return (
    <Group strokeOpacity={0.2}>
    {data.map((link) => {
      const linkRes = linkIndex === link.index ? 1 : 0.2;
      return (
        <path
          key={`link-${link.index}`}
          d={link.path}
          stroke={COLORS[link.class.toLowerCase()]}
          strokeWidth={Math.max(1, link.width)}
          opacity={!linkIndex ? 1 : linkRes}
          fill="none"
          onMouseEnter={(event) => {
            setOpacityLinkIndex(link.index);
            handleMouseOver(event, link);
          }}
          onMouseLeave={() => {
            setOpacityLinkIndex(null);
          }}
        />
      );
    })}
  </Group>
);
  };

export default Links;