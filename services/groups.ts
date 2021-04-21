import { API } from 'lib/api';

export const fetchGroups = (
  userToken: string,
  params = {},
  headers = {},
) => API.get('/groups', {
  headers: {
    Authorization: userToken,
    ...headers,
  },
  params,
})
  .then(({ data }) => data);

export default {
  fetchGroups,
};
