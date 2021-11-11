import {
  compact,
  uniqBy,
  sortBy,
  sortedUniq,
  chain,
  flatten,
  groupBy,
} from 'lodash';

import chroma from 'chroma-js';

import i18n from 'i18next';

import { saveAs } from 'file-saver';

import {
  Record,
} from 'types/data';

import {
  IndicatorFilters,
} from 'store/slices/indicator';

import resources from 'utils/translations';

export const initializeLanguage = () => i18n.init({
  resources,
  lng: 'en',
});

export const Filter = (arr: (string | number)[], param: number) => {
  const index = arr.indexOf(param);
  if (index !== -1) {
    arr.splice(index, 1);
  } else {
    arr.push(param);
  }
  return arr;
};

export const getCategoriesFromRecords = (
  records: Record[],
) => compact(sortedUniq(records.map((d) => (d.category_1 === null ? 'Total' : d.category_1)).sort()));

export const getSubcategoriesFromRecords = (
  records: Record[],
) => compact(sortedUniq(records.map((d) => (d.category_2 === null ? 'Total' : d.category_2)).sort()));

export const filterRecords = (
  records: Record[],
  filters: IndicatorFilters,
  categories: unknown[],
) => {
  const {
    year,
    region,
    unit,
    scenario,
    visualization,
  } = filters;

  const recordsByFilters = records.filter((d) => {
    if (visualization === 'line') {
      // API return region name to null for China
      if ((categories.length > 1 && d.category_1 !== 'Total') || categories.length === 1) return true;
    }

    if (visualization === 'pie') {
      if ((d.region.id === region || (d.region.name === null))
        && d.unit.id === unit && year === d.year
        && (((categories.length > 1) && d.category_1 !== 'Total')
        || categories.length === 1)) return true;
    }

    if (visualization === 'choropleth') {
      if (year === d.year
        && (d.unit.id === unit || !unit) // some idicators has no unit
        && d.scenario?.name === scenario) return true;
    }

    if (visualization === 'bar') {
      if (year === d.year
        && d.unit.id === unit
        && d.region.id !== 'bca25526-8927-4d27-ac0e-e92bed88198a'
        && d.region.name !== 'China') return true;
    }

    return false;
  });
  return recordsByFilters;
};

