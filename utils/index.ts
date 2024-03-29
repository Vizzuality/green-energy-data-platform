import {
  compact, sortedUniq, chain, flatten, groupBy, orderBy, sortBy,
} from 'lodash';

import chroma from 'chroma-js';

import { format as ValueFormat } from 'd3-format';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import { initReactI18next } from 'react-i18next';

import { saveAs } from 'file-saver';

import { Record, Region } from 'types/data';

import { IndicatorFilters } from 'store/slices/indicator';

import resources from 'utils/translations';
import { MapLayersProps } from 'components/indicator-visualizations/choropleth/component';
import ID_CHINA from 'utils/constants';

import { theme } from 'tailwind.config';

const numberFormat = ValueFormat('.2s');

export const initializeLanguage = (lng = 'en') => i18next.use(LanguageDetector).init({
  resources,
  lng,
});

export const getMostFrequent = (array) => {
  const hashmap = array?.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(hashmap).reduce((a, b) => (hashmap[a] > hashmap[b] ? a : b));
};

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
  visualization: string,
  lang?: string | string[],
) => {

  const KEY = lang === 'cn' ? '总量' : 'Total';
  const categories = visualization !== 'sankey'
    ? compact(
      sortedUniq(
        records
          ?.map((d) => (d.category_1 === null ? 'Total' : d.category_1))
          .sort(),
      ),
    )
    : [];

  if (visualization === 'choropleth') {
    return categories;
  }

  if (visualization === 'pie') {
    return categories.filter((d) => d.toLowerCase() !== 'total' && d !== '总计' );
  }

  if (visualization !== 'choropleth') {
    return categories.filter((category) => {
      if (categories.length > 1 && visualization === 'line') {
        return category !== null;
      }
      return category || KEY;
    });
  }
  return categories;
};

export const getSubcategoriesFromRecords = (
  records: Record[],
  visualization?: string,
) => {
  let data;

  if (visualization !== 'pie') {
    data = records
      ?.map((d) => (d.category_2 === null ? 'Total' : d.category_2));
  } else {
    data = records
      ?.map((r) => (r.category_2))
      ?.filter((d) => d.toLowerCase() !== 'total' && d !== '总计');
  }

  return compact(
    sortedUniq(
      data
        .sort(),
    ),
  );
};

