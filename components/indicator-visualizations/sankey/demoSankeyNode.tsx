import classNames from 'classnames';
import { isEmpty } from 'lodash';
import React, { FC, useRef } from 'react';
import { Rectangle, Layer } from 'recharts';
import { BIG_NODE_VALUE, NODE_COLORS } from './constants';

interface SankeyNodeProps {
  x?: number;
  y?: number;
  height?: number;
  index?: number;
  payload?: {
    sourceNodes: number[];
    targetNodes: number[];
    sourceLinks: number[];
    targetLinks: number[];
    depth: number;
    x: number;
    name: string;
    value: number;
  };
  selectedNodes?: number[];
  setSelectedNodes?: (nodes?: number[]) => void;
  setSelectedLinks?: (links?: number[]) => void;
}

const DemoSankeyNode: FC<SankeyNodeProps> = (props: SankeyNodeProps) => {
  const {
    x, y, height, index, payload, setSelectedNodes, selectedNodes, setSelectedLinks,
  } = props;

  const nodeRef = useRef(null);

  if (!nodeRef) return null;
  const nodeHeight = nodeRef?.current?.props?.height;

  const handleSelectNodes = () => {
    const {
      sourceNodes, targetNodes, sourceLinks, targetLinks,
    } = payload;
    setSelectedNodes([index, ...sourceNodes, ...targetNodes]);
    setSelectedLinks([...sourceLinks, ...targetLinks]);
  };

  const fillOpacity = (isEmpty(selectedNodes) || Object.values(selectedNodes)
    .flat().includes(index)) ? 1 : 0.3;

  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle
        onMouseEnter={handleSelectNodes}
        onMouseLeave={() => {
          setSelectedNodes([]);
          setSelectedLinks([]);
        }}
        ref={nodeRef}
        x={x}
        y={y}
        width={20}
        height={height}
        fill={NODE_COLORS[payload.depth]}
        className="cursor-pointer"
        fillOpacity={fillOpacity}
      />
      {!!nodeHeight && nodeHeight > 0 && (
        <foreignObject
          x={x === 150 ? 0 : payload.x - 50}
          y={nodeHeight > 10 ? y : y - 5}
          height="100%"
          className="overflow-visible"
        >
          <div
            title={payload?.name}
            className={classNames('flex justify-start align-middle w-[150px] font-bold text-[10px] pr-2 translate-x-[80px] transition-opacity duration-100', {
              'opacity-30': fillOpacity === 0.3,
              'opacity-100': fillOpacity === 1,
            })}
          >
            <p
              title={payload?.name}
              className="inline w-full leading-tight truncate tracking-tighterdrop-shadow-2xl shadow-gray-500"
            >
              {payload?.value >= BIG_NODE_VALUE
                ? `${payload?.name} ${payload?.value?.toLocaleString()}`
                : payload?.name}
            </p>
          </div>
        </foreignObject>
      )}
    </Layer>
  );
};

export default DemoSankeyNode;
