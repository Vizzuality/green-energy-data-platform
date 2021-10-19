import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

// services
import { fetchRegions } from 'services/regions';

export const useRegions = (id, visualizationType, queryConfig = {}) => {
  const {
    current,
  } = useSelector(
    (state: RootState) => (state.language),
  );
  return useQuery(['fetch-regions', id],
    () => fetchRegions(id, { locale: current })
      .then(({ data }) => data.filter((d) => d.geometry !== null)), {
    // keepPreviousData: true
      enabled: visualizationType === 'choropleth',
      ...queryConfig,
    });
};

export default {
  useRegions,
};
