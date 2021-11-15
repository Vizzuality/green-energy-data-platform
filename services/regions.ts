import { API } from 'lib/api';

export const fetchRegions = (
  params = {},
) => API.get('/regions', {
  params,
})
  .then(({ data }) => data);

export const fetchRegion = (
  id: string,
  headers = {},
  params = {},
) => API.get(`/regions/${id}`, {
  headers: {
    ...headers,
  },
  params,
})
  .then(({ data }) => data);
