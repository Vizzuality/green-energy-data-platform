import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';

// Layer manager
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';
import { Popup } from 'react-map-gl';

// hooks
import { useCoalPowerPlantTooltip } from 'hooks/map';
import MapboxglSpiderifier from 'mapboxgl-spiderifier';

// authentication,
import { withAuthentication } from 'hoc/auth';

import i18next from 'i18next';
import { format } from 'd3-format';

// Controls
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

const numberFormat = format('.2f');

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
      properties: {
        point_count: null,
        total: null,
        Total: null,
      },
    });

  const [lngLat, setLngLat] = useState([0, 0]);
  const [sortArray, setSortArray] = useState([]);
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

  // Sorted
  const sortedItems = useMemo(() => {
    const itms = layers[0]?.legendConfig?.sort(
      (a, b) => sortArray.indexOf(a.id) - sortArray.indexOf(b.id),
    );
    return itms || [];
  }, [sortArray, layers]);

  const [spiderInfo, setSpiderInfo] = useState(null);
  const {
    tooltipInfo,
    tooltipInfoHeaders,
  } = useCoalPowerPlantTooltip(hoverInteractions?.['coal-power-plants']);

  const {
    tooltipInfo: spiderTooltipInfo,
    tooltipInfoHeaders: spiderTooltipInfoHeaders,
  } = useCoalPowerPlantTooltip(spiderInfo);

  // Callbacks
  const onChangeOrder = useCallback((ids) => {
    setSortArray(ids);
  }, []);

  const mapRefCurrent = mapRef.current;
  const spiderifier = useMemo(() => {
    if (mapRefCurrent !== null) {
      return new MapboxglSpiderifier(mapRefCurrent, {
        onClick(e, spiderLeg) {
          // e.stopPropagation();

          const {
            elements: {
              container,
            },
          } = spiderLeg;
          container.onmouseleave = () => {
            setSpiderInfo(null);
          };

          const {
            lat,
            lng,
          } = spiderLeg.mapboxMarker.getLngLat();
          setLngLat([lng, lat]);
          setSpiderInfo(spiderLeg.feature);
        },
        markerWidth: 70,
        markerHeight: 40,
      });
    }
    return null;
  }, [mapRefCurrent]);
  const onClickCluster = useCallback((e) => {
    const features = mapRefCurrent.queryRenderedFeatures(e.point, {
      layers: ['coal-power-plants-clusters'],
    });
    if (!features.length) return null;

    mapRefCurrent.getSource('coal-power-plants').getClusterLeaves(
      features[0].properties.cluster_id,
      200,
      0,
      (err, leafFeatures) => {
        if (err) {
          throw new Error(`error while getting leaves of a cluster: ${err}`);
        }
        const markers = leafFeatures.map((leafFeature) => leafFeature.properties);
        spiderifier.spiderfy(features[0].geometry.coordinates, markers);
      },
    );
    setDisclaimerVisibility(false);
    return true;
  }, [mapRefCurrent, spiderifier]);

  useEffect(() => {
    if (hoverInteractions?.cluster?.point_count) {
      setDisclaimerVisibility(false);
    }
  }, [hoverInteractions, setDisclaimerVisibility]);

  return (
    <div className="relative h-full border-4 rounded border-gray5" style={style}>
      <Map
        hasInteraction={hasInteraction}
        width="100%"
        height="100%"
        viewport={viewport}
        className="z-10"
        onMapViewportChange={handleViewportChange}
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
            e.features.forEach((f) => setHoverInteractions({
              [f.source]: f.properties,
              ...f,
              ...e,
            }));
            setLngLat(e.lngLat);
          }
          setSpiderInfo(null);
        }}
        onMouseLeave={() => {
          setDisclaimerVisibility(true);
          setHoverInteractions({});
          setLngLat(null);
        }}
        onMapLoad={({ map }) => { mapRef.current = map; }}
      >
        {(map) => (
          <>
            <LayerManager map={map} plugin={PluginMapboxGl}>
              {layers?.map((l) => (
                <Layer key={l.id} {...l} />
              ))}
            </LayerManager>
            {hasInteraction
              && !spiderInfo
              && hoverInteractions?.properties?.point_count > 1
              && (
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
                        {i18next.t('numberPlants')}
                      </span>
                      <span className="mr-2 text-sm">{hoverInteractions?.properties?.point_count}</span>
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
                      <span className="mr-4 text-sm first-letter:uppercase">{t}</span>
                      {(t === 'Total' || t === 'total')
                        ? <span className="text-sm">{numberFormat(tooltipInfo[t])}</span>
                        : <span className="text-sm">{tooltipInfo[t]}</span>}
                    </li>
                  ))}
                </ul>
              </Popup>
            )}

            {!spiderInfo
            && !tooltipInfoHeaders.length
            && !tooltipInfo.length
            && hoverInteractions.cluster
            && (
              <Popup
                latitude={lngLat[1]}
                longitude={lngLat[0]}
                closeButton={false}
                tipSize={10}
                className="z-20 max-w-sm rounded-2xl"
              >

                <span className="mr-4 text-xs">{i18next.t('infoPlant')}</span>
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
                      <span className="mr-4 text-xs">{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                      {(t === 'Total' || t === 'total')
                        ? <span className="text-xs">{numberFormat(spiderTooltipInfo[t])}</span>
                        : <span className="text-xs">{spiderTooltipInfo[t]}</span>}
                    </li>
                  ))}
                </ul>
              </Popup>
            )}

            {/* Pop up for choropleth */}
            {!!hoverInteractions?.properties
            && Object.keys(hoverInteractions?.properties).length === 1
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
                        {i18next.t('total')}
                        :
                      </span>
                      <span className="mr-2 text-sm">{numberFormat(Object.values(hoverInteractions?.properties))}</span>
                    </div>
                  </div>
                </Popup>
            )}
          </>
        )}
      </Map>
      {
        hasInteraction && (
          <ZoomControl
            viewport={viewport}
            onZoomChange={handleZoomChange}
          />
        )
      }
      {
        hasInteraction && disclaimerVisibility && (
          <Disclaimer
            className="transform -translate-x-1/2 top-4 left-1/2"
            message={i18next.t('fullscreenDisclaimer')}
            onDisclaimerClose={setDisclaimerVisibility}
          />
        )
      }
      {
        hasInteraction
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
        )
      }
      {
        hasInteraction && disclaimerVisibility && (
          <Disclaimer
            className="transform -translate-x-1/2 top-4 left-1/2"
            message={i18next.t('fullscreenDisclaimer')}
            onDisclaimerClose={setDisclaimerVisibility}
          />
        )
      }
    </div>
  );
};

export const getServerSideProps = withAuthentication();

export default MapContainer;
