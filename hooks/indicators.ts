import { useQuery } from 'react-query';
import { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import {
  IndicatorProps,
  Record,
} from 'types/data';

// services
import {
  fetchIndicators,
  fetchIndicator,
  fetchIndicatorRecords,
} from 'services/indicators';

export function useIndicators(group_id, subgroup_id) {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  const query = useQuery('fetch-indicators',
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
    language,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  return useQuery<IndicatorProps, Error>(`indicator-${indicatorId}`,
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
        visualizationTypes: [],
        group: null,
        subgroup: null,
      },
      ...queryOptions,
    });
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
  queryOptions = {},
) {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );

  return useQuery<Record[], Error>(['indicator-records', groupId, subgroupId, indicatorId],
    () => fetchIndicatorRecords(groupId, subgroupId, indicatorId, { locale: current }), {
      placeholderData: [],
      ...queryOptions,
    });
}
