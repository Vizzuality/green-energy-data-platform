const ACTIVE_LAYERS = [

  // GEOJSON DATA LAYER
  {
    id: 'coal-power-plants',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: 'http://localhost:3000/poweer-plants.geojson',
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

export default ACTIVE_LAYERS;
