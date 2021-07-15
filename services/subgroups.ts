import { API } from 'lib/api';

export const fetchSubgroups = (
  id: string,
  params = {},
  headers = {},
) => API.get(`/groups/${'3bc37685-2b9c-48e0-9f4d-6db5a4cb0924'}/subgroups`, {
  headers: {
    ...headers,
  },
  params,
})
  .then(({ data }) => data);

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
  fetchSubgroups,
  fetchSubgroup,
};
