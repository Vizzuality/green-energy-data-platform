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
  filters,
) {
  const {
    year, region, unit, visualization,
  } = filters;

  const categories = useMemo(() => getCategoriesFromRecords(filteredRecords), [filteredRecords]);
  const defaultCategory = { label: 'category_1' };

  const years = useMemo(() => getYearsFromRecords(records, visualization, region, unit),
    [records, visualization, region, unit]);
  const defaultYear = useMemo(
    () => getDefaultYearFromRecords(records, visualization), [records, visualization],
  );

  const regionsWithVisualization = useMemo(
    () => getDefaultRegionFromRecords(records, visualization), [records, visualization],
  );

  const regions = useMemo(() => getRegionsFromRecords(records, visualization, unit),
    [records, visualization, unit]);
  const defaultRegion = regionsWithVisualization.find(region => region?.id === 'bca25526-8927-4d27-ac0e-e92bed88198a') || regionsWithVisualization?.[0];

  const units = useMemo(() => getUnitsFromRecords(records, visualization, region, year),
    [records, visualization, region, year]);
  const defaultUnit = useMemo(
    () => getDefaultUnitFromRecords(records, visualization), [records, visualization],
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

export default { useDefaultRecordFilters };
