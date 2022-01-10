import React, {
  FC,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';

import { format } from 'd3-format';

// Layer manager
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';
import { Popup } from 'react-map-gl';

// hooks
import { useCoalPowerPlantTooltip } from 'hooks/map';
import MapboxglSpiderifier from 'mapboxgl-spiderifier';

// authentication,
import { withAuthentication } from 'hoc/auth';

// Controls
import i18next from 'i18next';
import ZoomControl from './zoom';

import Legend from './legend';
import LegendItem from './legend/item';
import LegendTypeChoropleth from './legend/choropleth';
import LegendTypeGradient from './legend/gradient';

// Map
import { DEFAULT_VIEWPORT } from './constants';

// components
import Map from './map';

type ItemProps = {
  value: string,
  color: string
};

type LegendConfigProps = {
  id?: number,
  type: string,
  items: ItemProps[]
};

export interface MapLayersProps {
  id: string,
  type: string,
  name: string,
  legendConfig: LegendConfigProps[]
}

interface MapContainerProps {
  layers: MapLayersProps[],
  hasInteraction?: boolean,
  style?: Object,
}

const numberFormat = format('.2s');
const MapContainer: FC<MapContainerProps> = (
  {
    layers,
    hasInteraction = true,
    style = {},
  }: MapContainerProps,
) => {
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [hoverInteractions, setHoverInteractions] = useState({}
    || {
      regions: layers[0].name,
      cluster: {
        point_count: null,
        name: '',
      },
    });
  const [lngLat, setLngLat] = useState([0, 0]);
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

  const [sortArray, setSortArray] = useState([]);

  // Sorted
  const sortedItems = useMemo(() => {
    const itms = layers[0]?.legendConfig?.sort(
      (a, b) => sortArray.indexOf(a.id) - sortArray.indexOf(b.id),
    );
    return itms || [];
  }, [sortArray, layers]);

  const {
    tooltipInfo,
    tooltipInfoHeaders,
  } = useCoalPowerPlantTooltip(hoverInteractions?.cluster);

  // Callbacks
  const onChangeOrder = useCallback((ids) => {
    setSortArray(ids);
  }, []);

  const mapRefCurrent = mapRef.current;

  const spiderifier = useMemo(() => {
    if (mapRefCurrent !== null) {
      return new MapboxglSpiderifier(mapRefCurrent, {
        onClick(e, spiderLeg) {
          console.log('Clicked on ', spiderLeg);
        },
        markerWidth: 40,
        markerHeight: 40,
      });
    }
    return null;
  }, [mapRefCurrent]);

  const onClickCluster = useCallback((e) => {
    const features = mapRefCurrent.queryRenderedFeatures(e.point, {
      layers: ['coal-power-plants-clusters'],
    });

    spiderifier.unspiderfy();
    if (!features.length) return null;

    mapRefCurrent.getSource('coal-power-plants').getClusterLeaves(
      features[0].properties.cluster_id,
      100,
      0,
      (err, leafFeatures) => {
        if (err) {
          throw new Error(`error while getting leaves of a cluster: ${err}`);
        }
        const markers = leafFeatures.map((leafFeature) => leafFeature.properties);
        spiderifier.spiderfy(features[0].geometry.coordinates, markers);
      },
    );
    return true;
  }, [mapRefCurrent, spiderifier]);

  return (
    <div className="relative h-full border-4 rounded border-gray5" style={style}>
      <Map
        hasInteraction={hasInteraction}
        width="100%"
        height="100%"
        viewport={viewport}
        className="z-10"
        onMapViewportChange={handleViewportChange}
        onClick={onClickCluster}
        onHover={(e) => {
          if (e && e.features) {
            e.features.forEach((f) => setHoverInteractions({
              [f.source]: f.properties,
              ...f,
              ...e,
            }));
            setLngLat(e.lngLat);
          }
        }}
        onMouseLeave={() => {
          setHoverInteractions({});
          setLngLat(null);
        }}
        onMapLoad={({ map }) => { mapRef.current = map; }}
      >
        {/* <ReactMapboxGlCluster data={layers[0].source.data} /> */}
        {/* <GeoJSONLayer data={firstCircle} /> */}
        {(map) => (
          <>
            <LayerManager map={map} plugin={PluginMapboxGl}>
              {layers?.map((l) => (
                <Layer key={l.id} {...l} />
              ))}
            </LayerManager>
            {lngLat && hoverInteractions.regions && (
              <Popup
                latitude={lngLat[1]}
                longitude={lngLat[0]}
                closeButton={false}
                className="rounded-2xl"
              >
                {Object.keys(hoverInteractions.regions)}
                :
                {' '}
                {numberFormat(Object.values(hoverInteractions.regions))}
              </Popup>
            )}
            {hoverInteractions?.cluster?.point_count && (
              <Popup
                latitude={lngLat[1]}
                longitude={lngLat[0]}
                closeButton={false}
                tipSize={10}
                className="z-20 rounded-2xl"
              >
                <div className="flex">
                  <span className="mr-2">
                    {i18next.t('numberPlants')}
                    :
                  </span>
                  <span>{hoverInteractions?.cluster?.point_count}</span>
                </div>

                {!!tooltipInfoHeaders.length && (
                <ul>
                  {tooltipInfoHeaders.map((t) => (
                    <li key={`${t}-${tooltipInfo[t]}`}>
                      <span className="mr-2 text-color6">{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                      <span className="text-color9">{tooltipInfo[t]}</span>
                    </li>
                  ))}
                </ul>
                )}
              </Popup>
            )}
          </>
        )}
      </Map>
      {hasInteraction && (
        <ZoomControl
          viewport={viewport}
          onZoomChange={handleZoomChange}
        />
      )}
      {hasInteraction
      && (
      <Legend onChangeOrder={onChangeOrder}>
        {sortedItems?.map((i) => {
          const { type, items } = i;

          return (
            <LegendItem key={i.id} {...i}>

              {type === 'choropleth' && (
              <LegendTypeChoropleth className="text-sm text-gray-300" items={items} />
              )}

              {type === 'gradient' && (
              <LegendTypeGradient className="text-sm text-gray-300" items={items} />
              )}

            </LegendItem>
          );
        })}
      </Legend>
      )}
    </div>
  );
};

export const getServerSideProps = withAuthentication();

export default MapContainer;
