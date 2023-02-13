import { API } from 'lib/api';

export const fetchGroups = (
  headers = {},
  params = {},
) => API.get('/groups', {
  headers: {
    ...headers,
  },
  params,
})
  .then((data) => data);

export const fetchGroup = (
  id: string | string[],
  params = {},
  headers = {},
) => API.get(`/groups/${id}`, {
  headers: {
    ...headers,
  },
  params: {
    ...params,
    ...id === 'energy-balance' && { load_nested_data: true },
  },
})
  .then(({ data }) => data);

export default {
  fetchGroups,
  fetchGroup,
};
