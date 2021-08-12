import {
  compact,
  uniq,
} from 'lodash';

import { saveAs } from 'file-saver';

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
  } = filters;

  return records.filter((d) => {
    // if (visualizationType === 'bar') {
    //   if (year === d.year) {
    //     return {
    //       province: d.region.name,
    //       value: d.value,
    //     };
    //   }
    // }

    if (visualizationType === 'line') {
      if (d.unit.name !== 'Percentage') return true;
    }

    if (visualizationType === 'pie') {
      if (year === d.year && d.region.name === region && d.unit.name === 'Percentage') return true;
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

export const getCategoriesFromRecords = (
  records: Record[],
) => compact(uniq(records.map((d) => d.category_1))).sort();

export const parseDataToDownload = (
  format: string,
  data: any,
  fileName: string,
) => saveAs(new File([format === 'json' ? JSON.stringify(data) : data], `${fileName}.${format}`));
