import { API } from 'lib/api';

export const fetchGroups = () => API.get('/groups')
  .then(({ data }) => data);

export default {
  fetchGroups,
};
