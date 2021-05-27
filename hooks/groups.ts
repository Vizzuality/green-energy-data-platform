import { useQuery } from 'react-query';

// services
import { fetchGroups, fetchGroup } from 'services/groups';

export function useGroups() {
  const query = useQuery('fetch-groups',
    () => fetchGroups().then((data) => data));

  const {
    data, status, error, isLoading, isSuccess,
  } = query;

  return ({
    status,
    error,
    isLoading,
    isSuccess,
    groups: data,
  });
}

export function useGroup(id, queryConfig = { enabled: true }) {
  const query = useQuery('fetch-group',
    () => fetchGroup(id)
      .then((data) => data),
    {
      enabled: queryConfig.enabled,
    });

  const {
    data, status, error, isLoading, isSuccess,
  } = query;

  return ({
    status,
    error,
    isLoading,
    isSuccess,
    data,
  });
}

export default {
  useGroups,
  useGroup,
};
