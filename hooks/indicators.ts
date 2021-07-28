import { useQuery } from 'react-query';
import { useMemo } from 'react';

import {
  IndicatorsProps,
  Record,
} from 'types/data';

// services
import {
  fetchIndicators,
  fetchIndicator,
  fetchIndicatorRecords,
} from 'services/indicators';

export function useIndicators(group_id, subgroup_id) {
  const query = useQuery('fetch-indicators',
    () => fetchIndicators(group_id, subgroup_id));

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
  return useQuery<IndicatorsProps, Error>(`indicator-${indicatorId}`,
    () => fetchIndicator(groupId, subgroupId, indicatorId), {
      placeholderData: {
        records: [],
        categories: [],
        category_filters: {},
        default_visualization: null,
        description: null,
        end_date: null,
        id: null,
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
  return subgroups.find((subgroup) => subgroup.slug === defaultSubgroup);
}

export function useIndicatorRecords(
  groupId,
  subgroupId,
  indicatorId,
  queryOptions = {},
) {
  return useQuery<Record[], Error>(`indicator-records-${indicatorId}`,
    () => fetchIndicatorRecords(groupId, subgroupId, indicatorId), {
      placeholderData: [],
      ...queryOptions,
    });
}
