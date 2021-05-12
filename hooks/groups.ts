import { useQuery } from 'react-query';
import { useSession } from 'next-auth/client';

// services
import { fetchGroups, fetchGroup } from 'services/groups';

export function useGroups() {
  const query = useQuery('fetch-groups',
    () => fetchGroups().then((data) => data));

  const {
    data, status, error, isLoading,
  } = query;
  return ({
    status,
    error,
    isLoading,
    groups: data,
  });
}

export function useGroup(id, queryConfig = { enabled: true }) {
  const [session, loading] = useSession();

  const query = useQuery('fetch-group',
    () => fetchGroup(id, `Bearer ${session.accessToken}`)
      .then((data) => data),
    {
      ...queryConfig,
      enabled: !!((!!session && !loading) && queryConfig?.enabled),
    });

  const {
    data, status, error, isLoading,
  } = query;
  return ({
    status,
    error,
    isLoading,
    data,
  });
}

export default {
  useGroups,
  useGroup,
};