// Get indicators related to the main indicator displayed
export const filterRelatedIndicators = (
  records: Record[],
  filters: IndicatorFilters,
) => {
  const { region, category, visualization } = filters;
  const label = category?.label;
  const categories = getCategoriesFromRecords(records).filter((c) => c !== 'Total');

  const results = records.filter((r) => {
    if (categories.length > 1) return r.category_1 !== 'Total';

    return r;
  });

  const recordsByFilters = results.filter((d) => {
    if (visualization === 'line') {
      // API return region name to null for China
      if ((categories.length > 1 && d.category_1 !== 'Total') || categories.length === 1) return true;
    }

    if (visualization === 'pie') {
      if ((categories.length > 1 && d.category_1 !== 'Total')
      || categories.length === 1) return true;
    }

    if (visualization === 'bar') {
      if (d.region.name !== 'China') return true;
    }

    if (visualization === 'choropleth') {
      if (d.region.name === region || d.region.name === null) return true;
    }

    if (label !== 'category_2') {
      return true;
    }
    return false;
  });

  return recordsByFilters;
};
export const getGroupedValues = (
  name: string,
  groupSlug: string | string[],
  filters: IndicatorFilters,
  records: Record[],
  regions: Record[],
  units: { label: string, value: string }[],
) => {
  const { category, unit, visualization } = filters;

  const label = category?.label;
  const categorySelected = category?.value || 'Total';
  const mapCategorySelected = 'Total';
  const filteredData = label === 'category_2' ? records.filter((record) => record.category_1 === categorySelected) : records;
  const filteredRegions = regions?.filter((r) => r.geometry !== null);

  let data = [];
  if (visualization === 'pie') {
    data = chain(filteredData)
      .groupBy(label)
      .map((value, key) => (
        {
          name: key,
          value: value.reduce(
            (previous, current) => (current.value || 0) + previous, 0,
          ),
          region: value[0].region.name,
          year: value[0].year,
          visualizationTypes: value[0].visualizationTypes,
        }))
      .value();
  }

  if (visualization === 'line') {
    data = flatten(chain(filteredData)
      .groupBy('year')
      .map((value) => flatten(chain(value)
        .groupBy(label)
        .map((res, key) => (
          {
            [key !== 'null' ? key : 'Total']: res.reduce(
              (previous, current) => (current.value || 0) + previous, 0,
            ),
            year: res[0].year,
            visualizationTypes: value[0].visualizationTypes,
          }))
        .value()))
      .value());

    const dataByYear = groupBy(data, 'year');

    return Object.keys(dataByYear).map((year) => dataByYear[year]
      .reduce((acc, next) => {
        const { year: currentYear, ...rest } = next;

        return ({
          ...acc,
          ...rest,
        });
      }, {
        year,
      }));
  }
  if (visualization === 'bar') {
    data = flatten(chain(filteredData)
      .groupBy('region.name')
      .map((value) => flatten(chain(value)
        .groupBy(label)
        .map((res, key) => (
          {
            [key !== 'null' ? key : 'Total']: res.reduce(
              (previous, current) => (current.value || 0) + previous, 0,
            ),
            province: res[0].region.name,
            visualizationTypes: value[0].visualizationTypes,
          }))
        .value()))
      .value());
    const dataByProvince = groupBy(data, 'province');
    return Object.keys(dataByProvince).map((province) => dataByProvince[province]
      .reduce((acc, next) => {
        const { province: currentProvince, ...rest } = next;

        return ({
          ...acc,
          ...rest,
        });
      }, {
        province,
      }));
  }

  if (visualization === 'choropleth') {
    const dataWithGeometries = filteredData.map(({ id, ...d }) => {
      const geometry = filteredRegions?.find((r) => d.region.name === r.name);
      return ({
        visualizationTypes: d.visualizationTypes,
        geometry,
        Total: d.value,
      });
    });

    const mapValues = dataWithGeometries
      .filter((d) => d[mapCategorySelected])
      .map((r) => r[mapCategorySelected]) as number[];

    const minValue = Math.min(...mapValues);
    const maxValue = Math.max(...mapValues);
    const colors = chroma.scale(['#e7b092', '#dd96ab']).colors(8);

    const ITEMS = colors.map((d, index) => {
      let value = 0;
      if (index === 0) {
        value = Math.floor(minValue);
      } else if (index === colors.length - 1) {
        value = Math.ceil(maxValue);
      } else value = null;

      return ({
        id: index,
        color: d,
        value,
      });
    });

    const media = (maxValue - minValue) / 2;

    const unitLabel = units.find((u) => u.value === unit)?.label;
    const legendTitle = unit ? `${name} (${unitLabel})` : name;

    if (groupSlug !== 'coal-power-plants') {
      data = {
        // @ts-ignore
        visualizationTypes: dataWithGeometries[0]?.visualizationTypes,
        layers: [{
          id: 'regions',
          type: 'geojson',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: dataWithGeometries.map(({ geometry, visualizationTypes, ...cat }) => ({
                type: 'Feature',
                geometry: geometry?.geometry,
                properties: cat,
              })),
            },
          },
          legendConfig: [{
            id: 'gradient-example-1',
            name: legendTitle,
            icon: null,
            // description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            type: 'choropleth',
            items: [
              {
                color: '#c9e6e8',
                value: Math.floor(minValue),
              },
              {
                color: '#b0d1da',
                value: null,
              },
              {
                color: '#97bbcb',
                value: null,
              },
              {
                color: '#7ea6bd',
                value: null,
              },
              {
                color: '#6691ae',
                value: null,
              },
              {
                color: '#4d7ca0',
                value: null,
              },
              {
                color: '#346691',
                value: null,
              },
              {
                color: '#1b5183',
                value: Math.ceil(maxValue),
              },
            ],
          }],
          render: {
            layers: [
              {
                type: 'fill',
                paint: {
                  'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', mapCategorySelected],
                    minValue === maxValue ? 0 : minValue,
                    '#C9E6E8',
                    maxValue,
                    '#1C5183',
                  ],
                  // 'fill-outline-color': '#35373E',
                  'fill-opacity': 0.3,
                },
              },
            ],
          },
        }],
      };
    }

    if (groupSlug === 'coal-power-plants') {
      data = {
      // @ts-ignore
        visualizationTypes: dataWithGeometries[0]?.visualizationTypes,
        data: dataWithGeometries,
        mapValues,
        layers: [{
          id: 'cluster',
          type: 'geojson',
          filter: ['has', 'point_count'],
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: dataWithGeometries.map(({ geometry, visualizationTypes, ...cat }) => ({
                type: 'Feature',
                geometry: geometry?.geometry,
                properties: cat,
              })),
            },
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 45,
          },
          render: {
            layers: [
              {
                type: 'circle',
                paint: {
                  // 'fill-color': '#00ffff',
                  'circle-opacity': 0.5,
                  // 'circle-stroke-opacity': 0.7,
                  'circle-stroke-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'point_count'],
                    minValue,
                    '#c73a63',
                    media,
                    '#d06182',
                    maxValue,
                    '#dd96ab',
                  ],
                  'circle-stroke-width': 1,
                  'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#dd96ab',
                    minValue,
                    '#d46f8c',
                    media,
                    '#cd5478',
                    maxValue,
                    '#c73a63',
                  ],
                  'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    10,
                    minValue,
                    15,
                    media,
                    20,
                    maxValue,
                    25,
                  ],
                },
              },
              {
                id: 'media-cluster-count',
                metadata: {
                  position: 'top',
                },
                type: 'symbol',
                layout: {
                  'text-allow-overlap': true,
                  'text-ignore-placement': true,
                  'text-field': '{point_count_abbreviated}',
                  'text-size': 12,
                },
              },
              {
                id: 'unclustered-point',
                type: 'circle',
                source: 'earthquakes',
                filter: ['!', ['has', 'point_count']],
                paint: {
                  'circle-color': '#e7b092',
                  'circle-radius': 4,
                  'circle-stroke-width': 1,
                  'circle-stroke-color': '#fff',
                },
              },
              // {
              //   id: 'media',
              //   metadata: {
              //     position: 'top',
              //   },
              //   type: 'symbol',
              //   paint: {
              //     'icon-color': '#F00',
              //   },
              //   layout: {
              //     'icon-ignore-placement': true,
              //     'icon-allow-overlap': true,
              //     'icon-image': '',
              //     'icon-color': 'red',
              //     'icon-size': 10,
              //   },
              // },
            ],
          },
          legendConfig: [{
            id: 'gradient-example-1',
            name: legendTitle,
            icon: null,
            // description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            type: 'gradient',
            items: ITEMS,
          }],
        }],
      };
    }
  }
  return data;
};