export const filterRecords = (
  records: Record[],
  filters: IndicatorFilters,
  categories: unknown[],
  groupSlug: string | string[],
) => {
  const {
    year, region, unit, scenario, visualization, category,
  } = filters;

  const recordsByFilters = records?.filter((d) => {
    const unitId = d.unit?.id;
    if (visualization === 'line') {
      // API return region name to null for China
      if (
        (category.label === 'category_1' || category?.value === d.category_1)
        && ((categories.length > 1)
        || categories.length === 1)
      ) { return true; }
    }

    if (visualization === 'pie') {
      if (
        (d.region_id === region || d.region_id === null)
        && (unitId === unit || !unitId)
        && year === d.year
        && (category.label === 'category_1' || category?.value === d.category_1)
        && ((categories.length > 1 && d.category_1.toLocaleLowerCase() !== 'total' && d.category_1 !== '总量' && d.category_1 !== '总计')
          || categories.length === 1)
      ) { return true; }
    }

    if (visualization === 'choropleth') {
      if (year === d.year && (unitId === unit || !unitId)) { return true; } // some indicators has no unit
    }

    if (visualization === 'bar') {
      if (
        (groupSlug === 'scenarios'
          && d.scenario.id === scenario
          && (unitId === unit || !unitId))
        || (groupSlug !== 'scenarios'
          && year === d.year
          && (category.label === 'category_1' || category?.value === d.category_1)
          && (unitId === unit || !unitId))
      ) { return true; }
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
  const {
    year, unit, category, visualization, scenario,
  } = filters;
  const label = category?.label;
  const categories = getCategoriesFromRecords(records, visualization);

  const results = records.filter((r) => {
    if (categories.length > 1) return r.category_1 !== 'Total';

    return r;
  });

  const recordsByFilters = results.filter((d) => {
    if (visualization === 'line') {
      // API return region name to null for China
      if (
        (categories.length > 1 && d.category_1 !== 'Total')
        || categories.length === 1
      ) { return true; }
    }

    if (visualization === 'pie') {
      if (
        (categories.length > 1 && d.category_1 !== 'Total')
        || categories.length === 1
      ) { return true; }
    }

    if (visualization === 'bar') {
      if (year === d.year && d.unit?.id === unit && d.region_id !== ID_CHINA) { return true; }
    }

    if (visualization === 'choropleth') {
      if (
        year === d.year
        && (d.unit?.id === unit || !d?.unit?.id) // some idicators has no unit
        && d.scenario?.name === scenario
      ) { return true; }
    }

    if (label !== 'category_2') {
      return true;
    }
    return false;
  });
  return recordsByFilters;
};

interface Data {
  [key: string]: string | number | string[] | MapLayersProps;
  layers?: MapLayersProps;
  model?: string;
  year?: number;
}

interface ChartYear {
  province?: string;
  year: number;
  [Key: string]: string | number | string[] | Data[] | Data;
}

interface Bar {
  [Key: string]: string | number | string[] | Data[] | Data;
}

export const getGroupedValues = (
  name: string,
  categories: string[],
  groupSlug: string | string[],
  filters: IndicatorFilters,
  records: Record[],
  regions: Region[],
  units: { label: string; value: string }[],
  lang: string | string[],
): unknown => {
  const { category, unit, visualization } = filters;
  const label = category?.label;
  const categorySelected = category?.value || 'Total';
  const mapCategorySelected = category?.label === 'category_1' ? categories[0] : category?.value || categorySelected;

  const filteredData = label === 'category_2' && categorySelected !== 'Total'
    ? records.filter((record) => record.category_1 === categorySelected)
    : records;
  const filteredRegions = regions?.filter((r) => r.geometry !== null);

  let data = [];

  const getLineData = (): ChartYear[] => {
    data = flatten(
      chain(filteredData)
        .groupBy('year')
        .map((value) => flatten(
          chain(value)
            .groupBy(label)
            .map((res, key) => ({
              [key]: res.reduce(
                (previous, current) => (current.value || 0) + previous,
                0,
              ),
              year: res[0].year,
              visualizationTypes: value[0].visualization_types || [],
            }))
            .value(),
        ))
        .value(),
    );
    const dataByYear = groupBy(data, 'year');
    const dataByYearFilteredBycategoriesKeys = Object.keys(dataByYear).map(
      (year) => dataByYear[year].reduce(
        (acc, next) => {
          const { year: currentYear, visualizationTypes, ...rest } = next;
          return {
            ...acc,
            ...rest,
          };
        },
        {
          year,
        },
      ),
    );

    const dataByYearWithTotals = dataByYearFilteredBycategoriesKeys.reduce(
      (a, h) => {
        const { year, ...rest } = h;
        return {
          ...a,
          [year]: Object.values(rest).reduce(
            (acc: number, value: number) => acc + value,
            0,
          ),
        };
      },
      {},
    );
    return orderBy(Object.keys(dataByYear).map((year) => dataByYear[year].reduce(
      (acc, next) => {
        const { year: currentYear, visualizationTypes, ...rest } = next;
        return dataByYear[currentYear].length > 1 ? {
          ...acc,
          ...rest,
          // Total: dataByYearWithTotals[currentYear],
        } : {
          ...acc,
          ...rest,
        };
      },
      {
        year: Number(year),
      },
    )), ['year'], ['asc']);
  };

  const getPieData = () => sortBy(chain(filteredData)
    .groupBy(label)
    .map((value, key) => ({
      name: key,
      value: value.reduce(
        (previous, current) => (current.value || 0) + previous,
        0,
      ),
      region: value[0].region.name,
      year: value[0].year,
      visualizationTypes: value[0].visualization_types,
    }))
    .value(), [(item) => (item.name !== 'total' && item.name !== '总计'), (item) => item]);

  const getBarData = () => {
    if (groupSlug !== 'scenarios') {
      data = flatten(
        chain(filteredData)
          .groupBy('region_id')
          .map((value) => flatten(
            chain(value)
              .groupBy(label)
              .map((res, key) => ({
                [key !== 'null' ? key : 'Total']: res.reduce(
                  (previous, current) => (current.value || 0) + previous,
                  0,
                ),
                province: res[0].region.name,
                visualizationTypes: value[0].visualization_types,
              }))
              .value(),
          ))
          .value(),
      );
      const dataByProvince = groupBy(data, 'province');
     
      return Object.keys(dataByProvince)
        .map((province) => dataByProvince[province].reduce(
          (acc, next) => {
            const { province: currentProvince, ...rest } = next;

            return {
              ...acc,
              ...rest,
            };
          },
          {
            province,
          },
        ))
        .filter((p) => (Object.keys(dataByProvince).length > 1
          ? (p.province !== i18next.t('China'))
          : true));
    }

    if (groupSlug === 'scenarios') {
      data = chain(records)
        .groupBy('category_1')
        .map((value) => flatten(
          chain(value)
            .groupBy('year')
            .map((res) => ({
              model: res[0].category_1,
              [res[0].category_2]: res.reduce(
                (previous, current) => (current.value || 0) + previous,
                0,
              ),
              year: res[0].year,
              visualizationTypes: value[0].visualization_types,
            }))
            .value(),
        ))
        .value();
      return data;
    }
    return data;
  };

  const getChoroplethData = (): {
    layers: MapLayersProps;
    visualizationTypes: string[];
    data?: unknown;
    mapValues: number[];
  }[] => {
    const dataWithGeometries = filteredData?.map(({ id, ...d }) => {
      const geometry = filteredRegions?.find(
        // id === '88ff1d74-d37a-437b-998c-316f15a4b91a' is China, please remove is case you want to show it
        (r): boolean => 
          ((d.region.name === r.name) || (d.region_id === r.id) || (d.region.id === r.id)) && d.region.id !== '88ff1d74-d37a-437b-998c-316f15a4b91a',
      );
      return {
        geometry,
        visualizationTypes: d.visualization_types,
        [mapCategorySelected]: d.value,
      };
    }).filter((d) => d.geometry);

    const geometryTypes = !!dataWithGeometries.length && dataWithGeometries
      ?.map((d) => d.geometry?.geometry?.type.toLowerCase()) || [];

    const layerType = !!geometryTypes.length && getMostFrequent(geometryTypes);
    const mapValues = dataWithGeometries
      ?.filter((d) => numberFormat(d[mapCategorySelected]))
      .map((r) => r[mapCategorySelected]) as number[];
    const minValue = Math.min(...mapValues);
    const maxValue = Math.max(...mapValues);
    const colors = chroma.scale((layerType === 'multipolygon' || layerType === 'polygon') ? ['#1B5183', '#C9E6E8', '#e7b092', '#dd96ab'] : ['#e7b092', '#dd96ab']).colors(8);

    const ITEMS = colors.map((d, index) => {
      let value = 0;
      if (index === 0) {
        value = Math.floor(minValue);
      } else if (index === colors.length - 1) {
        value = Math.ceil(maxValue);
      } else value = null;

      return {
        id: index,
        color: d,
        value,
      };
    });
    const media = (maxValue - minValue) / 2;

    const unitLabel = units.find((u) => u.value === unit)?.label;
    const legendTitle = unit ? `${name} (${unitLabel})` : name;
    const visualizations = dataWithGeometries[0]
      ?.visualizationTypes as string[];

    const clusterRadioSteps = (start: number, end: number): number[] => {
      const steps = 5; // For 6 numbers, there are 5 steps
      const stepSize = (end - start) / steps;
  
      return Array.from({ length: steps + 1 }, (_, index) => start + stepSize * index);  
    };

    const clusterRadius = clusterRadioSteps(minValue, maxValue);

    const getTooltipProperties = (tooltipData) => {
      if (!tooltipData) return null;

      const properties = tooltipData.map(t => {
        const nameKey = `name_${lang}`;
        const valueKey = `value_${lang}`;
        return { [t[nameKey]]: t[valueKey] };
      });
      return Object.assign({}, ...properties);
    };

    if (layerType === 'multipolygon' || layerType === 'polygon') {
      data = [
        {
          visualizationTypes: visualizations,
          data: dataWithGeometries,
          mapValues,
          layers: [
            {
              id: 'regions',
              type: 'geojson',
              source: {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: dataWithGeometries.map(
                    ({ geometry, visualizationTypes, ...cat }) => {
                      return ({
                        type: 'Feature',
                        geometry: geometry?.geometry,
                        properties: cat,
                        Total: Object.values(cat),
                        ...cat,
                      });
                    },
                  ),
                },
              },
              legendConfig: [
                {
                  id: 'gradient-example-1',
                  name: legendTitle,
                  icon: null,
                  type: 'choropleth',
                  items: [
                    {
                      color: '#c9e6e8',
                      value: 0,
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
                },
              ],
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
                      'fill-outline-color': '#35373E',
                      'fill-opacity': 1,
                    },
                  },
                ],
              },
            },
          ],
        },
      ];
    }
    if (layerType === 'point') {
      data = [
        {
          visualizationTypes: visualizations,
          data: dataWithGeometries,
          mapValues,
          layers: [
            {
              id: 'coal-power-plants',
              type: 'geojson',
              filter: ['has', 'point_count'],
              source: {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: dataWithGeometries.map(
                    ({ geometry, visualizationTypes, ...cat }) => ({
                      type: 'Feature',
                      geometry: geometry?.geometry,
                      properties: {
                        name: geometry?.name,
                        geometry: geometry?.region_type,
                        region_type: geometry?.region_type,
                        ...getTooltipProperties(
                          geometry?.geometry?.tooltip_properties,
                        ),
                        ...cat,
                      },
                    }),
                  ),
                },
                cluster: true,
                clusterMaxZoom: 30,
                clusterRadius: 30,
                clusterProperties: {
                  total: ['max', ['get', mapCategorySelected]],
                },
              },
              render: {
                layers: [
                  {
                    id: 'coal-power-plants-clusters',
                    type: 'circle',
                    filter: ['has', 'point_count'],
                    paint: {
                      'circle-opacity': 0.5,
                      'circle-stroke-opacity': 0.4,
                      'circle-stroke-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'total'],
                        minValue,
                        '#edc58a',
                        media,
                        '#df7463',
                        maxValue,
                        '#ca184a',
                      ],
                      'circle-stroke-width': 1.5,
                      'circle-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'total'],
                        minValue,
                        '#edc58a',
                        media,
                        '#df7463',
                        maxValue,
                        '#ca184a',
                      ],
                      'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        5,
                        clusterRadius[0],
                        15,
                        clusterRadius[1],
                        10,
                        clusterRadius[2],
                        20,
                        clusterRadius[3],
                        25,
                        clusterRadius[4],
                        30,
                        clusterRadius[5],
                        50,
                      ],
                    },
                  },
                  // {
                  //   id: 'cluster-line',
                  //   type: 'line',
                  //   layout: {
                  //     'text-allow-overlap': true,
                  //     'text-ignore-placement': true,
                  //     'text-field': '{point_count_abbreviated}',
                  //     'text-size': 12,
                  //   },
                  // },
                  // {
                  //   id: 'media-cluster-count',
                  //   metadata: {
                  //     position: 'top',
                  //   },
                  //   type: 'symbol',
                  //   layout: {
                  //     'text-allow-overlap': true,
                  //     'text-ignore-placement': true,
                  //     'text-size': 12,
                  //   },
                  // },
                  {
                    id: 'unclustered-point',
                    type: 'circle',
                    source: 'earthquakes',
                    filter: ['!', ['has', 'point_count']],
                    paint: {
                      'circle-color': [
                        'case',
                        ['<', ['get', categorySelected], 0],
                        '#e7b092',
                        ['all', ['==', ['get', categorySelected], 2], ['<', ['get', categorySelected], 0]],
                        '#C9E6E8',
                        ['all', ['>', ['get', categorySelected], 2], ['<', ['get', categorySelected], 0]],
                        '#e7b092',
                        '#e7b092',
                      ],
                      'circle-stroke-width': 1.5,
                      'circle-stroke-opacity': 0.5,
                      'circle-stroke-color': [
                        'case',
                        ['<', ['get', categorySelected], 0],
                        '#e7b092',
                        ['all', ['==', ['get', categorySelected], 2], ['<', ['get', categorySelected], 0]],
                        '#C9E6E8',
                        ['all', ['>', ['get', categorySelected], 2], ['<', ['get', categorySelected], 0]],
                        '#e7b092',
                        '#e7b092',
                      ],
                    },
                  },
                ],
              },
              legendConfig: [
                {
                  id: 'gradient-example-1',
                  name: legendTitle,
                  icon: null,
                  type: 'gradient',
                  items: ITEMS,
                },
              ],
            },
          ],
        },
        {
          visualizationTypes: visualizations,
          data: dataWithGeometries,
          mapValues,
          layers: [
            {
              id: 'cluster-points',
              type: 'geojson',
              source: {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: dataWithGeometries.map(
                    ({ geometry, visualizationTypes, ...cat }) => ({
                      type: 'Feature',
                      geometry: geometry?.geometry,
                      properties: {
                        name: geometry?.name,
                        geometry: geometry?.geometry.coordinates,
                        region_type: geometry?.region_type,
                        ...getTooltipProperties(
                          geometry?.geometry?.tooltip_properties,
                        ),
                        ...cat,
                      },
                    }),
                  ),
                },
              },
              render: {
                layers: [
                  {
                    type: 'circle',
                    paint: {
                      // 'fill-color': '#00ffff',
                      'circle-opacity': 0.5,
                      'circle-stroke-opacity': 0.4,
                      'circle-stroke-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'total'],
                        minValue,
                        '#edc58a',
                        media,
                        '#df7463',
                        maxValue,
                        '#ca184a',
                      ],
                      'circle-stroke-width': 1.5,
                      'circle-color': 'blue',
                      'circle-radius': 10,
                    },
                  },
                ],
              },
            },
          ],
        },
      ];
    }
    return orderBy(data, 'name');
  };
  switch (visualization) {
    case 'line':
      data = getLineData();
      break;
    case 'pie':
      data = getPieData();
      break;
    case 'bar':
      data = getBarData();
      break;
    case 'choropleth':
      data = getChoroplethData();
      break;
    default:
      data = [];
  }
  return orderBy(data, ['year', 'province'], ['asc']);

};

