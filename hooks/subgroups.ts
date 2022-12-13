import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

// services
import { fetchSubgroup } from 'services/subgroups';

export function useSubgroup(group_id, subgroup_id, queryConfig = {}) {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );

  return useQuery(['fetch-subgroup', group_id, subgroup_id, current],
    () => fetchSubgroup(group_id, subgroup_id, { locale: current })
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
