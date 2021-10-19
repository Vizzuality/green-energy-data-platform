import { useQuery } from 'react-query';
import { useSession } from 'next-auth/client';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

// services
import { fetchUserMe } from 'services/user';

export function useMe(queryConfig = {}) {
  const [session, loading] = useSession();
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );

  return useQuery(['me', session],
    () => fetchUserMe(`Bearer ${session.accessToken}`, { locale: current })
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
