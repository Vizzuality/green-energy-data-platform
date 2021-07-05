import { useQuery } from 'react-query';
import { useMemo } from 'react';

import { selectedIndicator } from 'constants';

// services
import { fetchGroups, fetchGroup } from 'services/groups';
import { fetchIndicators, fetchIndicator } from 'services/indicators';

export function useIndicators(group_id, subgroup_id) {
  const query = useQuery('fetch-indicators',
    () => fetchIndicators(group_id, subgroup_id)
      .then((data) => data));

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

export function useIndicator(group_id, subgroup_id, indicator_id, active) {
  console.log(active)
  const query = useQuery('fetch-indicator',
    () => fetchIndicator(group_id, subgroup_id, indicator_id)
      .then((data) => {
        console.log(data, active, '********');
        const { records } = data;
        const parsedData = records.filter(({ visualizationTypes }) => visualizationTypes.includes(active));
        const widgetData = parsedData.map((d) => {
          if (active === 'bar') {
            return {
              province: d.region.name,
              value1: d.value,
            };
          }
          if (active === 'line') {
            return {
              province: d.region.id,
              value1: d.value,
            };
          }
        });

        return {
          indicator: data,
          widgetData,
        };
      }));

  const {
    data, status, error, isSuccess, isLoading,
  } = query;

  return {
    status,
    error,
    isSuccess,
    isLoading,
    indicator: data?.indicator,
    widgetData: data?.widgetData,
  };
}

export function useIndicatorData(groupId, subgroupId) {
  const queryGroups = useQuery('fetch-groups',
    () => fetchGroups()
      .then((data) => data));

  const {
    data: dataGroups,
    status: statusGroups,
    error: errorGroups,
    isSuccess: isSuccessGroups,
    isLoading: isLoadingGroups,
  } = queryGroups;

  const queryGroup = useQuery('fetch-group',
    () => fetchGroup(groupId)
      .then((data) => data));

  const {
    data: dataGroup,
    status: statusGroup,
    error: errorGroup,
    isSuccess: isSuccessGroup,
    isLoading: isLoadingGroup,
  } = queryGroup;

  const selectedSubgroup = dataGroup?.default_subgroup || dataGroup?.subgroups[0].slug;

  return {
    status: statusGroups,
    error: errorGroups,
    isSuccess: isSuccessGroups,
    isLoading: isLoadingGroups,
    groups: dataGroups,
    selectedSubgroup,
  };
}

export function useDates(indicators) {
  const startYear = Math.max.apply(null, indicators.map((indicator) => indicator.start_date));
  const endYear = Math.min.apply(null, indicators.map((indicator) => indicator.end_date));

  return {
    startYear,
    endYear,
  };
}

export default {
  useIndicators,
  useDates,
  useIndicatorData,
};
