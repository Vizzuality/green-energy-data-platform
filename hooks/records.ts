import { useMemo } from 'react';

import { useRegions } from 'hooks/regions';

import {
  getYearsFromRecords,
  getDefaultYearFromRecords,
  getUnitsFromRecords,
  getDefaultUnitFromRecords,
  getRegionsFromRecords,
  getCategoriesFromRecords,
  getScenariosFromRecords,
} from 'utils';

import ID_CHINA from 'utils/constants';

export function useDefaultRecordFilters(
  records,
  filters,
) {
  const {
    region, unit, visualization,
    category,
  } = filters;

  const { data: regions } = useRegions({}, {
    refetchOnWindowFocus: false,
    placeholderData: [],
  });

  const categories = useMemo(() => getCategoriesFromRecords(records), [records]);

  const years = useMemo(() => getYearsFromRecords(records, visualization, region, unit),
    [records, visualization, region, unit]);
  const defaultYear = useMemo(
    () => getDefaultYearFromRecords(records, visualization),
    [records, visualization],
  );

  const regionsFromRecords = useMemo(() => getRegionsFromRecords(records, regions),
    [records, regions]);

  const defaultRegion = useMemo(() => regionsFromRecords.find(
    (_region) => _region.value === ID_CHINA,
  ) || regionsFromRecords?.[0], [regionsFromRecords]);

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
    regionsFromRecords,
    defaultRegion,
    units,
    defaultUnit,
    scenarios,
    defaultScenario,
  };
}

export default { useDefaultRecordFilters };
