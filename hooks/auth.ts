import { useQuery } from 'react-query';
import { useSession } from 'next-auth/client';

// services
import { fetchUserMe } from 'services/user';

export function useMe() {
  const [session, loading] = useSession();

  return useQuery('me',
    () => fetchUserMe(`Bearer ${session.accessToken}`)
      .then((data) => data),
    {
      enabled: !!session && !loading,
    });
}

export default {
  useMe,
};
