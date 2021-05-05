import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/client';

// services
import { fetchSubgroup } from 'services/subgroups';

export function useSubgroup(subgroup) {
  const [session, loading] = useSession();

  const query = useQuery('fetch-subgroup',
    () => fetchSubgroup(subgroup, `Bearer ${session.accessToken}`)
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
    data,
  }), [status, error, isLoading, data]);
}

export default {
  useSubgroup,
};
