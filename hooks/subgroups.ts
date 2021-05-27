import { useQuery } from 'react-query';

// services
import { fetchSubgroup } from 'services/subgroups';

export function useSubgroup(subgroup) {
  const query = useQuery('fetch-subgroup',
    () => fetchSubgroup(subgroup)
      .then((data) => data));

  const {
    data, status, error, isSuccess, isLoading,
  } = query;

  return {
    status,
    error,
    isSuccess,
    isLoading,
    data,
  };
}

export default {
  useSubgroup,
};
