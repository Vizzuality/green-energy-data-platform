import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import {
  Region,
} from 'types/data';

// services
import { fetchRegion, fetchRegions } from 'services/regions';
import { useRouter } from 'next/router';

export const useRegions = (params = {}, queryConfig = {}) => {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );

  const { query } = useRouter();
  const lang = query.locale || 'en';
  const queryParams = { ...params, locale: lang };
  return useQuery<Region[], Error>(['fetch-regions', current, lang], () => fetchRegions(queryParams), { ...queryConfig });
};

export const useRegion = (id, params = {}, queryConfig = {}) => {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  const queryParams = { ...params, locale: current };
  const { query } = useRouter();
  const lang = query.locale || 'en';
  return useQuery(['fetch-region', id, queryParams, lang], () => fetchRegion(id, queryParams), { ...queryConfig });
};

export const useRegionIdFromName = (regions, name) => regions.find((region) => name === region);

export default {
  useRegions,
  useRegionIdFromName,
};
