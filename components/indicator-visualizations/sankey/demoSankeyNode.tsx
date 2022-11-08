import React, { FC, useRef } from 'react';
import { Rectangle, Layer } from 'recharts';

interface SankeyNodeProps {
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  index?: number,
  payload?: any,
}

const DemoSankeyNode: FC<SankeyNodeProps> = (props: SankeyNodeProps) => {
  const {
    x, y, width, height, index, payload,
  } = props;

  const nodeRef = useRef(null);

  if (!nodeRef) return null;
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
      {!!nodeHeight && nodeHeight > 15 && (
        <foreignObject x={x === 150 ? 0 : payload.x - 50} y={y} width="100" height="100%">
          <div title={payload?.name} className="flex justify-end max-w-[200px] font-bold text-[10px] pr-2">
            <p title={payload?.name} className="flex text-right text-ellipsis  drop-shadow-2xl shadow-gray-500 tracking-tighter leading-tight">{payload?.name}</p>
          </div>
        </foreignObject>
      )}
    </Layer>
  );
};

export default DemoSankeyNode;
