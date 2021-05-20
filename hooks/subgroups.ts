import { useQuery } from 'react-query';

// services
import { fetchSubgroup } from 'services/subgroups';

export function useSubgroup(subgroup) {
  const query = useQuery('fetch-subgroup',
    () => fetchSubgroup(subgroup)
      .then((data) => data));

  const {
    data, status, error, isLoading,
  } = query;

  return {
    status,
    error,
    isLoading,
    data,
  };
}

export default {
  useSubgroup,
};
