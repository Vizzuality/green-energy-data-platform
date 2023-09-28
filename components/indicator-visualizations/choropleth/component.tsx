import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';

// import bboxTurf from '@turf/bbox';

// import compact from 'lodash/compact';
// import { flatten } from 'lodash';

// Layer manager
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { Popup,
  FullscreenControl,
} from 'react-map-gl';

// hooks
import { useCoalPowerPlantTooltip } from 'hooks/map';
import MapboxglSpiderifier from 'mapboxgl-spiderifier';

// authentication,
import { withAuthentication } from 'hoc/auth';

import i18next from 'i18next';
import { format } from 'd3-format';
import { RootState } from 'store/store';
// Controls
import { useAppSelector } from 'store/hooks';
import ZoomControl from './zoom';

import Legend from './legend';
import LegendItem from './legend/item';
import LegendTypeChoropleth from './legend/choropleth';
import LegendTypeGradient from './legend/gradient';
import Disclaimer from './disclaimer';

// Map
import { DEFAULT_VIEWPORT } from './constants';

// components
import Map from './map';

type ItemProps = {
  value: string;
  color: string;
};

type LegendConfigProps = {
  id?: number;
  type: string;
  items: ItemProps[];
};

export interface MapLayersProps {
  id: string;
  type: string;
  name: string;
  legendConfig: LegendConfigProps[];
}

interface MapContainerProps {
  layers: MapLayersProps[];
  hasInteraction?: boolean;
  style?: Object;
}

const numberFormat = format(',.2f');


