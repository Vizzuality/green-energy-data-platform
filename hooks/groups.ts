import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/client';

// services
import { fetchGroups, fetchGroup } from 'services/groups';

export function useGroups() {
  const [session, loading] = useSession();
  const query = useQuery('fetch-groups',
    () => fetchGroups(`Bearer ${session.accessToken}`)
      .then((data) => data),
    {
      enabled: !!session && !loading,
    });

  const {
    data, status, error, isLoading,
  } = query;
  return useMemo(() => ({
    status,
    error,
    isLoading,
    groups: data,
  }), [status, error, isLoading, data]);
}

export function useGroup(id, queryConfig = {}) {
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
