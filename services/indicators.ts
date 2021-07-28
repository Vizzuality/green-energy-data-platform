import { API } from 'lib/api';

export const fetchIndicators = (
  group_id: string,
  subgroup_id: string,
  params = {},
  headers = {},
) => API.get(`/groups/${group_id}/subgroups/${subgroup_id}/indicators`, {
  headers: {
    ...headers,
  },
  params,
})
  .then(({ data }) => data);

export const fetchIndicator = (
  group_id: string,
  subgroup_id: string,
  indicator_id: string,
  params = {},
  headers = {},
) => API.get(`/groups/${group_id}/subgroups/${subgroup_id}/indicators/${indicator_id}`, {
  headers: {
    ...headers,
  },
  params,
})
  .then(({ data }) => data);

export const fetchIndicatorRecords = (
  group_id: string,
  subgroup_id: string,
  indicator_id: string,
  params = {},
  headers = {},
) => API.get(`/groups/${group_id}/subgroups/${subgroup_id}/indicators/${indicator_id}/records`, {
  headers: {
    ...headers,
  },
  params,
})
  .then(({ data }) => data);

export default {
  fetchIndicators,
  fetchIndicator,
};
