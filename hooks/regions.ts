import { useQuery } from 'react-query';

// services
import { fetchRegions } from 'services/regions';

export const useRegions = (id, queryConfig = {}) => useQuery(['fetch-regions', id],
  () => fetchRegions(id).then(({ data }) => data.filter((d) => d.geometry !== null)), {
    // keepPreviousData: true
    ...queryConfig,
  });

export default {
  useRegions,
};
