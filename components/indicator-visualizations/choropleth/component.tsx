import React, {
  FC,
  useState,
  useCallback,
  useMemo,
} from 'react';

import { format } from 'd3-format';

// Layer manager
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginMapboxGl } from 'layer-manager';
import { Popup } from 'react-map-gl';

// hooks
import { useCoalPowerPlantTooltip } from 'hooks/map';
// import { ReactMapboxGlCluster } from 'react-mapbox-gl-cluster';

// authentication,
import { withAuthentication } from 'hoc/auth';

// Controls
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

  return (
    <div className="relative h-full border-4 border-gray5 rounded" style={style}>
      <Map
        hasInteraction={hasInteraction}
        width="100%"
        height="100%"
        viewport={viewport}
        className="z-10"
        onMapViewportChange={handleViewportChange}
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
            {(
              <Popup
                latitude={lngLat[1]}
                longitude={lngLat[0]}
                closeButton={false}
                tipSize={20}
                className="z-20 rounded-2xl"
              >
                {hoverInteractions?.cluster?.point_count && (
                  <div className="flex">
                    <span className="mr-2">Total count:</span>
                    <span>{hoverInteractions?.cluster?.point_count}</span>
                  </div>
                  )}
                <div className="flex">
                  <span className="mr-2 text-red-500 text-lg">{hoverInteractions?.cluster?.name}</span>
                  {/* <span>{hoverInteractions?.cluster?.region_type}</span> */}
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

                {/* {hoverInteractions.cluster.tooltip.value} */}
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
