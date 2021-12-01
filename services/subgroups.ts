import { API } from 'lib/api';

export const fetchSubgroup = (
  group_id: string,
  subgroup_id: string,
  params = {},
  headers = {},
) => (
  API.get(`/groups/${group_id}/subgroups/${subgroup_id}`, {
    headers: {
      ...headers,
    },
    params,
  })
    .then(({ data }) => data));

export default {
  fetchSubgroup,
};
