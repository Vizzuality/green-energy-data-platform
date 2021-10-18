import {
  compact,
  uniq,
  chain,
  flatten,
  groupBy,
  sortedUniq,
} from 'lodash';

//import { scaleLinear } from 'd3-scale';

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
) => compact(uniq(records.map((d) => (d.category_1 === null ? 'Total' : d.category_1)))).sort();

export const getSubcategoriesFromRecords = (
  records: Record[],
) => compact(uniq(records.map((d) => (d.category_2 === null ? 'Total' : d.category_2)))).sort();

export const filterRecords = (
  records: Record[],
  filters: IndicatorFilters,
  visualizationType: string,
) => {
  const {
    year,
    region,
    unit,
  } = filters;

  const categories = getCategoriesFromRecords(records);
  const recordsByFilters = records.filter((d) => {
    if (visualizationType === 'line') {
      // API return region name to null for China

      if (
        (d.region.name === region || (d.region.name === null)
        )
        && d.unit.name === unit
        && (((categories.length > 1) && d.category_1 !== 'Total' && d.category_2 !== 'Total')
        || categories.length === 1)) return true;
    }

    if (visualizationType === 'pie') {
      if ((d.region.name === region || (d.region.name === null))
        && d.unit.name === unit && year === d.year
        && (((categories.length > 1) && d.category_1 !== 'Total' && d.category_2 !== 'Total')
        || categories.length === 1)) return true;
    }

    if (visualizationType === 'choropleth') {
      if (year === d.year && d.unit.name === unit) return true;
    }

    if (visualizationType === 'bar') {
      if (year === d.year && d.unit.name === unit
      && (((categories.length > 1) && d.category_1 !== 'Total' && d.category_2 !== 'Total')
        || categories.length === 1) && d.region.id !== 'bca25526-8927-4d27-ac0e-e92bed88198a') return true;
    }

    return false;
  });
  return recordsByFilters;
};

// Get indicators related to the main indicator displayed
export const filterRelatedIndicators = (
  records: Record[],
  filters: IndicatorFilters,
  visualizationType: string,
) => {
  const { region, category } = filters;
  const label = category?.label;
  const categories = getCategoriesFromRecords(records).filter((c) => c !== 'Total');

  const results = records.filter((r) => {
    if (categories.length > 1) return r.category_1 !== 'Total' && r.category_2 !== 'Total';

    return r;
  });

  const recordsByFilters = results.filter((d) => {
    if (visualizationType === 'line') {
      // API return region name to null for China
      if (d.region.name === region || d.region.name === null) return true;
    }

    if (visualizationType === 'pie') {
      if (d.region.name === region || d.region.name === null) return true;
    }

    if (visualizationType === 'bar') {
      if (d.region.name === region || d.region.name === null) return true;
    }

    if (visualizationType === 'choropleth') {
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
  groupSlug: string | string[],
  categories: string[],
  visualization: string,
  filters: IndicatorFilters,
  records: Record[],
  regions: Record[],
) => {
  const { category } = filters;

  const label = category?.label;
  const hasTotal = categories?.find((c) => c === 'Total');
  const categorySelected = category?.value || hasTotal ? 'Total' : categories[0];
  const filteredData = label === 'category_2' ? records.filter((record) => record.category_1 === categorySelected) : records;
  const filteredRegions = regions?.filter((r) => r.geometry !== null);

  let data;
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
      const geometry = filteredRegions?.find((r) => d.region.id === r.id);
      return ({
        visualizationTypes: d.visualizationTypes,
        geometry,
        [d.category_1 || 'Total']: d.value,
      });
    });

    const mapValues = dataWithGeometries
      .filter((d) => d[categorySelected])
      .map((r) => r[categorySelected]) as number[];

    const minValue = Math.min(...mapValues);
    const maxValue = Math.max(...mapValues);

    if (groupSlug !== 'coal-power-plants') {
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

    if (groupSlug === 'coal-power-plants') {
      data = {
        visualizationTypes: dataWithGeometries[0]?.visualizationTypes,
        data: dataWithGeometries,
        mapValues,
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
                type: 'circle',
                paint: {
                  // 'fill-color': '#00ffff',
                  'circle-opacity': 0.5,
                  'circle-stroke-opacity': 0.7,
                  'circle-stroke-color': [
                    'interpolate',
                    ['linear'],
                    ['get', categorySelected],
                    minValue === maxValue ? 0 : minValue,
                    '#e2714b',
                    maxValue,
                    '#eee695',
                  ],
                  'circle-stroke-width': 1,
                  'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['get', categorySelected],
                    minValue === maxValue ? 0 : minValue,
                    10, // 10 y 20 tamaño min y máxim del radio
                    maxValue, // 0 y 1000 maximo y minimo de los valores
                    20,
                  ],
                  'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', categorySelected],
                    minValue === maxValue ? 0 : minValue,
                    '#e2714b',
                    maxValue,
                    '#eee695',
                  ],
                },
              },
            ],
          },
        }],
      };
    }
  }

  return data;
};

export const getGroupedValuesRelatedIndicators = (
  visualization: string,
  filters: IndicatorFilters,
  records: Record[],
  regions,
) => {
  let data;

  const { category } = filters;
  const categorySelected = category?.value || 'Total';
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
      }));
  }

  if (visualization === 'choropleth') {
    const dataWithGeometries = records?.map(({ id, ...d }) => {
      const geometry = filteredRegions?.find((r) => d.region.id === r.id);
      return ({
        visualizationTypes: d.visualizationTypes,
        geometry,
        [d.category_1]: d.value,
      });
    });

    const mapValues = dataWithGeometries
      .filter((d) => d[categorySelected]).map((r) => r[categorySelected]);

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
            features: dataWithGeometries.map(({ geometry, visualizationTypes, ...categories }) => ({
              type: 'Feature',
              geometry: geometry?.geometry,
              properties: categories,
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
        legendConfig: {

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
) => compact(uniq(records
  .filter((r) => r.visualizationTypes.includes(visualizationType)
    && r.region.name === region && r.unit.name === unit)
  .map((d) => d.year))).sort();

export const getDefaultYearFromRecords = (
  records: Record[],
  visualizationType: string,
) => compact(sortedUniq(records.map((r) => {
  if (!r.visualizationTypes.includes(visualizationType)) return null;
  return r.year;
})))[0];

export const getRegionsFromRecords = (
  records: Record[],
  visualizationType: string,
  unit: string,
) => compact(uniq(records
  .filter((r) => r.visualizationTypes.includes(visualizationType)
    && r.unit.name === unit)
  .map((d) => d.region.name))).sort();

export const getDefaultRegionFromRecords = (
  records: Record[],
  visualizationType: string,
) => compact(uniq(records.map((r) => {
  if (!r.visualizationTypes.includes(visualizationType)) return null;
  return r.region.name;
})));

export const getUnitsFromRecords = (
  records: Record[],
  visualizationType: string,
  region: string,
  year: number,
) => compact(uniq(records
  .filter((r) => r.visualizationTypes.includes(visualizationType)
  && r.region.name === region && r.year === year)
  .map((d) => d.unit.name))).sort();

export const getDefaultUnitFromRecords = (
  records: Record[],
  visualizationType: string,
) => compact(sortedUniq(records.map((r) => {
  if (!r.visualizationTypes.includes(visualizationType)) return null;
  return r.unit.name;
})))[0];

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
