import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/client';

// services
import { fetchGroups } from 'services/groups';

export function useGroups() {
  const [session, loading] = useSession();

  const query = useQuery('groups',
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

export default {
  useGroups,
};
