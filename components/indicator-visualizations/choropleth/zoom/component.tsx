import React, { useCallback } from 'react';

// import Icon from 'components/icon';

import { ViewportProps } from 'react-map-gl';

// import ZOOM_IN_SVG from;
// import ZOOM_OUT_SVG from;

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
    <div className="absolute top-4 right-7 z-10 inline-flex flex-col">
      <button
        aria-label="max zoom"
        type="button"
        className="p-0.5 rounded-b-4xl text-white bg-black focus:outline-none"
        disabled={zoom === maxZoom}
        onClick={increaseZoom}
      >
       + {/* <Icon icon={ZOOM_IN_SVG} /> */}
      </button>
      <button
        aria-label="min zoom"
        type="button"
        className="p-0.5 rounded-b-4xl text-white bg-black focus:outline-none"
        disabled={zoom === minZoom}
        onClick={decreaseZoom}
      >
       - {/* <Icon icon={ZOOM_OUT_SVG} /> */}
      </button>
    </div>
  );
};

export default ZoomControl;
