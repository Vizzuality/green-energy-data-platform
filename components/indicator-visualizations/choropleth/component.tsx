import React, {
  FC,
  useState,
  useCallback,
} from 'react';

// Layer manager
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';

// authentication
import { withAuthentication } from 'hoc/auth';

// Controls
// import ZoomControl from './zoom';

import Legend from './legend';

// Map
import { DEFAULT_VIEWPORT } from './constants';

// components
import Map from './map';

interface MapLayersProps {
  // TO DO
  id: string,
}

interface MapContainerProps {
  layers: MapLayersProps[],
  hasLegend?: boolean,
  style?: Object,
  categories: string[]
}

const MapContainer: FC<MapContainerProps> = (
  {
    layers,
    hasLegend = true,
    style = {},
    categories = [],
  }: MapContainerProps,
) => {
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const handleViewportChange = useCallback((v) => {
    setViewport(v);
  }, []);

  // const handleZoomChange = useCallback(
  //   (zoom) => {
  //     setViewport({
  //       ...viewport,
  //       zoom,
  //     });
  //   },
  //   [viewport],
  // );
  console.log({layers})
  return (
    <div className="relative h-full border-4 border-gray5 rounded" style={style}>
      <Map
        width="100%"
        height="100%"
        viewport={viewport}
        onMapViewportChange={handleViewportChange}
        onClick={(e) => console.log(e)}
      >
        {(map) => (
          <LayerManager map={map} plugin={PluginMapboxGl}>
            {layers?.map((l) => (
              <Layer key={l.id} {...l} />
            ))}
          </LayerManager>
        )}
      </Map>
      {/* <Map
        width="100%"
        height="100%"
        viewport={viewport}
        onMapViewportChange={handleViewportChange}
        onClick={(e) => console.log(e)}
      >
        {(map) => (
          <LayerManager map={map} plugin={PluginMapboxGl}>
            {ACTIVE_LAYERS.map((l) => (
              <Layer key={l.id} {...l} />
            ))}
          </LayerManager>
        )}
      </Map> */}

      {/* <ZoomControl
        className="absolute bottom-4 left-2 w-4 h-10"
        viewport={viewport}
        onZoomChange={handleZoomChange}
      /> */}
      {hasLegend && <Legend categories={categories} />}
    </div>
  );
};

export const getServerSideProps = withAuthentication();

export default MapContainer;
