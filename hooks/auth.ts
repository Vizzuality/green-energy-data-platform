import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/client';

// services
import { fetchUserMe } from 'services/user';

export function useMe() {
  const [session, loading] = useSession();

  const query = useQuery('me',
    () => fetchUserMe(`Bearer ${session.accessToken}`)
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
    user: data,
  }), [status, error, isLoading, data]);
}

export default {
  useMe,
};
