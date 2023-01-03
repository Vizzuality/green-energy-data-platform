import type {
  ViewState, InteractiveMapProps,
} from 'react-map-gl';
// import { InteractiveMapProps } from 'react-map-gl/src/components/interactive-map';

import type { Map } from 'maplibre-gl';
import { FitBoundsOptions } from '@math.gl/web-mercator';

export type Bounds = {
  bbox: [number, number, number, number];
  options?: FitBoundsOptions;
  viewportOptions?: Partial<ViewState>;
};

export type ViewportProps = {
  longitude: [number, number],
  latitude: [number, number],
  zoom: number,
  transitionDuration: number,
  transitionInterruption?: number,
};

export interface CustomMapProps extends InteractiveMapProps {
  /** An attribute that specifies if the map has interactivity */
  hasInteraction: boolean,
  /** A function that returns the map instance */
  children?: (map:Map) => React.ReactNode;

  /** Custom css class for styling */
  className?: string;

  /** An object that defines the viewport
   * @see https://uber.github.io/react-map-gl/#/Documentation/api-reference/interactive-map?section=initialization
   */
  viewport?: ViewportProps;

  /** An object that defines the bounds */
  bounds?: Bounds;

  /** A function that exposes when the map is mounted.
   * It receives and object with the `mapRef` and `mapContainerRef` reference. */
  onMapReady?: ({ map, mapContainer }) => void;

  /** A function that exposes when the map is loaded.
   * It receives and object with the `mapRef` and `mapContainerRef` reference. */
  onMapLoad?: ({ map, mapContainer }) => void;

  /** A function that exposes the viewport */
  onMapViewportChange?: (viewport: ViewportProps) => void;
}
