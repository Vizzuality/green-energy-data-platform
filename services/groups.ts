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
  .then(({ data }) => {
    console.log(data, 'data')
    return data
  });

export default {
  fetchGroups,
  fetchGroup,
};
