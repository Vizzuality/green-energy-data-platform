import React, {
  FC,
  useState,
  useCallback,
} from 'react';

// Layer manager
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';

// Controls
import ZoomControl from 'components/map/zoom';
import Legend from 'components/map/legend';

// Map

import { ACTIVE_LAYERS, DEFAULT_VIEWPORT } from 'components/map/constants';

// components
import LayoutPage from 'layout';
import Head from 'components/head';
import Map from 'components/map';

const MapPage: FC = () => {
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const handleViewportChange = useCallback((v) => {
    setViewport(v);
  }, []);

  const handleZoomChange = useCallback(
    (zoom) => {
      setViewport({
        ...viewport,
        zoom,
      });
    },
    [viewport],
  );

  return (
    <LayoutPage className="map-page">
      <Head title="Green Energy Data Platform Map" />
      <section>
        <p className="text-color1">Map</p>
        <div className="relative w-screen h-96">
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

          <ZoomControl
            className="absolute bottom-4 left-2 w-4 h-10"
            viewport={viewport}
            onZoomChange={handleZoomChange}
          />
          <Legend />
        </div>
      </section>
    </LayoutPage>
  );
};

export default MapPage;
