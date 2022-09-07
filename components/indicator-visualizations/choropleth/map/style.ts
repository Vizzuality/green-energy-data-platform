const MAP_STYLE = {
  version: 8,
  name: 'Custom',
  metadata: {},
  center: [0, 0],
  zoom: 2,
  bearing: 0,
  pitch: 0,
  sources: {
    basemap: {
      type: 'raster',
      tiles: ['https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=1a2089c5fe8e0ee594c74db656d8b923'],
      tileSize: 256,
    },
  },
  // sprite: '',
  // glyphs: '',
  layers: [
    {
      id: 'basemap',
      source: 'basemap',
      type: 'raster',
    },
    {
      id: 'custom-layers',
      type: 'background',
      paint: { 'background-color': 'pink', 'background-opacity': 0 },
    },
  ],
  created: '2019-09-06T08:42:17.359Z',
  modified: '2022-09-07T09:02:47.232Z',
  id: 'GEFC',
  owner: 'GEFC',
  visibility: 'public',
  protected: false,
  draft: false,
};

export default MAP_STYLE;
