import {
  compact,
  uniq,
  chain,
  flatten,
  merge,
  keyBy,
  mergeWith
} from 'lodash';

import {
  Record,
} from 'types/data';

import {
  IndicatorFilters,
} from 'store/slices/indicator';

export const Filter = (arr: (string | number)[], param: number) => {
  const index = arr.indexOf(param) !== -1;
  return index ? arr.splice(param) : arr.push(param);
};

export const getCategoriesFromRecords = (
  records: Record[],
) => compact(uniq(records.map((d) => d.category_1))).sort();

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

  const categories = getCategoriesFromRecords(records).filter((category) => category !== 'Total');

  const results = records.filter((r) => {
    if (categories.length > 1) return r.category_1 !== 'Total' && r.category_2 !== 'Total';

    return r;
  });
  const recordsByFilters = results.filter((d) => {
    // if (visualizationType === 'bar') {
    //   if (year === d.year) {
    //     return {
    //       province: d.region.name,
    //       value: d.value,
    //     };
    //   }
    // }

    if (visualizationType === 'line') {
      if (d.region.name === region && d.unit.name === unit) return true;
    }

    if (visualizationType === 'pie') {
      if (year === d.year && d.region.name === region && d.unit.name === unit) return true;
    }

    if (visualizationType === 'bar' || visualizationType === 'map') {
      if (year === d.year && d.unit.name === unit) return true;
    }

    return false;
  });

  return recordsByFilters;
};

export const getGroupedValues = (
  visualization: string,
  records: Record[],
) => {
  let data;
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
    data = records.map(({ value, category_1, year }) => ({
      label: category_1,
      value,
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
            [key]: res.reduce(
              (previous, current) => (current.value || 0) + previous, 0,
            ),
            province: res[0].region.name,
          }))
        .value()))
      .value());
  }

  return data;
};

export const getYearsFromRecords = (
  records: Record[],
) => compact(uniq(records.map((d) => d.year))).sort();

export const getRegionsFromRecords = (
  records: Record[],
) => compact(uniq(records.map((d) => d.region.name))).sort();

export const getUnitsFromRecords = (
  records: Record[],
) => compact(uniq(records.map((d) => d.unit.name))).sort();
