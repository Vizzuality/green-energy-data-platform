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

export const fetchDataToDownload = (
  userToken: string,
  id: string,
  file_format: string,
  params = {},
  headers = {},
) => API.get('/downloads', {
  headers: {
    Authentication: userToken,
    ...headers,
  },
  params: {
    id,
    file_format,
    ...params,
  },
})
  .then(({ data }) => data);

export const fetchIndicatorMetadata = (
  id: string,
  headers = {},
  params = {},
) => API.get(`/indicators/${id}/meta`, {
  headers: {
    ...headers,
  },
  params,
})
  .then(({ data: { meta } }) => meta);

export const fetchSankeyData = (
  id: string,
  params = {},
  headers = {},
) => API.get(`indicators/${id}/sankey`, {
  headers: {
    ...headers,
  },
  params,
})
  .then(({ data: { sankey: { data } } }) => data[0]);

export default {
  fetchIndicators,
  fetchIndicator,
  fetchDataToDownload,
  fetchIndicatorMetadata,
};
