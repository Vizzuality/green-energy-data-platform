import { APInext, API } from 'lib/api';

export const fetchSubgroup = (
  id: string,
  params = {},
  headers = {},
) => API.get(`/subgroups/${'3bc37685-2b9c-48e0-9f4d-6db5a4cb0924'}/subgroups`, {
  headers: {
    ...headers,
  },
  params,
})
  .then(({ data }) => data);

export default {
  fetchSubgroup,
};
