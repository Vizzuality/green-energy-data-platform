import { useQuery } from 'react-query';

// services
import { fetchSubgroup } from 'services/subgroups';

export function useSubgroup(group_id, subgroup_id, queryConfig = {}) {
  return useQuery(['fetch-subgroup', group_id, subgroup_id],
    () => fetchSubgroup(group_id, subgroup_id)
      .then((data) => data),
    {
      enabled: !!group_id && !!subgroup_id,
      ...queryConfig,
      // keepPreviousData: true,
    });
}

export default {
  useSubgroup,
};
