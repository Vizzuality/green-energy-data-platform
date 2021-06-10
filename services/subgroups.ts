import { APInext, API } from 'lib/api';

export const fetchSubgroup = (
  id: string,
  params = {},
  headers = {},
) => APInext.get(`/subgroups/${id}`, {
  headers: {
    ...headers,
  },
  params,
})
  .then(({ data }) => data);

export default {
  fetchSubgroup,
};
