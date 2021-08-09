import {
  compact,
  uniq,
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

  const hideTotals = records.filter((r) => r.category_1 !== 'Total');
  return hideTotals.filter((d) => {
    // if (visualizationType === 'bar') {
    //   if (year === d.year) {
    //     return {
    //       province: d.region.name,
    //       value: d.value,
    //     };
    //   }
    // }

    if (visualizationType === 'line') {
      if (d.unit.name === unit) return true;
    }

    if (visualizationType === 'pie') {
      if (year === d.year && d.region.name === region && d.unit.name === unit) return true;
    }

    return false;
  });
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

export const getCategoriesFromRecords = (
  records: Record[],
) => compact(uniq(records.map((d) => d.category_1))).sort();
