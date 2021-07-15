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
  .then(({ data }) => data);

export const fetchGroup = (
  id: string,
  params = {},
  headers = {},
) => API.get(`/groups/${id}`, {
  headers: {
    ...headers,
  },
  params,
})
  .then(({ data }) => data);

export default {
  fetchGroups,
  fetchGroup,
};
