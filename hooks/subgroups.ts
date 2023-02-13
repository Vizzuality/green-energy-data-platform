import { useQuery } from 'react-query';

// services
import { fetchSubgroup } from 'services/subgroups';

export function useSubgroup(group_id, subgroup_id, queryConfig = {}, params = {}) {
  return useQuery(['fetch-subgroup', group_id, subgroup_id, params],
    () => fetchSubgroup(group_id, subgroup_id, params)
      .then((data) => data),
    {
      enabled: !!group_id && !!subgroup_id,
      keepPreviousData: true,
      ...queryConfig,
    });
}

export default {
  useSubgroup,
};
