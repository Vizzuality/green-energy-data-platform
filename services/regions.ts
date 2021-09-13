import { API } from 'lib/api';

export const fetchRegions = (
  id: string,
  headers = {},
  params = {},
) => API.get(`/indicators/${id}/regions`, {
  headers: {
    ...headers,
  },
  params,
})
  .then((data) => data);

export default {
  fetchRegions,
};
