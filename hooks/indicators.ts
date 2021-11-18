import { useQuery } from 'react-query';
import { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import { orderBy } from 'lodash';

import {
  IndicatorProps,
  IndicatorMetadata,
  Record,
} from 'types/data';
import {
  IndicatorFilters,
} from 'store/slices/indicator';

// services
import {
  fetchIndicators,
  fetchIndicator,
  fetchIndicatorRecords,
  fetchIndicatorMetadata,
} from 'services/indicators';

import {
  useRegions,
} from 'hooks/regions';
import { getCategoriesFromRecords } from 'utils';

import ID_CHINA from 'utils/constants';

export function useIndicators(group_id, subgroup_id) {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  const query = useQuery(['fetch-indicators', current],
    () => fetchIndicators(group_id, subgroup_id, { locale: current }));

  const {
    data, status, error, isSuccess, isLoading,
  } = query;

  const relatedIndicators = useMemo(() => data, [data]);

  return {
    status,
    error,
    isSuccess,
    isLoading,
    data,
    relatedIndicators,
  };
}

export function useIndicator(
  groupId,
  subgroupId,
  indicatorId,
  queryOptions = {},
) {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  return useQuery<IndicatorProps, Error>(['indicator', indicatorId, current],
    () => fetchIndicator(groupId, subgroupId, indicatorId, { locale: current }), {
      placeholderData: {
        records: [],
        categories: [],
        category_filters: {},
        default_visualization: null,
        description: null,
        end_date: null,
        id: null,
        slug: null,
        name: null,
        published: false,
        start_date: null,
        visualization_types: [],
        group: null,
        subgroup: null,
      },
      ...queryOptions,
    });
}

export function useIndicatorMetadata(
  id: string,
  visualization: string,
  records: Record[],
  params = {},
  queryOptions = {},
) {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );

  const query = useQuery<IndicatorMetadata, Error>(['indicator-metadata', id, visualization, current],
    () => fetchIndicatorMetadata(id, { locale: current, ...params }), {
      placeholderData: {},
      ...queryOptions,
    });

  const { data, isFetching } = query;
  const years = useMemo<{ label: number, value: number }[] | []>(
    () => orderBy(data[visualization]?.year.map((y) => ({
      label: y,
      value: y,
    })), ['value'], ['desc']) || [], [data, visualization],
  );

  const defaultYear = useMemo<{ label: number, value: number }>(() => years?.[0], [years]);

  const regions = useMemo<{ label: string, value: string }[] | []>(
    () => data[visualization]?.regions.map((reg) => ({
      label: reg.name,
      value: reg.id,
    })) || [], [data, visualization],
  );

  const defaultRegion = useMemo<{ label: string, value: string }>(
    () => regions.find(({ value }) => value === ID_CHINA || regions[0]),
    [regions],
  );

  const units = useMemo<{ label: string, value: string }[]>(
    () => data[visualization]?.units.map((u) => ({
      label: u.name,
      value: u.id,
    })) || [], [data, visualization],
  );

  const defaultUnit = useMemo<{ label: string, value: string }>(
    () => units?.[0], [units],
  );

  const { data: regionsGeometries } = useRegions({}, {
    refetchOnWindowFocus: false,
    placeholderData: [],
  });

  const scenarios = useMemo<{ label: string, value: string }[]>(
    () => data[visualization]?.scenarios.map((scenario) => ({
      label: scenario,
      value: scenario,
    })) || [], [data, visualization],
  );

  const defaultScenario = useMemo<{ label: string, value: string }>(
    () => scenarios?.[0],
    [scenarios],
  );

  const categories = useMemo(
    () => getCategoriesFromRecords(records, visualization) || [], [records, visualization],
  );

  const defaultCategory = useMemo(() => ({ label: 'category_1' }), []);

  return useMemo(() => ({
    isFetching,
    id,
    years,
    defaultYear,
    regions,
    defaultRegion,
    regionsGeometries,
    units,
    defaultUnit,
    scenarios,
    defaultScenario,
    categories,
    defaultCategory,
  }), [
    isFetching,
    id,
    years,
    defaultYear,
    regions,
    defaultRegion,
    regionsGeometries,
    units,
    defaultUnit,
    scenarios,
    defaultScenario,
    categories,
    defaultCategory,
  ]);
}

export function useDefaultIndicator(group) {
  if (!group) return null;
  const { default_subgroup: defaultSubgroup, subgroups } = group;
  const defaultSub = subgroups.find((subgroup) => subgroup.slug === defaultSubgroup);
  return defaultSub || subgroups[0];
}

export function useIndicatorRecords(
  groupId,
  subgroupId,
  indicatorId,
  params = {},
  queryOptions = {},
) {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );

  const { data: regions } = useRegions({}, {
    placeholderData: [],
    refetchOnWindowsFocus: false,
  });

  const {
    category,
    ...restParams
  } = params as IndicatorFilters;

  const query = useQuery<Record[], Error>(['indicator-records', groupId, subgroupId, indicatorId, restParams, current],
    () => fetchIndicatorRecords(
      groupId, subgroupId, indicatorId, { locale: current, ...restParams },
    ),
    {
      placeholderData: [],
      ...queryOptions,
    });

  const { data } = query;

  return useMemo(() => ({
    ...query,
    data: data?.map((d) => ({
      ...d,
      category_1: d.category_1 === null ? 'Total' : d.category_1,
      category_2: d.category_2 === null ? 'Total' : d.category_2,
      region: {
        id: d.region_id,
        name: (regions.find(({ id }) => d.region_id === id) || {}).name || '-',
      },
    })),
  }), [data, regions, query]);
}
