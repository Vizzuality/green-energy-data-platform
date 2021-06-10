import { API, APInext } from 'lib/api';

export const fetchGroups = (
  params = {},
  headers = {},
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
) => APInext.get(`/groups/${id}`, {
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
