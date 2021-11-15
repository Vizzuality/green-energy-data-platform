import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import {
  Region,
} from 'types/data';

// services
import { fetchRegion, fetchRegions } from 'services/regions';

export const useRegions = (params = {}, queryConfig = {}) => {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  const queryParams = { ...params, locale: current };
  return useQuery<Region[], Error>(['fetch-regions', queryParams], () => fetchRegions(queryParams), { ...queryConfig });
};

export const useRegion = (id, params = {}, queryConfig = {}) => {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  const queryParams = { ...params, locale: current };

  return useQuery(['fetch-region', id, queryParams], () => fetchRegion(id, queryParams), { ...queryConfig });
};

export const useRegionIdFromName = (regions, name) => regions.find((region) => name === region);

export default {
  useRegions,
  useRegionIdFromName,
};
