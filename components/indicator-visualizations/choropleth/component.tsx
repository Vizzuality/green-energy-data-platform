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

// authentication,
import { withAuthentication } from 'hoc/auth';

// Controls
import ZoomControl from './zoom';

import Legend2 from './legend2';
import LegendItem from './legend2/item';
import ITEMS from './legend2/mock';

import LegendTypeChoropleth from './legend2/choropleth';

// Map
import { DEFAULT_VIEWPORT } from './constants';

// components
import Map from './map';

interface MapLayersProps {
  // TO DO
  id: string,
}

// interface LegendProps {
//   className?: string;
//   children: React.ReactNode;
//   maxHeight: string | number;
//   onChangeOrder: (id: string[]) => void;
// }

interface MapContainerProps {
  layers: MapLayersProps[],
  hasIteraction?: boolean,
  style?: Object,
  categories: string[]
}

const numberFormat = format('.2s');
const MapContainer: FC<MapContainerProps> = (
  {
    layers,
    hasIteraction = true,
    style = {},
    categories = [],
  }: MapContainerProps,
) => {
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [hoverInteractions, setHoverInteractions] = useState({} || { regions: {} });
  const [lngLat, setLngLat] = useState(null);
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
    const itms = ITEMS.sort((a, b) => sortArray.indexOf(a.id) - sortArray.indexOf(b.id));
    return itms;
  }, [sortArray]);

  // Callbacks
  const onChangeOrder = useCallback((ids) => {
    setSortArray(ids);
  }, []);

  return (
    <div className="relative h-full border-4 border-gray5 rounded" style={style}>
      <Map
        width="100%"
        height="100%"
        viewport={viewport}
        onMapViewportChange={handleViewportChange}
        onHover={(e) => {
          if (e && e.features) {
            e.features.forEach((f) => setHoverInteractions({
              [f.source]: f.properties,
            }));
            setLngLat(e.lngLat);
          }
        }}
        onMouseLeave={() => {
          setHoverInteractions({});
          setLngLat(null);
        }}

      >
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
          </>
        )}
      </Map>
      {hasIteraction && (
        <ZoomControl
          viewport={viewport}
          onZoomChange={handleZoomChange}
        />
      )}
      {hasIteraction
      && (
      <Legend2 onChangeOrder={onChangeOrder}>
        {sortedItems.map((i) => {
          const { type, items } = i;
          return (
            <LegendItem key={i.id} {...i}>

              {type === 'choropleth' && (
              <LegendTypeChoropleth className="text-sm text-gray-300" items={items} />
              )}

            </LegendItem>
          );
        })}
      </Legend2>
      )}
    </div>
  );
};

export const getServerSideProps = withAuthentication();

export default MapContainer;
