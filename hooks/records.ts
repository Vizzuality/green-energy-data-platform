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
  filters,
) {
  const {
    region, unit, visualization,
    category,
  } = filters;

  const categories = useMemo(() => getCategoriesFromRecords(records), [records]);

  const years = useMemo(() => getYearsFromRecords(records, visualization, region, unit),
    [records, visualization, region, unit]);
  const defaultYear = useMemo(
    () => getDefaultYearFromRecords(records, visualization),
    [records, visualization],
  );

  const regionsWithVisualization = useMemo(
    () => getDefaultRegionFromRecords(records, visualization),
    [records, visualization],
  );

  const regions = useMemo(() => getRegionsFromRecords(records, visualization, unit),
    [records, visualization, unit]);
  const defaultRegion = regionsWithVisualization.find((_region) => _region?.id === 'bca25526-8927-4d27-ac0e-e92bed88198a') || regionsWithVisualization?.[0];

  const units = useMemo(() => getUnitsFromRecords(records, visualization),
    [records, visualization]);

  const defaultUnit = useMemo(
    () => getDefaultUnitFromRecords(records, visualization),
    [records, visualization],
  );

  const scenarios = useMemo(
    () => getScenariosFromRecords(records), [records],
  );
  const defaultScenario = useMemo(() => scenarios[0], [scenarios]);

  return {
    categories,
    defaultCategory: category,
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
