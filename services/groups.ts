import { API } from 'lib/api';

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
  userToken: string,
  params = {},
  headers = {},
) => API.get(`/groups/${id}`, {
  headers: {
    Authorization: userToken,
    ...headers,
  },
  params,
})
  .then(({ data }) => data);

export default {
  fetchGroups,
  fetchGroup,
};
