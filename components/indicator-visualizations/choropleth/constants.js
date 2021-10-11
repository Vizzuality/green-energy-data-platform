export const ACTIVE_LAYERS = [

  // GEOJSON DATA LAYER
  // {
  //   id: 'multipolygon',
  //   type: 'geojson',
  //   source: {
  //     type: 'geojson',
  //     data: {
  //       type: 'FeatureCollection',
  //       features: [
  //         {
  //           type: 'Feature',
  //           properties: {},
  //           geometry: {
  //             type: 'Polygon',
  //             coordinates: [
  //               [
  //                 [
  //                   82.153702,
  //                   20.882551,
  //                 ],
  //                 [

  //                   90.067764,
  //                   44.655466,
  //                 ],
  //                 [
  //                   60.153702,
  //                   80.882551,
  //                 ],
  //                 [
  //                   44.067764,
  //                   20.655466,
  //                 ],
  //               ],
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   render: {
  //     layers: [
  //       {
  //         type: 'fill',
  //         //  'source-layer': 'layer0',
  //         paint: {
  //           'fill-color': 'green',
  //           'fill-opacity': 1,
  //         },
  //       },
  //       {
  //         type: 'line',
  //         //  'source-layer': 'layer0',
  //         paint: {
  //           'line-color': '#000000',
  //           'line-opacity': 0.1,
  //         },
  //       },
  //     ],
  //   },
  // },
  {
    id: 'coal-power-plants',
    type: 'geojson',
    source: {
      type: 'geojson',
      promoteId: 'cartodb_id',
      data: '/power-plants.geojson',
    },
    render: {
      layers: [
        // {
        //   type: 'fill',
        //   paint: {
        //     'fill-color': [
        //       'let',
        //       'density',
        //       ['all', ['get', 'capacity_mw']],
        //       [
        //         'interpolate',
        //         ['linear'],
        //         ['zoom'],
        //         8,
        //         [
        //           'interpolate',
        //           ['linear'],
        //           ['var', 'density'],
        //           274,
        //           ['to-color', '#edf8e9'],
        //           1551,
        //           ['to-color', '#006d2c'],
        //         ],
        //         10,
        //         [
        //           'interpolate',
        //           ['linear'],
        //           ['var', 'density'],
        //           274,
        //           ['to-color', '#eff3ff'],
        //           1551,
        //           ['to-color', '#08519c'],
        //         ],
        //       ],
        //     ],
        //     'fill-opacity': 0.7,
        //   },
        // },
        {
          type: 'circle',
          paint: {
            // 'fill-color': '#00ffff',
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
            'circle-color': [
              'interpolate',
              ['exponential', 0.5],
              ['zoom'],
              3,
              '#e2714b',
              6,
              '#eee695',
            ],
            // {
            //   property: 'source',
            //   type: 'categorical',
            //   stops: [
            //     ['Baike', 'red'],
            //     ['Wiki-Solar', 'yellow'],
            //     ['communal', 'blue'],
            //   ],
            // },
          },
        },
        // {
        //   type: 'fill',
        //   filter: ['all', ['==', 'capacity_mw', 'Polygon']],
        //   paint: {
        //     'fill-color': 'red',
        //     'fill-outline-color': 'blue',
        //     'fill-opacity': 0.5,
        //   },
        // },
      ],
    },
  },
  // {
  //   id: 'power-2',
  //   type: 'geojson',
  //   source: {
  //     type: 'geojson',
  //     data: '/power-plants.geojson',
  //   },
  //   render: {
  //     layers: [
  //       {
  //         type: 'fill',
  //         paint: {
  //           'fill-color': 'red',
  //           'fill-opacity': 0.5,
  //         },
  //       },
  //     ],
  //   },
  // },
  // {
  //   id: 'wri-rw',
  //   type: 'geojson',
  //   source: {
  //     type: 'geojson',
  //     data: 'SELECT gid_0 as iso, name_0 as name, coastal, the_geom_webmercator
  // FROM gadm36_0 where coastal is true',
  //     promoteId: 'iso',
  //   },
  //   render: {
  //     layers: {
  //       type: 'fill',
  //       paint: {
  //         'fill-color': [
  //           'case',
  //           [
  //             'boolean',
  //             [
  //               'feature-state',
  //               'hover',
  //             ],
  //             false,
  //           ],
  //           '#fab72e',
  //           '#217098',
  //         ],
  //         'fill-opacity': 1,
  //         'fill-outline-color': '#15527f',
  //       },
  //       'source-layer': 'layer0',
  //     },
  //   },
  // },
];

export const DEFAULT_VIEWPORT = {
  zoom: 6,
  minZoom: 2,
  maxZoom: 12,
  latitude: 35,
  longitude: 104,
  transitionDuration: 500,
};
