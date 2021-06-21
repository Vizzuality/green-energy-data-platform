import { API } from 'lib/api';

export const fetchSubgroup = (
  id: string,
  params = {},
  headers = {},
) => API.get(`/subgroups/${id}`, {
  headers: {
    ...headers,
  },
  params,
})
  .then(({ data }) => data);

export default {
  fetchSubgroup,
};
