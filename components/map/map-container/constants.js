const ACTIVE_LAYERS = [

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
];
export default ACTIVE_LAYERS;
