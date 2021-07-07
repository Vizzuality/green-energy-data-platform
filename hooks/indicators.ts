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
  const query = useQuery(`fetch-groups-${groupId}-${subgroupId}-${indicatorId}`,
    () => fetchIndicator(groupId, subgroupId, indicatorId)
      .then((data) => data));
  const { data } = query;

  return useMemo(() => {
    const { records } = !!data && data;
    const parsedData = records?.filter(
      ({ visualizationTypes }) => visualizationTypes.includes(active),
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
    });

    return {
      ...data,
      widgetData,
    };
  }, [data, active]);
}

export default {
  useIndicators,
};
