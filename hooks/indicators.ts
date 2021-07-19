import { useQuery } from 'react-query';
import { useMemo } from 'react';

// services
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

export function useIndicator(groupId, subgroupId, indicatorId, active) {
  const query = useQuery(['fetch-indicator', groupId, subgroupId, indicatorId],
    () => fetchIndicator(groupId, subgroupId, indicatorId)
      .then((data) => data));
  const { data } = query;

  return useMemo(() => {
    const { records } = !!data && data;
    const parsedData = records?.filter(
      ({ visualizationTypes }) => visualizationTypes.includes(active),
    );

    const years = (parsedData?.map((d) => d.year))?.reduce(
      (acc, item) => (acc.includes(item) ? acc : [...acc, item]), [],
    );

    const widgetData = parsedData?.map((d) => {
      if (active === 'bar') {
        return {
          province: d.region.name,
          value1: d.value,
        };
      }
      if (active === 'line') {
        return {
          label: d.year,
          value: d.value,
        };
      }

      if (active === 'pie') {
        return {
          label: d.category_1,
          value: d.value,
        };
      }
    });

    return {
      ...query,
      years,
      widgetData,
    };
  }, [data, query, active]);
}

export function useDefaultIndicator(group) {
  if (!group) return null;
  const { default_subgroup: defaultSubgroup, subgroups } = group;
  return subgroups.find((subgroup) => subgroup.slug === defaultSubgroup);
}

export default {
  useDefaultIndicator,
  useIndicators,
  useIndicator,
};
