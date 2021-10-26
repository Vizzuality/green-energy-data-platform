import { useMemo } from 'react';

import {
  getYearsFromRecords,
  getDefaultYearFromRecords,
  getUnitsFromRecords,
  getDefaultUnitFromRecords,
  getRegionsFromRecords,
  getDefaultRegionFromRecords,
  getCategoriesFromRecords,
  getScenariosFromRecords,
} from 'utils';

export function useDefaultRecordFilters(
  records,
  filteredRecords,
  visualizationType,
  filters,
) {
  const {
    year, region, unit,
  } = filters;
  const categories = useMemo(() => getCategoriesFromRecords(filteredRecords), [filteredRecords]);
  const defaultCategory = 'category_1';

  const years = useMemo(() => getYearsFromRecords(records, visualizationType, region, unit),
    [records, visualizationType, region, unit]);
  const defaultYear = useMemo(
    () => getDefaultYearFromRecords(records, visualizationType), [records, visualizationType],
  );

  const regionsWithVisualization = useMemo(
    () => getDefaultRegionFromRecords(records, visualizationType), [records, visualizationType],
  );

  const regions = useMemo(() => getRegionsFromRecords(records, visualizationType, unit),
    [records, visualizationType, unit]);
  const defaultRegion = regionsWithVisualization.includes('China') ? 'China' : regionsWithVisualization?.[0];

  const units = useMemo(() => getUnitsFromRecords(records, visualizationType, region, year),
    [records, visualizationType, region, year]);
  const defaultUnit = useMemo(
    () => getDefaultUnitFromRecords(records, visualizationType), [records, visualizationType],
  );

  const scenarios = useMemo(
    () => getScenariosFromRecords(records), [records],
  );
  const defaultScenario = useMemo(() => scenarios[0], [scenarios]);

  return {
    categories,
    defaultCategory,
    years,
    defaultYear,
    regions,
    defaultRegion,
    units,
    defaultUnit,
    scenarios,
    defaultScenario,
  };
}

export default useDefaultRecordFilters;