export const getGroupedValuesRelatedIndicators = (
  categories: string[],
  filters: IndicatorFilters,
  records: Record[],
  regions,
) => {
  let data;

  const { category, visualization } = filters;
  const categorySelected = category?.value || categories.includes('Total') ? 'Total' : categories[0];
  const mapCategorySelected = category?.value || categories.includes('Total') ? 'Total' : categories[0];
  const filteredRegions = regions?.filter((r) => r.geometry !== null);
  if (visualization === 'pie') {
    data = chain(records)
      .groupBy('category_1')
      .map((value, key) => (
        {
          name: key,
          value: value.reduce(
            (previous, current) => (current.value || 0) + previous, 0,
          ),
          year: value[0].year,
        }))
      .value();
  }

  if (visualization === 'line') {
    data = flatten(chain(records)
      .groupBy('year')
      .map((value) => flatten(chain(value)
        .groupBy('category_1')
        .map((res, key) => (
          {
            [key !== 'null' ? key : 'Total']: res.reduce(
              (previous, current) => (current.value || 0) + previous, 0,
            ),
            year: res[0].year,
          }))
        .value()))
      .value());
    const dataByYear = groupBy(data, 'year');

    return Object.keys(dataByYear).map((year) => dataByYear[year]
      .reduce((acc, next) => {
        const { year: currentYear, ...rest } = next;

        return ({
          ...acc,
          ...rest,
        });
      }, {
        year,
      }));
  }

  if (visualization === 'bar') {
    data = flatten(chain(records)
      .groupBy('region.name')
      .map((value) => flatten(chain(value)
        .groupBy('category_1')
        .map((res, key) => (
          {
            [key !== 'null' ? key : 'Total']: res.reduce(
              (previous, current) => (current.value || 0) + previous, 0,
            ),
            province: res[0].region.name,
          }))
        .value()))
      .value());

    const dataByProvince = groupBy(data, 'province');
    return Object.keys(dataByProvince).map((province) => dataByProvince[province]
      .reduce((acc, next) => {
        const { province: currentProvince, ...rest } = next;

        return ({
          ...acc,
          ...rest,
        });
      }, {
        province,
      })).filter((p) => p.province !== 'China');
  }
  if (visualization === 'choropleth') {
    const dataWithGeometries = records?.map(({ id, ...d }) => {
      const geometry = filteredRegions?.find((r) => d.region.name === r.name);
      return ({
        visualizationTypes: d.visualizationTypes,
        geometry,
        [d.category_1]: d.value,
      });
    });

    const mapValues = dataWithGeometries
      .filter((d) => d[mapCategorySelected]).map((r) => r[mapCategorySelected]);
    const minValue = Math.min(...mapValues);
    const maxValue = Math.max(...mapValues);

    data = {
      visualizationTypes: dataWithGeometries[0]?.visualizationTypes,
      layers: [{
        id: 'regions',
        type: 'geojson',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: dataWithGeometries.map(({ geometry, visualizationTypes, ...cat }) => ({
              type: 'Feature',
              geometry: geometry?.geometry,
              properties: cat,
            })),
          },
        },
        render: {
          layers: [
            {
              type: 'fill',
              paint: {
                'fill-color': [
                  'interpolate',
                  ['linear'],
                  ['get', categorySelected],
                  minValue === maxValue ? 0 : minValue,
                  '#C9E6E8',
                  maxValue,
                  '#1B5183',
                ],
                // 'fill-outline-color': '#35373E',
                'fill-opacity': 0.3,
              },
            },
          ],
        },
      }],
    };
  }
  return data;
};

