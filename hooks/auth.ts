import { useQuery } from 'react-query';
import { useSession } from 'next-auth/client';

// services
import { fetchUserMe } from 'services/user';

export function useMe(queryConfig = {}) {
  const [session, loading] = useSession();

  return useQuery(['me', session],
    () => fetchUserMe(`Bearer ${session.accessToken}`)
      .then((data) => ({
        ...data,
        token: session.accessToken,
      })),
    {
      enabled: !!session && !loading,
      ...queryConfig,
    });
}

export default {
  useMe,
};