export const getModelIntercomparisonData = (
  filters: IndicatorFilters,
  records: Record[],
  activeModels: string[],
): ChartYear[] | Bar[] => {
  const { category, visualization } = filters;
  const label = category?.label;
  const categorySelected = category?.value || 'Total';
  const filteredData = label === 'category_2' && categorySelected !== 'Total'
    ? records.filter((record) => record.category_1 === categorySelected)
    : records;
  const filteredDataBars = activeModels.length
    ? records.filter((record) => activeModels.includes(record.category_1))
    : records;

  let data = [];
  const getLineData = (): ChartYear[] => {
    data = flatten(
      chain(filteredData)
        .groupBy('year')
        .map((value) => flatten(
          chain(value)
            .groupBy(label)
            .map((res, key) => ({
              [key !== 'null' ? key : 'Total']: res.reduce(
                (previous, current) => (current.value || 0) + previous,
                0,
              ),
              unit: res[0].unit.name,
              year: res[0].year,
              visualizationTypes: value[0].visualization_types || [],
            }))
            .value(),
        ))
        .value(),
    );

    const dataByYear = groupBy(data, 'year');

    const dataByYearFilteredBycategoriesKeys = Object.keys(dataByYear).map(
      (year) => dataByYear[year].reduce(
        (acc, next) => {
          const { year: currentYear, visualizationTypes, ...rest } = next;
          return {
            ...acc,
            [year]: Object.values(rest).reduce(
              (a: number, value: number) => a + value,
              0,
            ),
          };
        },
        {
          year,
        },
      ),
    );

    const dataByYearWithTotals = dataByYearFilteredBycategoriesKeys.reduce(
      (a, h) => {
        const { year, ...rest } = h;
        return {
          ...a,
          [year]: Object.values(rest).reduce(
            (acc: number, value: number) => acc + value,
            0,
          ),
        };
      },
      {},
    );

    return Object.keys(dataByYear).map((year) => dataByYear[year].reduce(
      (acc, next) => {
        const { year: currentYear, ...rest } = next;

        return {
          ...acc,
          ...rest,
          // Total: dataByYearWithTotals[currentYear],
        };
      },
      {
        year,
      },
    ));
  };

  const getDataByYear = (dataByCat1) => {
    const groupedData = flatten(
      chain(dataByCat1)
        .groupBy('year')
        .map((value) => flatten(
          chain(value)
            .groupBy('category_2')
            .map((res, key) => ({
              [key]: res.reduce(
                (previous, current) => (current.value || 0) + previous,
                0,
              ),
              year: res[0].year,
              visualizationTypes: value[0].visualization_types || [],
            }))
            .value(),
        ))
        .value(),
    );
    const dataByYear = groupBy(groupedData, 'year');

    return Object.keys(dataByYear).map((year) => dataByYear[year].reduce(
      (acc, next) => {
        const { year: currentYear, ...rest } = next;
        return {
          ...acc,
          ...rest,
        };
      },
      {
        year,
      },
    ));
  };

  const getBarData = (): ChartYear[] => {
    data = chain(filteredDataBars)
      .groupBy('category_1')
      .map((d) => ({
        model: d[0].category_1,
        data: getDataByYear(d),
      }))
      .value();
    return data;
  };

  switch (visualization) {
    case 'line':
      data = getLineData();
      break;
    case 'bar':
      data = getBarData();
      break;
    default:
      data = [];
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
  const filteredRegions: Region[] = regions?.filter((r) => r.geometry !== null);
  if (visualization === 'pie') {
    data = chain(records)
      .groupBy('category_1')
      .map((value, key) => ({
        name: key,
        value: value.reduce(
          (previous, current) => (current.value || 0) + previous,
          0,
        ),
        year: value[0].year,
        visualizationTypes: value[0].visualization_types,
      }))
      .value();
  }

  if (visualization === 'line') {
    data = flatten(
      chain(records)
        .groupBy('year')
        .map((value) => flatten(
          chain(value)
            .groupBy('category_1')
            .map((res, key) => ({
              [key !== 'null' ? key : 'Total']: res.reduce(
                (previous, current) => (current.value || 0) + previous,
                0,
              ),
              year: res[0].year,
              visualizationTypes: value[0].visualization_types,
            }))
            .value(),
        ))
        .value(),
    );
    const dataByYear = groupBy(data, 'year');

    return Object.keys(dataByYear).map((year) => dataByYear[year].reduce(
      (acc, next) => {
        const { year: currentYear, ...rest } = next;

        return {
          ...acc,
          ...rest,
        };
      },
      {
        year,
      },
    ));
  }
  if (visualization === 'bar') {
    data = flatten(
      chain(records)
        .groupBy('region_id')
        .map((value) => flatten(
          chain(value)
            .groupBy('category_1')
            .map((res, key) => ({
              [key !== 'null' ? key : 'Total']: res.reduce(
                (previous, current) => (current.value || 0) + previous,
                0,
              ),
              province: res[0]?.region.name,
              visualizationTypes: value[0].visualization_types,
            }))
            .value(),
        ))
        .value(),
    );
    const dataByProvince = groupBy(data, 'province');

    return Object.keys(dataByProvince)
      .map((province) => dataByProvince[province].reduce(
        (acc, next) => {
          const { province: currentProvince, ...rest } = next;

          return {
            ...acc,
            ...rest,
          };
        },
        {
          province,
        },
      ))
      .filter((p) => p.province !== 'China');
  }

  if (visualization === 'choropleth') {
    const dataWithGeometries = records?.map(({ id, ...d }) => {
      const geometry = filteredRegions?.find((r) => d.region_id === r.id);
      return {
        visualizationTypes: d.visualization_types,
        geometry,
        [d.category_1]: d.value,
      };
    });
  
    const geometryTypes = dataWithGeometries
      ?.map((d) => d.geometry?.geometry?.type.toLowerCase()) || [];
    const layerType = !!geometryTypes.length && getMostFrequent(geometryTypes);

    const mapValues = dataWithGeometries
      ?.filter((d) => d[mapCategorySelected])
      .map((r) => r[mapCategorySelected]) as number[];

    const minValue = Math.min(...mapValues);
    const maxValue = Math.max(...mapValues);
    const media = (maxValue - minValue) / 2;
    const visualizations = dataWithGeometries[0]?.visualizationTypes;

    if (layerType === 'point') {
      data = [
        {
          visualizationTypes: visualizations,
          data: dataWithGeometries,
          mapValues,
          layers: [
            {
              id: 'cluster',
              type: 'geojson',
              filter: ['has', 'point_count'],
              source: {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: dataWithGeometries.map(
                    ({ geometry, visualizationTypes, ...cat }) => ({
                      type: 'Feature',
                      geometry: geometry?.geometry,
                      ...cat,
                    }),
                  ),
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
                        '#e7b092',
                        minValue,
                        '#edc58a',
                        media,
                        '#df7463',
                        maxValue,
                        '#ca184a',
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
                  // {
                  //   id: 'media-cluster-count',
                  //   metadata: {
                  //     position: 'top',
                  //   },
                  //   type: 'symbol',
                  //   layout: {
                  //     'text-allow-overlap': true,
                  //     'text-ignore-placement': true,
                  //     'text-field': '{point_count_abbreviated}',
                  //     'text-size': 12,
                  //   },
                  // },
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
            },
          ],
        },
      ];
    }

    if (layerType === 'multipolygon' || layerType === 'polygon') {
      data = [
        {
          visualizationTypes: visualizations,
          layers: [
            {
              id: 'regions',
              type: 'geojson',
              source: {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: dataWithGeometries.map(
                    ({ geometry, visualizationTypes, ...cat }) => ({
                      type: 'Feature',
                      geometry: geometry?.geometry,
                      properties: cat,
                    }),
                  ),
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
            },
          ],
        },
      ];
    }
  }
  return data;
};

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
  return saveAs(
    new File(
      [format === 'json' ? JSON.stringify(data) : data],
      `${fileName}-${date}.${format}`,
    ),
  );
};

export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(String(email).toLowerCase());
};

/** Get color setting Total as color1 */
export const getStrokeColor = (
  index: number, label: string, colors: string[], color?: string,
): string => {
  if (color) return color;
  if (label === 'Total' || label === '总量') {
    return chroma(theme.extend.colors.color1);
  }
  return colors[index];
};

export const getLegendData = (widgetData: unknown, visualization: string) => {
  const data = widgetData as { [key: string]: string | number }[];
  let legendData = [];
  if (visualization === 'line') {
    legendData = data.reduce((prev, curr) => {
      const newKeys = prev;
      Object.keys(curr).forEach((key) => {
        if (!prev?.includes(key) && key !== 'year') {
          newKeys.push(key);
        }
      });
      return newKeys;
    }, []);
  }

  if (visualization === 'bar') {
    legendData = data.reduce((prev, curr) => {
      const newKeys = prev;
      Object.keys(curr).forEach((key) => {
        if (!prev?.includes(key) && key.toLocaleLowerCase() !== 'province' && key !== 'visualizationTypes') {
          newKeys.push(key);
        }
      });
      return newKeys;
    }, []);
  }
  if (visualization === 'pie') {
    const legendKeys = data.map(({ name }) => name) as string[];
    legendData = legendKeys.length > 1 ? legendKeys.filter((l) => l.toLowerCase() !== 'total' && l !== '总量' && l !== '总计') : legendKeys;
  }

  return legendData.sort((a) => (a.toLowerCase() === 'total' || a === '总量' || a === '总计' ? -1 : 0));
};
