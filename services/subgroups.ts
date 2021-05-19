import { API } from 'lib/api';

export const fetchSubgroup = (
  id: string,
  userToken: string,
  params = {},
  headers = {},
) => API.get(`/subgroups/${id}`, {
  headers: {
    Authorization: userToken,
    ...headers,
  },
  params,
})
  .then(({ data }) => data);

export default {
  fetchSubgroup,
};
