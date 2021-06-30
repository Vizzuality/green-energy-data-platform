import { useQuery } from 'react-query';
import { useMemo } from 'react';

// services
import { fetchIndicators } from 'services/indicators';

export function useIndicators(group_id, subgroup_id) {
  const query = useQuery('fetch-indicators',
    () => fetchIndicators(group_id, subgroup_id)
      .then((data) => data));

  const {
    data, status, error, isSuccess, isLoading,
  } = query;

  const relatedIndicators = useMemo(() => splitOptions.map((s) => ({ label: s.key, value: s.key })), [splitOptions]);

  return {
    status,
    error,
    isSuccess,
    isLoading,
    data,
    relatedIndicators,
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
};
