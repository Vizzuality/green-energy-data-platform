import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/client';

// services
import { fetchSubgroup } from 'services/subgroups';

export function useSubGroup() {
  const [session, loading] = useSession();
  const { query: { subgroup } } = useRouter();

  return useQuery('fetch-subgroup',
    () => fetchSubgroup(subgroup, `Bearer ${session.accessToken}`)
      .then((data) => data),
    {
      enabled: !!session && !loading,
    });
}

export default {
  useSubGroup,
};