export const getYearsFromRecords = (
  records: Record[],
  visualizationType: string,
  region: string,
  unit: string,
) => uniqBy(sortedUniq(records
  .filter(((r) => r.visualizationTypes.includes(visualizationType) && r.region.id === region && r.unit.id === unit), 'unit.name')
  .map((d) => ({
    label: d.year,
    value: d.year,
  })).sort()), 'value');

export const getDefaultYearFromRecords = (
  records: Record[],
  visualizationType: string,
) => compact(records.map((r) => {
  if (!r.visualizationTypes.includes(visualizationType)) return null;
  return r.year;
}))[0];

export const getRegionsFromRecords = (
  records: Record[],
  visualizationType: string,
  unit: string,
) => uniqBy(sortBy(records
  .filter((r) => r.visualizationTypes.includes(visualizationType) && r.unit.id === unit), 'region.name')
  .map((d) => ({
    label: d.region.name,
    value: d.region.id,
  })), 'value');

export const getDefaultRegionFromRecords = (
  records: Record[],
  visualizationType: string,
) => records.map((r) => {
  if (!r.visualizationTypes.includes(visualizationType)) return null;
  return r.region;
});

export const getScenariosFromRecords = (
  records: Record[],
) => compact(sortedUniq(
  records.map((d) => ({
    label: d.scenario?.name,
    value: d.scenario?.name,
  })).filter((s) => s.value !== undefined).sort(),
));

export const getUnitsFromRecords = (
  records: Record[],
  visualizationType: string,
) => compact(uniqBy(sortedUniq(sortBy(records
  .filter((r) => r.visualizationTypes.includes(visualizationType)), 'unit.name')
  .map((d) => ({
    label: d.unit.name,
    value: d.unit.id,
  }))), 'value'));

export const getDefaultUnitFromRecords = (
  records: Record[],
  visualizationType: string,
) => compact(records.map((r) => {
  if (!r.visualizationTypes.includes(visualizationType)) return null;
  return r.unit;
}))[0];

export const getTodaysDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

export const parseDataToDownload = (
  format: string,
  data: any,
  fileName: string,
) => {
  const date = getTodaysDate();
  return saveAs(new File([format === 'json' ? JSON.stringify(data) : data], `${fileName}-${date}.${format}`));
};

export const validateEmail = (email) => {
  const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(String(email).toLowerCase());
};