const MapContainer: FC<MapContainerProps> = ({
  layers,
  hasInteraction = true,
  style = {},
}: MapContainerProps) => {
  // language keys
  const infoPlant = i18next.t('infoPlant');
  const numberPlants = i18next.t('numberPlants');
  const value = i18next.t('value');
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [bounds, setBounds] = useState(null);
  const [hoverInteractions, setHoverInteractions] = useState(
    {} || {
      regions: layers[0].name,
      cluster: {
        point_count: null,
        name: '',
      },
      properties: {
        point_count: null,
        total: null,
        Total: null,
      },
    },
  );

  const [lngLat, setLngLat] = useState([0, 0]);
  const [disclaimerVisibility, setDisclaimerVisibility] = useState(true);

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

  const [spiderInfo, setSpiderInfo] = useState(null);

  const { tooltipInfo, tooltipInfoHeaders } = useCoalPowerPlantTooltip(
    hoverInteractions?.['coal-power-plants'],
  );

  const {
    tooltipInfo: spiderTooltipInfo,
    tooltipInfoHeaders: spiderTooltipInfoHeaders,
  } = useCoalPowerPlantTooltip(spiderInfo);

  const mapRefCurrent = mapRef.current;
  const spiderifier = useMemo(() => {
    if (mapRefCurrent !== null) {
      return new MapboxglSpiderifier(mapRefCurrent, {
        onClick(e, spiderLeg) {
          const {
            elements: { container },
          } = spiderLeg;
          // container.onmouseleave = () => {
          //   setSpiderInfo(null);
          // };

          const { lat, lng } = spiderLeg.mapboxMarker.getLngLat();
          setLngLat([lng, lat]);
          setSpiderInfo(spiderLeg.feature);
        },
        markerWidth: 70,
        markerHeight: 70,
        onHover(e, spiderLeg) {
          const {
            elements: { container },
          } = spiderLeg;
          container.onmouseleave = () => {
            setSpiderInfo(null);
          };

          const { lat, lng } = spiderLeg.mapboxMarker.getLngLat();
          setLngLat([lng, lat]);
          setSpiderInfo(spiderLeg.feature);
        },
      });
    }
    return null;
  }, [mapRefCurrent]);
  const onClickCluster = useCallback(
    (e) => {
      const features = mapRefCurrent.queryRenderedFeatures(e.point, {
        layers: ['coal-power-plants-clusters'],
      });
      if (!features.length) return null;

      mapRefCurrent
        .getSource('coal-power-plants')
        .getClusterLeaves(
          features[0].properties.cluster_id,
          200,
          0,
          (err, leafFeatures) => {
            if (err) {
              throw new Error(
                `error while getting leaves of a cluster: ${err}`,
              );
            }
            const markers = leafFeatures.map(
              (leafFeature) => leafFeature.properties,
            );
            spiderifier.spiderfy(features[0].geometry.coordinates, markers);
          },
        );
      setDisclaimerVisibility(false);
      return true;
    },
    [mapRefCurrent, spiderifier],
  );

  const hanldeMapLoad = useCallback(({ map }) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (hoverInteractions?.cluster?.point_count) {
      setDisclaimerVisibility(false);
    }
  }, [hoverInteractions, setDisclaimerVisibility, layers]);

  const { current } = useAppSelector((state: RootState) => state.language);
  const LABEL_CODE = useMemo(() => (current === 'cn' ? 'cva' : 'eva'), [current]);
  // const features = useMemo(() => layers[0]?.source?.data?.features?.filter((d) => !!d.geometry), [layers]);

  // useEffect(() => {
  //   if (!!layers.length && layers[0]?.source?.data) {
  //     const bbox = bboxTurf({ type: 'FeatureCollection', features });
  //     setBounds([bbox]);
  //   }
  // }, [layers, features]);

  return (
    <div
      className="relative h-full border-4 rounded border-gray5"
      style={style}
    >
      <Map
        hasInteraction={hasInteraction}
        width="100%"
        height="100%"
        // bounds={bounds}
        viewport={viewport}
        className="z-10"
        onMapViewportChange={handleViewportChange}
        preserveDrawingBuffer
        bounds={bounds}
        onClick={(e) => {
          setDisclaimerVisibility(false);
          const { zoom, maxZoom } = viewport;
          e.stopPropagation();
          const clusterProperties = e?.features[0]?.properties;
          const count = clusterProperties?.point_count;

          if (!count || count < 1) {
            spiderifier.unspiderfy();
          }

          if (count > 10) {
            handleZoomChange(zoom + 1 > maxZoom ? maxZoom : zoom + 1);
          }
          onClickCluster(e);
        }}
        onHover={(e) => {
          setDisclaimerVisibility(false);
          if (e && e.features) {
            if (e.features.filter((f) => f.layer.id === 'regions-fill-0').length > 1) {
              setHoverInteractions({
                ...e.features[0],
                [e.features[0].source]: e.features[0].properties,
              });
            } else {
              e.features.forEach((f) => setHoverInteractions({
                [f.source]: f.properties,
                ...f,
                ...e,
              }));
            }
            setLngLat(e.lngLat);
          }
          setSpiderInfo(null);
        }}
        onMouseLeave={() => {
          setDisclaimerVisibility(true);
          setHoverInteractions({});
          setLngLat(null);
        }}
        onMapLoad={hanldeMapLoad}
      >
        {(map) => {
          return (
          <>
            <LayerManager map={map} plugin={PluginMapboxGl}>
              {layers?.map((l) => (
                <Layer key={l.id} {...l} />
              ))}

              <Layer
                id="labels"
                type="raster"
                source={{
                  type: 'raster',
                  tiles: [
                    `https://t0.tianditu.gov.cn/${LABEL_CODE}_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${LABEL_CODE}&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=1a2089c5fe8e0ee594c74db656d8b923`,
                  ],
                }}
              />
            </LayerManager>

            {hasInteraction
              && !spiderInfo
              && hoverInteractions?.properties?.point_count > 1 && (
                <Popup
                  latitude={lngLat[1]}
                  longitude={lngLat[0]}
                  closeButton={false}
                  tipSize={10}
                  className="z-20 max-w-sm rounded-2xl"
                >
                  <div className="flex flex-col">
                    <div className="flex">
                      <span className="mr-2 text-sm">
                        {numberPlants}
                      </span>
                      <span className="mr-2 text-sm">
                        {hoverInteractions?.properties?.point_count}
                      </span>
                    </div>
                  </div>
                </Popup>
            )}
            {tooltipInfoHeaders.length > 1 && (
              <Popup
                latitude={lngLat[1]}
                longitude={lngLat[0]}
                closeButton={false}
                tipSize={10}
                className="z-20 max-w-sm rounded-2xl"
              >
                <ul>
                  {tooltipInfoHeaders.map((t) => (
                    <li key={`${t}-${tooltipInfo[t]}`}>
                      <span className="mr-4 text-sm first-letter:uppercase">
                        {t}
                      </span>
                      {t.toLowerCase() === 'total' ? (
                        <span className="text-sm">
                          {numberFormat(tooltipInfo[t])}
                        </span>
                      ) : (
                        <span className="text-sm">{tooltipInfo[t]}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Popup>
            )}

            {!spiderInfo
              && !tooltipInfoHeaders.length
              && !tooltipInfo.length
              && hoverInteractions.cluster &&
              hasInteraction && (
                <Popup
                  latitude={lngLat[1]}
                  longitude={lngLat[0]}
                  closeButton={false}
                  tipSize={10}
                  className="z-20 max-w-sm rounded-2xl"
                >
                  <span className="mr-4 text-xs">{infoPlant}</span>
                </Popup>
            )}
            {spiderTooltipInfoHeaders.length > 0 && (
              <Popup
                latitude={lngLat[1]}
                longitude={lngLat[0]}
                closeButton={false}
                tipSize={10}
                className="z-20 max-w-sm rounded-2xl"
              >
                <ul>
                  {spiderTooltipInfoHeaders.map((t) => (
                    <li key={`${t}-${spiderTooltipInfo[t]}`}>
                      <span className="mr-4 text-xs">
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </span>
                      {t === 'Total' || t === 'total' ? (
                        <span className="text-xs">
                          {numberFormat(spiderTooltipInfo[t])}
                        </span>
                      ) : (
                        <span className="text-xs">{spiderTooltipInfo[t]}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Popup>
            )}

            {/* Pop up for choropleth */}
            {!!hoverInteractions?.properties
              && Object.keys(hoverInteractions?.properties).length === 1
              && layers[0]?.legendConfig
              && hasInteraction && (
                <Popup
                  latitude={lngLat[1]}
                  longitude={lngLat[0]}
                  closeButton={false}
                  tipSize={10}
                  className="z-20 max-w-sm rounded-2xl"
                >
                  <div className="flex flex-col">
                    <div className="flex">
                      <span className="mr-2 text-sm">
                        {value}
                        :
                      </span>
                      <span className="mr-2 text-sm">
                        {numberFormat(
                          Object.values(hoverInteractions?.properties),
                        )}
                      </span>
                    </div>
                  </div>
                </Popup>
            )}
          </>
          );
        }}
      </Map>
      {hasInteraction && (
        <>
          <ZoomControl viewport={viewport} onZoomChange={handleZoomChange} />
          <FullscreenControl className="top-0 right-0 z-10" />
        </>
      )}


      {hasInteraction && disclaimerVisibility && (
        <Disclaimer
          className="transform -translate-x-1/2 top-4 left-1/2"
          message={i18next.t('fullscreenDisclaimer')}
          onDisclaimerClose={setDisclaimerVisibility}
        />
      )}

      {hasInteraction && (

        <Legend>
          {layers[0]?.legendConfig?.map((i) => {
            const { type, items } = i;
            return (
              <LegendItem key={i.id} {...i}>
                {type === 'choropleth' && (
                  <LegendTypeChoropleth
                    className="text-sm text-gray-300"
                    items={items}
                  />
                )}

                {type === 'gradient' && (
                  <LegendTypeGradient
                    className="text-sm text-gray-300"
                    items={items}
                  />
                )}
              </LegendItem>
            );
          })}
        </Legend>
      )}
      {hasInteraction && disclaimerVisibility && (
        <Disclaimer
          className="transform -translate-x-1/2 top-4 left-1/2"
          message={i18next.t('fullscreenDisclaimer')}
          onDisclaimerClose={setDisclaimerVisibility}
        />
      )}
    </div>
  );
};

export const getServerSideProps = withAuthentication();

export default MapContainer;
