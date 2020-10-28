import React, { FC, useCallback, useState } from 'react';

// Layer manager
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';

// Controls
import ZoomControl from 'components/map/zoom';
import Legend from 'components/map/legend';

// Map
import Map, { MapProps } from '../component';
import ACTIVE_LAYERS from './constants';

const MapContainer: FC<MapProps> = ({
  children,
  ...props
}: MapProps) => {
  const minZoom = 2;
  const maxZoom = 10;
  const [viewport, setViewport] = useState({});
  const [bounds, setBounds] = useState({});

  const handleViewportChange = useCallback((vw) => {
    setViewport(vw);
  }, []);

  const handleZoomChange = useCallback(
    (zoom) => {
      setViewport({
        ...viewport,
        zoom,
        transitionDuration: 500,
      });
    },
    [viewport],
  );

  const onMapReady = ({ map, mapContainer }) => {
    console.info('onMapReady: ', map, mapContainer) ;
  const onMapLoad = ({ map, mapContainer }) => {
    console.info('onMapLoad: ', map, mapContainer) };

  return (
    <div className="relative w-screen h-96">
      <Map
        {...props}
        bounds={bounds}
        minZoom={minZoom}
        maxZoom={maxZoom}
        viewport={viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onMapViewportChange={handleViewportChange}
        onMapLoad={onMapLoad}
        onMapReady={onMapReady}
      >
        {(map) => {
          return (
            <LayerManager map={map} plugin={PluginMapboxGl}>
              {ACTIVE_LAYERS.map((l) => (
                <Layer key={l.id} {...l} />
              ))}
            </LayerManager>
          );
        }}
      </Map>

      <ZoomControl
        className="absolute bottom-4 left-2 w-4 h-10"
        viewport={{
          ...viewport,
          minZoom,
          maxZoom,
        }}
        onZoomChange={handleZoomChange}
      />
      <Legend />
    </div>
  );
};

export default MapContainer;
