import { useQuery } from 'react-query';

// services
import { fetchGroups, fetchGroup } from 'services/groups';

export const useGroups = () => useQuery('fetch-groups',
  () => fetchGroups().then((data) => data), { keepPreviousData: true });

export function useGroup(id, queryConfig = { enabled: true }) {
  return useQuery(['fetch-group', id],
    () => fetchGroup(id)
      .then((data) => data),
    {
      enabled: queryConfig.enabled,
      keepPreviousData: true,
    });
}

export default {
  useGroups,
  useGroup,
};
