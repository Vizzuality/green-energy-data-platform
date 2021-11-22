import React, { useCallback } from 'react';

import { ViewportProps } from 'react-map-gl';

export interface ZoomControlProps {
  viewport: Partial<ViewportProps>;
  className?: string;
  onZoomChange: (z) => void;
}

export const ZoomControl = ({
  className,
  viewport,
  onZoomChange,
}: ZoomControlProps) => {
  const { zoom, maxZoom, minZoom } = viewport;

  const increaseZoom = useCallback(
    (e) => {
      e.stopPropagation();

      onZoomChange(zoom + 1 > maxZoom ? maxZoom : zoom + 1);
    },
    [zoom, maxZoom, onZoomChange],
  );

  const decreaseZoom = useCallback(
    (e) => {
      e.stopPropagation();

      onZoomChange(zoom - 1 < minZoom ? minZoom : zoom - 1);
    },
    [zoom, minZoom, onZoomChange],
  );

  return (
    <div className={`absolute p-1 top-9 right-2 z-10 inline-flex flex-col text-white bg-gray1 rounded-xl ${className}`}>
      <button
        aria-label="max zoom"
        type="button"
        className="font-bold p-0.5 focus:outline-none"
        disabled={zoom === maxZoom}
        onClick={increaseZoom}
      >
        +
      </button>
      <button
        aria-label="min zoom"
        type="button"
        className="font-bold p-0.5 focus:outline-none"
        disabled={zoom === minZoom}
        onClick={decreaseZoom}
      >
        -
      </button>
    </div>
  );
};

export default ZoomControl;
