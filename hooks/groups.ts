import { useQuery } from 'react-query';

// services
import { fetchGroups, fetchGroup } from 'services/groups';

export const useGroups = (queryConfig = {}) => useQuery('fetch-groups',
  () => fetchGroups().then((data) => data), {
    // keepPreviousData: true
    ...queryConfig,
  });

export function useGroup(id, queryConfig = {}) {
  return useQuery(['fetch-group', id],
    () => fetchGroup(id)
      .then((data) => data),
    {
      // keepPreviousData: true,
      ...queryConfig,
    });
}

export default {
  useGroups,
  useGroup,
};
