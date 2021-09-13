import { useQuery } from 'react-query';

// services
import { fetchRegions } from 'services/regions';

interface GeometryProps {
  type: string,
  coordinates: number[]
}
interface RegionProps {
  id: string,
  name: string,
  region_type: string,
  geometry: GeometryProps[],
}

export const useRegions = (id, queryConfig = {}) => useQuery(['fetch-regions', id],
  () => fetchRegions(id).then(({ data }) => data.filter((d) => d.geometry !== null)), {
    // keepPreviousData: true
    ...queryConfig,
  });

export const useGeojson = (
  indicatorId: string,
  records = [],
  queryOptions = {},
) => records[0];

export default {
  useRegions,
  useGeojson,
};
