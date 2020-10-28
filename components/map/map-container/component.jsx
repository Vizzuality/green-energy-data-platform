import React, { useState } from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { useDebouncedCallback } from 'use-debounce';
=======
>>>>>>> map migrated to function

import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';

// Components
import Map from 'components/map';
import MapControls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import Legend from 'components/map/legend';

// Constants
import activeLayers from './constants';

import './style.scss';

export const MapContainer = ({
  bounds,
  mapStyle,
  scrollZoom = false,
}) => {
<<<<<<< HEAD
  const [viewport, setViewport] = useState({
    zoom: 2,
    latitude: 0,
    longitude: 0,
    minZoom: 2,
    maxZoom: 15,
  });

  const onZoomChange = (_zoom) => {
    setViewport((prevViewportState) => ({
      ...prevViewportState,
      zoom: _zoom,
      transitionDuration: 250,
    }));
  };

  const handleViewportChange = useDebouncedCallback((_viewport) => {
    setViewport((prevViewportState) => ({
      ...prevViewportState,
      ..._viewport,
    }));
  }, 250);

=======
  const [viewport, setViewport] = useState({ zoom: 1, latitude: 0, longitude: 0 });
  const onZoomChange = (zoom) => {
    setViewport({
      zoom,
      transitionDuration: 250,
    });
  };

>>>>>>> map migrated to function
  return (
    <div className="c-map-container">
      <Map
        viewport={viewport}
        scrollZoom={scrollZoom}
        bounds={bounds}
<<<<<<< HEAD
        mapStyle={mapStyle}
        onViewportChange={handleViewportChange.callback}
        doubleClickZoom
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      >
        {(map) => (
=======
        mapStyle={mapStyle || 'mapbox://css/mapbox/light-v9'}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      >

        {(map) => (

>>>>>>> map migrated to function
          <LayerManager
            map={map}
            plugin={PluginMapboxGl}
          >
            {!!activeLayers && activeLayers.map((l) => (
              <Layer
                key={l.id}
                {...l}
              />
            ))}
          </LayerManager>
        )}

      </Map>
      <MapControls>
        <ZoomControl
          viewport={viewport}
          onClick={onZoomChange}
        />
      </MapControls>
      <Legend />
    </div>
  );
};

MapContainer.propTypes = {
  viewport: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number,
  }),
  setViewport: PropTypes.func,
<<<<<<< HEAD
  mapStyle: PropTypes.string,
  bounds: PropTypes.shape({}),
=======
  mapboxApiAccessToken: PropTypes.string.isRequired,
  mapStyle: PropTypes.shape({}).isRequired,
  bounds: PropTypes.shape({}).isRequired,
>>>>>>> map migrated to function
  scrollZoom: PropTypes.bool,
};

MapContainer.defaultProps = {
  viewport: {
    // width: window.innerWidth,
    // height: window.innerHeight,
    longitude: 0,
    latitude: 0,
    zoom: 2,
    maxZoom: 16,
    bearing: 0,
    pitch: 0,
  },
<<<<<<< HEAD
  bounds: null,
  setViewport: () => { },
  scrollZoom: false,
  mapStyle: 'mapbox://css/mapbox/light-v9',
=======

  setViewport: () => { },
  scrollZoom: false,
>>>>>>> map migrated to function
};

export default MapContainer;
