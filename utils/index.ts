import compact from 'lodash/compact';

import {
  IndicatorsProps,
} from 'types/data';

import {
  IndicatorFilters,
} from 'store/slices/indicator';

export const Filter = (arr: (string | number)[], param: number) => {
  const index = arr.indexOf(param) !== -1;
  return index ? arr.splice(param) : arr.push(param);
};

export const parseDataByVisualizationType = (
  data: IndicatorsProps,
  filters: IndicatorFilters,
  visualizationType: string,
) => {
  const { records } = data;
  const parsedData = records.filter(
    ({ visualizationTypes }) => visualizationTypes.includes(visualizationType),
  );

  const { year, region } = filters;

  const years = compact((parsedData?.map((d) => d.year))?.reduce(
    (acc, item) => (acc.includes(item) ? acc : [...acc, item]), [],
  )).sort();

  if (!years) return null;
  const defaultYear = years[0];

  const regions = compact((parsedData?.map((d) => d.region.name))?.reduce(
    (acc, item) => (acc.includes(item) ? acc : [...acc, item]), [],
  ));

  if (!regions) return null;
  const defaultRegion = regions.includes('China') ? 'China' : regions[0];

  const widgetData = parsedData?.filter((d) => {
    if (year === d.year && d.region.name === region) return true;
    // if (visualizationType === 'bar') {
    //   if (year === d.year) {
    //     return {
    //       province: d.region.name,
    //       value: d.value,
    //     };
    //   }
    // }
    // if (visualizationType === 'line') {
    //   return {
    //     label: d.year,
    //     value: d.value,
    //   };
    // }

    // if (visualizationType === 'pie') {
    //   console.log(d, year, region);
    //   if  {

    //   }
    // }

    return false;
  });

  return {
    data,
    years,
    defaultYear,
    regions,
    defaultRegion,
    widgetData,
  };
};

export default Filter;
