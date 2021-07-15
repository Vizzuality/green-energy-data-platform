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
import { ACTIVE_LAYERS, DEFAULT_VIEWPORT } from './constants';

// components
import Map from './map';

const MapContainer: FC = () => {
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
  return (
    <div className="relative h-full border-4 border-gray5 rounded">
      <Map
        width="100%"
        height="100%"
        viewport={viewport}
        onMapViewportChange={handleViewportChange}
      >
        {(map) => (
          <LayerManager map={map} plugin={PluginMapboxGl}>
            {ACTIVE_LAYERS.map((l) => (
              <Layer key={l.id} {...l} />
            ))}
          </LayerManager>
        )}
      </Map>

      {/* <ZoomControl
        className="absolute bottom-4 left-2 w-4 h-10"
        viewport={viewport}
        onZoomChange={handleZoomChange}
      /> */}
      <Legend />
    </div>
  );
};

export const getServerSideProps = withAuthentication();

export default MapContainer;
