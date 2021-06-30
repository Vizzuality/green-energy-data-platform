import { useQuery } from 'react-query';

// services
import { fetchSubgroup } from 'services/subgroups';

export function useSubgroup(group_id, subgroup_id) {
  const query = useQuery('fetch-subgroup',
    () => fetchSubgroup(group_id, subgroup_id)
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
