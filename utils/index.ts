import {
  compact, sortedUniq, chain, flatten, groupBy,
} from 'lodash';

import chroma from 'chroma-js';

import { format as ValueFormat } from 'd3-format';

import i18n from 'i18next';

import { saveAs } from 'file-saver';

import { Record, Region } from 'types/data';

import { IndicatorFilters } from 'store/slices/indicator';

import resources from 'utils/translations';
import { MapLayersProps } from 'components/indicator-visualizations/choropleth/component';
import ID_CHINA from 'utils/constants';

const numberFormat = ValueFormat('.2s');
export const initializeLanguage = () => i18n.init({
  resources,
  lng: 'en',
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
) => {
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

  if (visualization === 'line') {
    const categoriesWithTotal = (categories.includes('total') || categories.includes('Total')) ? categories : ['Total', ...categories];
    return categoriesWithTotal;
  }

  if (visualization !== 'line') {
    return categories.filter((category) => {
      if (categories.length > 1 && visualization !== 'line') {
        return (
          category !== 'Total' && category !== '全部的' && category !== null
        );
      }
      if (categories.length > 1 && visualization === 'line') {
        return category !== null;
      }
      return category || 'Total';
    });
  }
};

export const getSubcategoriesFromRecords = (records: Record[]) => compact(
  sortedUniq(
      records
        ?.map((d) => (d.category_2 === null ? 'Total' : d.category_2))
        .sort(),
  ),
);

export const filterRecords = (
  records: Record[],
  filters: IndicatorFilters,
  categories: unknown[],
  groupSlug: string | string[],
) => {
  const {
    year, region, unit, scenario, visualization,
  } = filters;

  const recordsByFilters = records.filter((d) => {
    const unitId = d.unit?.id;
    if (visualization === 'line') {
      // API return region name to null for China
      if (
        (categories.length > 1 && d.category_1 !== 'Total')
        || categories.length === 1
      ) { return true; }
    }

    if (visualization === 'pie') {
      if (
        (d.region_id === region || d.region_id === null)
        && (unitId === unit || !unitId)
        && year === d.year
        && ((categories.length > 1 && d.category_1 !== 'Total')
          || categories.length === 1)
      ) { return true; }
    }

    if (visualization === 'choropleth') {
      if (
        (groupSlug === 'scenarios'
          && d.scenario.id === scenario
          && year === d.year
          && (unitId === unit || !unitId)) // some idicators has no unit
        || (groupSlug !== 'scenarios'
          && year === d.year
          && (unitId === unit || !unitId)) // some idicators has no unit
      ) { return true; }
    }

    if (visualization === 'bar') {
      if (
        (groupSlug === 'scenarios'
          && d.scenario.id === scenario
          && (unitId === unit || !unitId))
        || (groupSlug !== 'scenarios'
          && year === d.year
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
  year: number;
  [Key: string]: string | number | string[] | Data[] | Data;
}

interface Bar {
  [Key: string]: string | number | string[] | Data[] | Data;
}

export const getGroupedValues = (
  name: string,
  groupSlug: string | string[],
  filters: IndicatorFilters,
  records: Record[],
  regions: Region[],
  units: { label: string; value: string }[],
): unknown => {
  const { category, unit, visualization } = filters;
  const label = category?.label;
  const categorySelected = category?.value || 'Total';
  const mapCategorySelected = category?.label === 'category_1' ? 'Total' : category?.value;
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

    return Object.keys(dataByYear).map((year) => dataByYear[year].reduce(
      (acc, next) => {
        const { year: currentYear, visualizationTypes, ...rest } = next;
        return {
          ...acc,
          ...rest,
          Total: dataByYearWithTotals[currentYear],
        };
      },
      {
        year,
      },
    ));
  };

  const getPieData = () => chain(filteredData)
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
    .value();

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
          ? p.province !== i18n.t('China')
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
        (r): boolean => d.region.name === r.name,
      );
      return {
        geometry,
        visualizationTypes: d.visualization_types,
        [mapCategorySelected]: d.value,
      };
    });
    const geometryTypes = dataWithGeometries?.map((d) => d.geometry?.geometry?.type.toLowerCase()) || [];

    const layerType = !!geometryTypes.length && getMostFrequent(geometryTypes);
    const mapValues = dataWithGeometries
      ?.filter((d) => numberFormat(d[mapCategorySelected]))
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

    const getTooltipProperties = (tooltipData) => {
      if (!tooltipData) return null;
      const properties = tooltipData?.map(
        ({
          name_en, name_cn, value_en, value_cn,
        }) => ({
          [name_en || name_cn]: value_en || value_cn,
        }),
      );
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
                    ({ geometry, visualizationTypes, ...cat }) => ({
                      type: 'Feature',
                      geometry: geometry?.geometry,
                      properties: cat,
                      total: Object.values(cat),
                    }),
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
                clusterMaxZoom: 20,
                clusterRadius: 5,
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
                        'step',
                        ['get', 'total'],
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
                        minValue / 2,
                        15,
                        minValue,
                        20,
                        media,
                        25,
                        maxValue,
                        30,
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
                      'circle-color': '#e7b092',
                      'circle-stroke-width': 1.5,
                      'circle-stroke-opacity': 0.5,
                      'circle-stroke-color': '#e7b092',
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

    return data;
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
  return data;
};

export const getModelIntercomparisonData = (
  filters: IndicatorFilters,
  records: Record[],
  activeModels: string[],
): ChartYear[] | Bar[] => {
  const { category, visualization } = filters;
  const label = category?.label;
  const categorySelected = category?.value || 'Total';
  const filteredData = label === 'category_2'
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

  const getDataByYear = (dataByCat1) => {
    const groupedData = flatten(
      chain(dataByCat1)
        .groupBy('year')
        .map((value) => flatten(
          chain(value)
            .groupBy('category_2')
            .map((res, key) => ({
              [key !== 'null' ? key : 'Total']: res.reduce(
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

    const geometryTypes = dataWithGeometries?.map((d) => d.geometry?.geometry?.type.toLowerCase()) || [];
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
  const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(String(email).toLowerCase());
};
