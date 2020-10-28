import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import ReactMapGL, { FlyToInterpolator, TRANSITION_EVENTS } from 'react-map-gl';
import { fitBounds } from 'viewport-mercator-project';

import { easeCubic } from 'd3-ease';

import './style.scss';

const DEFAULT_VIEWPORT = {
  zoom: 2,
  latitude: 0,
  longitude: 0,
};

const Map = ({
  bounds,
  onReady,
  onLoad,
  onViewportChange,
  customClass,
  children,
  getCursor,
  dragPan,
  dragRotate,
  scrollZoom,
  touchZoom,
  touchRotate,
  doubleClickZoom,
  viewport,
  mapboxApiAccessToken,
  ...mapboxProps
}) => {
  // Refs
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const [mapViewport, setViewport] = useState({
    ...DEFAULT_VIEWPORT,
    ...viewport,
  });

  const [flying, setFlight] = useState(false);
  const [loaded, setLoader] = useState(false);

  const onfitMapBounds = useCallback((transitionDuration = 2500) => {
    const { bbox, options } = bounds;

    const { longitude, latitude, zoom } = fitBounds({
      width: mapContainerRef.current.offsetWidth,
      height: mapContainerRef.current.offsetHeight,
      bounds: [
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ],
      ...options,
    });

    const newViewport = {
      longitude,
      latitude,
      zoom,
      transitionDuration,
      transitionInterruption: TRANSITION_EVENTS.UPDATE,
    };

    setFlight(true);
    setViewport((prevViewport) => ({
      ...prevViewport,
      ...newViewport,
    }));
    onViewportChange(newViewport);

    setTimeout(() => {
      setFlight(false);
    }, transitionDuration);
  }, [bounds, onViewportChange]);

  useEffect(() => {
    onReady({ map: mapRef, mapContainer: mapContainerRef });
  }, [onReady]);

  useEffect(() => {
    if (
      !isEmpty(bounds)
      && !!bounds.bbox
      && bounds.bbox.every((b) => !!b)
    ) {
      onfitMapBounds();
    }
  }, [bounds, onfitMapBounds]);

  useEffect(() => {
    setViewport((prevViewportState) => ({
      ...prevViewportState,
      ...viewport,
    }));
  }, [viewport]);

  const onMapLoad = () => {
    setLoader(true);
    onLoad({ map: mapRef.current, mapContainer: mapContainerRef.current });
  };

  const onMapViewportChange = (v) => {
    setViewport(v);
    onViewportChange(v);
  };

  const onMapResize = (v) => {
    const newViewport = {
      ...mapViewport,
      ...v,
    };

    setViewport(newViewport);
    onViewportChange(newViewport);
  };

  // eslint-disable-next-line no-unused-vars
  const onMoveEnd = () => {
    if (mapRef) {
      const map = mapRef.current;
      const bearing = map.getBearing();
      const pitch = map.getPitch();
      const zoom = map.getZoom();
      const { lng, lat } = map.getCenter();

      const newViewport = {
        ...mapViewport,
        bearing,
        pitch,
        zoom,
        latitude: lat,
        longitude: lng,
      };

      // Publish new viewport and save it into the state
      setViewport(newViewport);
      onViewportChange(newViewport);
    }
  };

  return (
    <div
      ref={mapContainerRef}
      className={classnames({
        'c-map': true,
        [customClass]: !!customClass,
      })}
    >
      <ReactMapGL
        ref={(_map) => {
          if (_map) {
            mapRef.current = _map.getMap();
          }
        }}
        mapboxApiAccessToken={mapboxApiAccessToken}
        // CUSTOM PROPS FROM REACT MAPBOX API
        {...mapboxProps}
        // VIEWPORT
        {...mapViewport}
        width="100%"
        height="100%"
        // INTERACTIVE
        dragPan={!flying && dragPan}
        dragRotate={!flying && dragRotate}
        scrollZoom={!flying && scrollZoom}
        touchZoom={!flying && touchZoom}
        touchRotate={!flying && touchRotate}
        doubleClickZoom={!flying && doubleClickZoom}
        // DEFAULT FUNC IMPLEMENTATIONS
        onViewportChange={onMapViewportChange}
        onResize={onMapResize}
        onLoad={onMapLoad}
        // getCursor={getCursor}
        transitionInterpolator={new FlyToInterpolator()}
        transitionEasing={easeCubic}
      >
        {loaded
          && !!mapRef.current
          && typeof children === 'function'
          && children(mapRef.current)}
      </ReactMapGL>
    </div>
  );
};

Map.propTypes = {
  /** A function that returns the map instance */
  children: PropTypes.func,

  /** Custom css class for styling */
  customClass: PropTypes.string,

  /** Mapbox Api Access Token */
  mapboxApiAccessToken: PropTypes.string.isRequired,

  /** An object that defines the viewport
   * @see https://uber.github.io/react-map-gl/#/Documentation/api-reference/interactive-map?section=initialization
   */
  viewport: PropTypes.shape({}),

  /** An object that defines the bounds */
  bounds: PropTypes.shape({
    bbox: PropTypes.arrayOf(
      PropTypes.number,
    ),
    options: PropTypes.shape({}),
  }),

  /** A boolean that allows panning */
  dragPan: PropTypes.bool,

  /** A boolean that allows rotating */
  dragRotate: PropTypes.bool,

  /** A boolean that allows zooming */
  scrollZoom: PropTypes.bool,

  /** A boolean that allows zooming */
  touchZoom: PropTypes.bool,

  /** A boolean that allows touch rotating */
  touchRotate: PropTypes.bool,

  /** A boolean that allows double click zooming */
  doubleClickZoom: PropTypes.bool,

  /** A function that exposes when the map is ready.
   * It returns and object with the `this.map` and `this.mapContainerRef` reference. */
  onReady: PropTypes.func,

  /** A function that exposes when the map is loaded.
   * It returns and object with the `this.map` and `this.mapContainerRef` reference. */
  onLoad: PropTypes.func,

  /** A function that exposes the viewport */
  onViewportChange: PropTypes.func,

  /** A function that exposes the viewport */
  getCursor: PropTypes.func,
};

Map.defaultProps = {
  children: null,
  customClass: null,
  viewport: DEFAULT_VIEWPORT,
  bounds: {},
  dragPan: true,
  dragRotate: true,
  scrollZoom: false,
  touchZoom: false,
  touchRotate: false,
  doubleClickZoom: false,

  onViewportChange: () => { },
  onLoad: () => { },
  onReady: () => { },
  getCursor: ({ isHovering, isDragging }) => {
    if (isHovering) return 'pointer';
    if (isDragging) return 'grabbing';
    return 'grab';
  },
};

export default Map;
