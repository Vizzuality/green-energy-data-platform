export const ACTIVE_LAYERS = [

  // GEOJSON DATA LAYER
  {
    id: 'multipolygon',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [
                    82.153702,
                    20.882551,
                  ],
                  [

                    90.067764,
                    44.655466,
                  ],
                  [
                    60.153702,
                    80.882551,
                  ],
                  [
                    44.067764,
                    20.655466,
                  ],
                ],
              ],
            },
          },
        ],
      },
    },
    render: {
      layers: [
        {
          type: 'fill',
          //  'source-layer': 'layer0',
          paint: {
            'fill-color': 'green',
            'fill-opacity': 1,
          },
        },
        {
          type: 'line',
          //  'source-layer': 'layer0',
          paint: {
            'line-color': '#000000',
            'line-opacity': 0.1,
          },
        },
      ],
    },
  },
  {
    id: 'coal-power-plants',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: '/power-plants.geojson',
    },
    render: {
      layers: [
        {
          type: 'circle',
          paint: {
            'circle-opacity': 0.5,
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['get', 'capacity_mw'],
              0,
              10,
              1000,
              20,
            ],
            'circle-color': {
              property: 'source',
              type: 'categorical',
              stops: [
                ['Baike', 'rgb(255, 106, 47)'],
                ['Wiki-Solar', 'rgb(197, 22, 67)'],
                ['communal', '#00382B'],
              ],
              default: '#007A5E',
            },
          },
        },
      ],
    },
  },
];

export const DEFAULT_VIEWPORT = {
  zoom: 6,
  minZoom: 2,
  maxZoom: 12,
  latitude: 35,
  longitude: 104,
  transitionDuration: 500,
};
